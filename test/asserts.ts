export interface Assert {
  (expr: unknown, msg?: string): void;
}

export interface AssertEquals {
  <T>(actual: T, expected: T, msg?: string): void;
  (actual: unknown, expected: unknown, msg?: string): void;
}
