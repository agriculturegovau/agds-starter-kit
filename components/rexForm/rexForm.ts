import { RexApiResponse } from "src/rexApplication";

export type RexFormProps<T = void> = T & {
  currentRex: Partial<RexApiResponse>;
  onComplete: (newRex: Partial<RexApiResponse>) => void;
};
