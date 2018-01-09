export type GenericNullable<T> = {
    [P in keyof T]: T[P] | null;
}

export type GenericPartial<T> = {
    [P in keyof T]?: T[P];
}