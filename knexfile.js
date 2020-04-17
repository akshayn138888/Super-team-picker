// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "superTeam"
    }
  },

  migrations: {
    tableName: "migrations",
    directory: "./db/migrations"
  }
};
