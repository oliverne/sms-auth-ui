module.exports = ({ env }) => ({
  plugins: {
    cssnano:
      env === 'production'
        ? {
            preset: 'default',
          }
        : false,
  },
})
