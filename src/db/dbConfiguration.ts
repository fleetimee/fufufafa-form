import postgres from "postgres";

const sql = postgres({
  host: process.env.PGHOST,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT as unknown as number,
  debug: true,
});

export { sql };
