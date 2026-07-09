export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  metadata: {
    timestamp: string;
    requestId?: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: unknown;
  metadata: {
    timestamp: string;
    requestId?: string;
  };
}

export class ApiResponse {
  static success<T>(
    data: T,
    message = "Request completed successfully",
    requestId?: string
  ): ApiSuccessResponse<T> {
    return {
      success: true,
      message,
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId,
      },
    };
  }

  static error(
    message: string,
    error?: unknown,
    requestId?: string
  ): ApiErrorResponse {
    return {
      success: false,
      message,
      error,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId,
      },
    };
  }
}