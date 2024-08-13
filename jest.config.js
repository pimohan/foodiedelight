module.exports = {
  // Transform files with ts-jest and babel-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  // Use regex to match test files
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  // Specify file extensions for modules
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Transform files in node_modules except specified packages
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
};
