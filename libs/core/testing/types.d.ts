declare namespace jest {
  interface Matchers<R> {
    toBeWithinErrorMargin(expected: number, errorRate?: number): R;
  }
}
