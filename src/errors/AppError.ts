class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(_message: string, _statusCode = 500, _isOperational = true) {
        super(_message);
        this.statusCode = _statusCode;
        this.isOperational = _isOperational;
        // Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;