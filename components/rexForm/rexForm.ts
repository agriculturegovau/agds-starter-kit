export type RexFormProps<T> = T & {
  rexId: number;
  nextPage: () => void;
  prevPage?: () => void;
};
