module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB
    },
  },
  // production: {
  //   client: 'mysql2',
  //   connection: {
  //     host: process.env.DB_HOST_PROD,
  //     port: process.env.DB_PORT_PROD,
  //     user: process.env.DB_USER_PROD,
  //     password: process.env.DB_PASSWORD_PROD,
  //     database: process.env.DB_PROD
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   }
  // }
};