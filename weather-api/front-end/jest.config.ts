export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
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
