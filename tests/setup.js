// tests/setup.js - Test setup and teardown
beforeEach(() => {
  // Reset any test data if needed
  console.log("Setting up test...");
});

afterEach(() => {
  // Clean up after each test
  console.log("Cleaning up test...");
});

// Mock console.log during tests to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};
