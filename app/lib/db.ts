import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not set');
}

const sql = postgres(connectionString, {
  ssl: connectionString.includes('localhost') ? false : 'require',
});

export default sql;
