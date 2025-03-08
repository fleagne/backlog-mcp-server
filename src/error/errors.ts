class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode = 500, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class APIError extends AppError {
	constructor(message: string, statusCode = 500) {
		super(`API Error: ${message}`, statusCode);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(`Validation Error: ${message}`, 400);
	}
}

export class ConfigurationError extends AppError {
	constructor(message: string) {
		super(`Configuration Error: ${message}`, 500, false);
	}
}

export function formatError(error: unknown): string {
	if (error instanceof AppError) {
		return `${error.message} (Code: ${error.statusCode})`;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return String(error);
}
