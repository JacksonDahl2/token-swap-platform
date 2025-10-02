// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   roots: ['<rootDir>/src'],
//   testMatch: [
//     '**/__tests__/**/*.ts',
//     '**/?(*.)+(spec|test).ts'
//   ],
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//   },
//   collectCoverageFrom: [
//     'src/**/*.ts',
//     '!src/**/*.d.ts',
//     '!src/**/__tests__/**',
//   ],
//   moduleNameMapping: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
// };

module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node", // or 'jsdom' if you test DOM
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  // If you keep your setup file, prefer moving it to src/test/setup.ts
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  // If you can't move it, uncomment the next line to ignore it:
  // testPathIgnorePatterns: ['<rootDir>/src/__tests__/setup.ts'],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
