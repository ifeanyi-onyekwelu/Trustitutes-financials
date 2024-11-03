import User from "@/models/User";
import Account from "@/models/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "@/utils/types";
import CustomError from "@/errors/CustomError";
import logger from "@/utils/logger";
import ValidationError from "@/errors/ValidationError";
import AuthenticationError from "@/errors/AuthenticationError";
import generateAccountNumber from "@/utils/generateAccountNumber";

class AuthController {
    /**
     * @route POST /auth/login
     * @description Login a user
     * @access Public
     */
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { accountNumber, password } = req.body;

            if (!accountNumber || !password) {
                return logger.respondWithError(
                    res,
                    new ValidationError(
                        "Account number and Password must be provided"
                    )
                );
            }

            const account = await Account.findOne({ accountNumber });
            if (!account) {
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found!", 400)
                );
            }

            const user = await User.findById(account?.user);
            if (!user || !user?.isActive || user.isDeleted) {
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found!", 400)
                );
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return logger.respondWithError(
                    res,
                    new CustomError("Invalid credentials", 400)
                );
            }

            const accessToken = jwt.sign(
                {
                    user: {
                        _id: user._id,
                        email: user.email,
                        roles: user.roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: "15m",
                }
            );

            const refreshToken = jwt.sign(
                {
                    user,
                },
                process.env.REFRESH_TOKEN_SECRET!,
                {
                    expiresIn: "7d",
                }
            );

            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            await User.findOneAndUpdate({ _id: user._id }, { refreshToken });
            return logger.respondWithData(res, { accessToken }, 200);
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /auth/register
     * @description Register a user
     * @access Public
     */
    async register(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            const user = new User({
                ...data,
                roles: ["user"],
            });

            await user.save();

            await Account.create({
                user: user._id,
                accountNumber: generateAccountNumber(),
                balance: 0,
            });

            return logger.respond(
                res,
                `${
                    data.roles && data.roles.includes("admin")
                        ? "Admin"
                        : "User"
                } ${user.firstName} ${user.lastName} registered successfully!`
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /auth/logout
     * @description Logout a user
     * @access Public
     */
    async logout(req: Request, res: Response): Promise<void> {
        try {
            const cookies = req.cookies;

            const user = await User.findOne({
                refreshToken: cookies.jwt,
            });

            if (!user)
                return logger.respondWithError(
                    res,
                    new AuthenticationError("Not logged in!")
                );

            user.refreshToken = "";
            await user?.save();
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: true,
                secure: true,
            });

            return logger.respondWithData(res, "User logged out!", 200);
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /auth/refresh
     * @description Generate a new access token for the current user
     * @access Public
     */
    async refresh(req: Request, res: Response): Promise<void> {
        const cookies = req.cookies;
        const refreshToken = cookies.jwt;

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            async (err: any, decoded: any) => {
                if (err) {
                    return logger.respondWithError(
                        res,
                        new CustomError(err.message, 500)
                    );
                }

                const user = await User.findOne({ email: decoded.user.email });
                if (!user)
                    return logger.respondWithError(
                        res,
                        new AuthenticationError("Not logged in!")
                    );

                const accessToken = jwt.sign(
                    { user },
                    process.env.ACCESS_TOKEN_SECRET!,
                    {
                        expiresIn: "15m",
                    }
                );

                return logger.respondWithData(res, { accessToken }, 200);
            }
        );
    }
}

export default AuthController;
