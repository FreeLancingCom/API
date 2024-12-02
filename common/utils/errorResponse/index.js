class ErrorResponse extends Error {
  constructor(message, status, errorCode, errors, data) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.errors = errors || null;
    this.data = data || null;
  }
}

export default ErrorResponse;
