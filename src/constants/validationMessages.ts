export enum ValidationMessages {
  REQUIRED = 'This field is required.',
  EMAIL = 'This field needs to be a valid email.',
  DATE = 'This field should contain a valid date.',
  BOOLEAN = 'This field should contain a boolean',
  PASSWORD = 'The password must have at least 8 characters. It also must includes at least: 1 uppercase letter, 1 lowercase letter and 1 digit.',
  PASSWORD_MATCH = 'Passwords are not matching.',
  SERVER_INVALID_CREDENTIALS = 'The credentials you inserted are invalid.',
  SERVER_INTERNAL_ERROR = 'The server is facing an internal issue at the moment.',
  SERVER_BAD_REQUEST = 'A bad request has been sent to the server.',
  SERVER_EMAIL_IN_USE = 'The email is already in use.',
}
