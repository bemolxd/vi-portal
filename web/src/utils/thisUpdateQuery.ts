import { QueryInput, Cache } from '@urql/exchange-graphcache';

export function thisUpdateQuery<Result, Query>(
  cache: Cache,
  qeryInput: QueryInput,
  result: any,
  fun: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(
    qeryInput,
    (data) => fun(result, data as any) as any
  );
}
