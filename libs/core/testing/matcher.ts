export function extendMatcher() {
  expect.extend({
    toBeWithinErrorMargin(received: number, expected: number, errorRate = 0.01) {
      const delta = expected * errorRate;
      const pass = received >= expected - delta && received <= expected + delta;
      if (pass) {
        return {
          message: () => `expected ${received} not to be within ${errorRate * 100}% error margin ${expected}`,
          pass: true,
        };
      } else {
        return {
          message: () => `expected ${received} to be within ${errorRate * 100}% error margin ${expected}`,
          pass: false,
        };
      }
    },
  });
}
