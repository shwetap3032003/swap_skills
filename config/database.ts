// export default ({ env }) => {
//   const client = env("DATABASE_CLIENT", "postgres");

//   const connections = {
//     sqlite: {
//       connection: {
//         filename: env("DATABASE_FILENAME", ".tmp/data.db"),
//       },
//       useNullAsDefault: true,
//     },

//     postgres: {
//       connection: {
//         host: env("DATABASE_HOST", "localhost"),
//         port: env.int("DATABASE_PORT", 5432),
//         database: env("DATABASE_NAME", "strapi"),
//         user: env("DATABASE_USERNAME", "postgres"),
//         password: env("DATABASE_PASSWORD", ""),
//         ssl: env.bool("DATABASE_SSL", false)
//           ? { rejectUnauthorized: false }
//           : false,
//       },
//       pool: {
//         min: env.int("DATABASE_POOL_MIN", 2),
//         max: env.int("DATABASE_POOL_MAX", 10),
//       },
//     },
//   };

//   return {
//     connection: {
//       client,
//       ...connections[client],
//       acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
//     },
//   };
// };



// export default ({ env }) => ({
//   connection: {
//     client: env("DATABASE_CLIENT", "postgres"),
//     connection: {
//       connectionString: env("DATABASE_URL"),
//       ssl: env.bool("DATABASE_SSL", true)
//         ? { rejectUnauthorized: false }
//         : false,
//     },
//     acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
//   },
// });

// export default ({ env }) => {
//   const client = env("DATABASE_CLIENT", "postgres");

//   const connections = {
//     postgres: {
//       connection: {
//         host: env("DATABASE_HOST", "127.0.0.1"),
//         port: env.int("DATABASE_PORT", 5432),
//         database: env("DATABASE_NAME", "skillswap"),
//         user: env("DATABASE_USERNAME", "postgres"),
//         password: String(env("DATABASE_PASSWORD", "")),
//         ssl: env.bool("DATABASE_SSL", false)
//           ? { rejectUnauthorized: false }
//           : false,
//       },
//     },
//   };

//   return {
//     connection: {
//       client,
//       ...connections[client],
//     },
//   };
// };

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: env.bool("DATABASE_SSL", false)
          ? { rejectUnauthorized: false }
          : false,
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
    },
  };
};