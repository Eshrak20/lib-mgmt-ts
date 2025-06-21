"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
const handleErrorResponse = (res, error) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
    else {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: {
                name: error.name || "UnknownError",
                message: error.message || "Internal Server Error",
            },
        });
    }
};
exports.handleErrorResponse = handleErrorResponse;
