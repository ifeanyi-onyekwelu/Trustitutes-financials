const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://www.trustitutesfinancials.com",
];

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
