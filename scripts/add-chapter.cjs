const fs = require("fs");
const path = require("path");

// Get the chapter number from the command line arguments
const chapterNumber = process.argv[2];

if (!chapterNumber) {
  console.error(
    "Please provide a chapter number. Usage: node add-chapter.js <chapter-number>"
  );
  process.exit(1);
}

// Paths for new chapter
const srcDir = path.join(__dirname, "../src", `chapter${chapterNumber}`);
const testDir = path.join(__dirname, "../test", `chapter${chapterNumber}`);

// Create directories for the new chapter
fs.mkdirSync(srcDir, { recursive: true });
fs.mkdirSync(testDir, { recursive: true });

// Create empty solution and test files
fs.writeFileSync(
  path.join(srcDir, "solution.js"),
  "export function solution(input) { \n return false; \n} \n"
);

fs.writeFileSync(
  path.join(testDir, "solution.test.js"),
  `import { expect } from "chai";
import { solution } from "../../src/chapter${chapterNumber}/solution.js";

describe("Chapter ${chapterNumber} - Solution Test", () => {
  it("should return the expected value", () => {
    const expectedValue = false;
    const result = solution();
    expect(result).to.equal(expectedValue);
  });
})`
);
// Read package.json
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Add a new test script for this chapter
const testScriptKey = `test:chapter${chapterNumber}`;
packageJson.scripts[
  testScriptKey
] = `mocha test/chapter${chapterNumber}/**/*.test.js`;

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Chapter ${chapterNumber} added successfully!`);
console.log(
  `You can run\n \n pnpm test:chapter${chapterNumber} \n\nHappy coding!`
);
