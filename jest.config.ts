import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@anthropic-ai/bedrock-sdk$': '<rootDir>/src/index.ts',
    '^@anthropic-ai/bedrock-sdk/_shims/auto/(.*)$': '<rootDir>/src/_shims/auto/$1-node',
    '^@anthropic-ai/bedrock-sdk/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/ecosystem-tests/',
    '<rootDir>/dist/',
    '<rootDir>/deno/',
    '<rootDir>/deno_tests/',
  ],
};

export default config;
