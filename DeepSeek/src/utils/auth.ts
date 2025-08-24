import usersData from '../data/users.json';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  message: string;
}

// Get all users (for development purposes only)
export const getUsers = (): User[] => {
  return usersData.users;
};

// Find user by username
export const findUserByUsername = (username: string): User | null => {
  return usersData.users.find(user => 
    user.username.toLowerCase() === username.toLowerCase()
  ) || null;
};

// Authenticate user credentials
export const authenticateUser = (username: string, password: string): AuthResult => {
  // Find user by username
  const user = findUserByUsername(username);
  
  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }
  
  // Check password (in a real app, you'd use bcrypt to compare hashed passwords)
  if (user.password !== password) {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }
  
  // Return user data without password for security
  const userWithoutPassword = {
    ...user,
    password: '' // Remove password from response
  };
  
  return {
    success: true,
    user: userWithoutPassword,
    message: 'Login successful'
  };
};

// Check if username exists (for registration validation)
export const usernameExists = (username: string): boolean => {
  return findUserByUsername(username) !== null;
};

// Get user by ID
export const getUserById = (id: number): User | null => {
  return usersData.users.find(user => user.id === id) || null;
};
