import postgres, { type Sql } from 'postgres';

let sqlInstance: Sql | undefined;

function getSql(): Sql {
  if (sqlInstance) {
    return sqlInstance;
  }

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('POSTGRES_URL is not set');
  }

  sqlInstance = postgres(connectionString, {
    ssl: connectionString.includes('localhost') ? false : 'require',
  });

  return sqlInstance;
}

const sql: Sql = new Proxy(function () {} as unknown as Sql, {
  apply(_target, _thisArg, args) {
    return Reflect.apply(getSql() as unknown as Function, _thisArg, args);
  },
  get(_target, prop, receiver) {
    const value = Reflect.get(getSql() as object, prop, receiver);
    return typeof value === 'function'
      ? (value as Function).bind(getSql())
      : value;
  },
});

export default sql;
