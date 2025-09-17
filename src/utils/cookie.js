export const cookies = {
  getOptions: () => ({
    httpsonly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  }),
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },
  clear: (res, name) => {
    res.clearCookie(name, cookies.getOptions());
  },
  get: (req, name) => {
    return req.cookies[name];
  },
};
