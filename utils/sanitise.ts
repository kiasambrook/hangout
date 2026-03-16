export const sanitiseEmail = (email: string) => {
  return email.trim().toLowerCase().replace(/\s+/g, '');
}

export const validatePassword = (password: string, confirmPassword: string = "") => {
  const minPasswordLength = 8;
  const maxPasswordLength = 4096;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/;

  if (password.length < minPasswordLength) {
    return 'Password must be at least 8 characters';
  }

  if (password.length > maxPasswordLength) {
    return 'Password must be less than 4096 characters';
  }

  if (!passwordRegex.test(password)) {
    return 'Password must contain an uppercase and lowercase character';
  }

  if (confirmPassword && password !== confirmPassword) {
    return 'Passwords do not match';
  }
}