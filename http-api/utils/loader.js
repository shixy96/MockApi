const fs = require("fs");
const path = require("path");
const is = require("./is");
const { readFile } = require("./fileReader");

/**
 *
 * @param {Object} option
 * @param {string} option.directory
 * @param {string} option.file
 * @param {Function} option.callback callback(...property, file)
 */
function load({ directory, file, callback }) {
  if (is.string(directory) && is.notEmptyString(file)) {
    loadFile(directory, file, callback);
  } else {
    loadDirection(directory, file, callback);
  }
}

function loadFile(directory, file, callback) {
  let filePath = path.join(directory, file);
  const content = readFile(filePath);
  const properties = getProperties(filePath);
  callback(properties, content);
}

function loadDirection(directory, callback) {
  const files = fs.readdirSync(directory);
  files.forEach(fileName => {
    let fullPath = path.join(directory, fileName);
    if (fs.statSync(fullPath).isDirectory()) {
      loadDirection(fullPath, callback);
    } else {
      loadFile(fullPath, "", callback);
    }
  });
}

/**
 * convert file path to an array of properties
 *
 * @param {string} filepath
 * @example a/b/c.js => ['a', 'b', 'c']
 */
function getProperties(filepath) {
  const properties = filepath
    .substring(0, filepath.lastIndexOf("."))
    .split(/[\\/]/);
  return properties.map(property => {
    if (!/^[a-z][\.a-z0-9_-]*$/i.test(property)) {
      throw new Error(`${property} is not match 'a-z0-9_-' in ${filepath}`);
    }

    // foo_bar-zar -> fooBarZar
    property = property.replace(/[_-][a-z]/gi, s =>
      s.substring(1).toUpperCase()
    );
    return property[0].toLowerCase() + property.substring(1);
  });
}

module.exports = { load, loadFile, loadDirection };
