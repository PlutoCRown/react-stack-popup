export type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

export type Expect<T extends true> = T;

// union -> intersection
export type UnionToIntersection<U> = (U extends any ? (x: U) => 0 : never) extends (
    x: infer I,
) => 0
    ? I
    : never;

// 取 union 的最后一个成员
type LastOf<U> =
    UnionToIntersection<U extends any ? (x: U) => 0 : never> extends (
        x: infer L,
    ) => 0
    ? L
    : never;

// union -> tuple
type UnionToTuple<U, T extends any[] = []> = [U] extends [never]
    ? T
    : UnionToTuple<Exclude<U, LastOf<U>>, [LastOf<U>, ...T]>;

// union length
export type UnionLength<U> =
    UnionToTuple<U> extends { length: infer L }
    ? L
    : never

export type Length<Arr extends readonly any[]> = Arr["length"];
