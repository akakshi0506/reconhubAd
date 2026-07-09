export class AppError extends Error {
  readonly statusCode: number;

  readonly code: string;

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR"
  ) {
    super(message);

    this.statusCode = statusCode;

    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}