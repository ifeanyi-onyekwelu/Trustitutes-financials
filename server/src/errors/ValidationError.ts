import CustomError from "./CustomError";

class ValidationError extends CustomError {
    constructor(message?: string) {
        super(message || "Invalid Input", 400);
    }
}

export default ValidationError;
