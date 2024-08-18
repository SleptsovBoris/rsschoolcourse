const getPasswordStrength = (password: string) => {
  if (password.length < 8) return 'Weak';
  if (
    password.match(/[A-Z]/) &&
    password.match(/[a-z]/) &&
    password.match(/[0-9]/) &&
    password.match(/[!@#$%^&*]/)
  )
    return 'Strong';
  return 'Moderate';
};

export default getPasswordStrength;
