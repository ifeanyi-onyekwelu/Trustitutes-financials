import CustomError from "./CustomError";

class ConflictError extends CustomError {
    constructor(message?: string) {
        super(message || "Conflict Error", 409);
    }
}

export default ConflictError;
