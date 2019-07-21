const fs = require("fs");
const path = require("path");

const MOCK_DIR = path.resolve(__dirname, "../");

/**
 *
 * @param {string} filePath directory starting from the project folder
 */
function readFile(filePath) {
  return /\.json$/.test(filePath)
    ? readJson(filePath)
    : require("../" + filePath);
}

function readJson(filePath) {
  const jsonPath = path.resolve(MOCK_DIR, filePath);
  let data = fs.readFileSync(jsonPath);
  return JSON.parse(data);
}

module.exports = { readFile, readJson };
