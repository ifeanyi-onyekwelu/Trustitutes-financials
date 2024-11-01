const allowedOrigins = ["https://www.trustitutesfinancials.com"];

const corsOptions = {
    origin: (
        origin: string | undefined,
        cb: (err: Error | null, allow?: boolean) => void
    ) => {
        if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
            cb(null, true);
        } else {
            cb(new Error("Not allowed by cors"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
};

export default corsOptions;
