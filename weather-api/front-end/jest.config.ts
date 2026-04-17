export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    '/node_modules/(?!(msw|@mswjs)/)',
  ],
  testMatch: ["**/*.test.tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/fileMock.ts",
    "next/font/google": "<rootDir>/__mocks__/nextFontMock.ts",
  },
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
};
