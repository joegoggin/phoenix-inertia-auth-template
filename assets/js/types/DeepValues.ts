export type DeepValues<T> = T extends object
    ? T[keyof T] extends infer V
        ? V extends string
            ? V
            : DeepValues<V>
        : never
    : T;
