export const sanitiseEmail = (email: string) =>
  email.trim().toLowerCase().replace(/\s+/g, '');