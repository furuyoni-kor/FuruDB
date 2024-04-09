/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  roots: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@/(.*)": ["<rootDir>/src/$1"],
  },
};

module.exports = config;
