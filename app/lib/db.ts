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

type SqlCallable = (...args: unknown[]) => unknown;

const sql: Sql = new Proxy(function () {} as unknown as Sql, {
  apply(_target, _thisArg, args: unknown[]) {
    const fn = getSql() as unknown as SqlCallable;
    return Reflect.apply(fn, _thisArg, args);
  },
  get(_target, prop, receiver) {
    const value = Reflect.get(getSql() as object, prop, receiver);
    if (typeof value !== 'function') {
      return value;
    }
    return (value as SqlCallable).bind(getSql());
  },
});

export default sql;
