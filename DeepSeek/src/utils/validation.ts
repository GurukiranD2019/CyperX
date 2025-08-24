import { authenticateUser } from './auth';
import type { AuthResult } from './auth';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface FormErrors {
  username?: string;
  password?: string;
  credentials?: string;
}

// Username validation
export const validateUsername = (username: string): ValidationResult => {
  if (!username.trim()) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters' };
  }
  
  // Check for valid characters (alphanumeric, underscore, hyphen)
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }
  
  return { isValid: true, message: '' };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, message: '' };
};

// Validate entire login form
export const validateLoginForm = (username: string, password: string): FormErrors => {
  const errors: FormErrors = {};
  
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.message;
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  return errors;
};

// Check if form has any errors
export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== '');
};

// Validate credentials against stored users
export const validateCredentials = (username: string, password: string): AuthResult => {
  return authenticateUser(username, password);
};

// Validate entire login form including credentials
export const validateLoginFormWithCredentials = (username: string, password: string): FormErrors => {
  const errors: FormErrors = {};
  
  // First validate format
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.message;
    return errors; // Return early if format is invalid
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
    return errors; // Return early if format is invalid
  }
  
  // If format is valid, check credentials
  const credentialValidation = validateCredentials(username, password);
  if (!credentialValidation.success) {
    errors.credentials = credentialValidation.message;
  }
  
  return errors;
};
