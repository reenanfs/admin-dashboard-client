export enum ValidationMessages {
  REQUIRED = 'This field is required.',
  EMAIL = 'This field needs to be a valid email.',
  DATE = 'This field should contain a valid date.',
  BOOLEAN = 'This field should contain a boolean',
  PASSWORD_LENGTH = 'Password must have at least 12 characters.',
  PASSWORD_UPPERCASE = 'Password must contain at least one uppercase letter.',
  PASSWORD_LOWERCASE = 'Password must contain at least one lowercase letter.',
  PASSWORD_DIGIT = 'Password must contain at least one digit',
  SERVER_INVALID_CREDENTIALS = 'The credentials you inserted are invalid.',
  SERVER_INTERNAL_ERROR = 'The server is facing an internal issue at the moment.',
}
