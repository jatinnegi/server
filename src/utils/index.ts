export const cleanErrors = (errors: any[]): Record<string, string> => {
  const cleanedErrors: Record<string, string> = {};

  for (const error of errors) {
    cleanedErrors[error.path] = error.msg;
  }

  return cleanedErrors;
};
