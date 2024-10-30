import CustomError from "./CustomError";

class AuthenticationError extends CustomError {
    constructor(message?: string) {
        super(message || "Authentication Error", 401);
    }
}

export default AuthenticationError;
