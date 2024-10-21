const fs = require("fs");
const path = require("path");

// Get the chapter number from the command line arguments
const chapterNumber = process.argv[2];

if (!chapterNumber) {
  console.error(
    "Please provide a chapter number. Usage: node remove-chapter.js <chapter-number>\n"
  );
  process.exit(1);
}

// Paths for the chapter to be removed
const srcDir = path.join(__dirname, "../src", `chapter${chapterNumber}`);
const testDir = path.join(__dirname, "../test", `chapter${chapterNumber}`);

// Function to delete a folder and its contents
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolderRecursive(currentPath); // Recursively delete subfolders
      } else {
        fs.unlinkSync(currentPath); // Delete files
      }
    });
    fs.rmdirSync(directoryPath);
    console.log(`Deleted folder: ${directoryPath}\n`);
  }
}

// Delete the src and test directories for the chapter
deleteFolderRecursive(srcDir);
deleteFolderRecursive(testDir);

// Read package.json
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Remove the test script for this chapter
const testScriptKey = `test:chapter${chapterNumber}`;
if (packageJson.scripts[testScriptKey]) {
  delete packageJson.scripts[testScriptKey];
  console.log(`Removed test script for Chapter ${chapterNumber}\n`);
} else {
  console.warn(`No test script found for Chapter ${chapterNumber}\n`);
}

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Chapter ${chapterNumber} removed successfully!\n`);
