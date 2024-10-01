export class ApiError extends Error {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
