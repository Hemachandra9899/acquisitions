export const formatValationError = error => {
  if (!error || error.issues) return 'valadation failed';

  if (Array.isArray(error.issues))
    return error.issues.map(i => i.messages.join(','));
  return JSON.stringify(error);
};
