module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '24c1b925e458f4ebeb51fc03e8ecfb0c'),
  },
});
