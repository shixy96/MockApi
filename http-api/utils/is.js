"use strict";

exports.finite = Number.isFinite;

exports.NaN = Number.isNaN;

exports.asyncFunction = function(obj) {
  return obj && obj.constructor && "AsyncFunction" === obj.constructor.name;
};

exports.promise = function(obj) {
  return obj && "function" === typeof obj.then;
};

var MAX_INT_31 = Math.pow(2, 31);

exports.int = function(obj) {
  return utils.isNumber(obj) && obj % 1 === 0;
};

exports.int32 = function(obj) {
  return exports.int(obj) && obj < MAX_INT_31 && obj >= -MAX_INT_31;
};

exports.long = function(obj) {
  return exports.int(obj) && (obj >= MAX_INT_31 || obj < -MAX_INT_31);
};

exports.Long = function(obj) {
  return (
    exports.object(obj) && exports.number(obj.high) && exports.number(obj.low)
  );
};

exports.double = function(obj) {
  return utils.isNumber(obj) && !isNaN(obj) && obj % 1 !== 0;
};

exports.date = function isDate(obj) {
  return obj instanceof Date;
};

exports.regExp = function isRegExp(obj) {
  return obj instanceof RegExp;
};
exports.regexp = exports.regExp;

exports.error = function isError(obj) {
  return obj instanceof Error;
};

exports.array = Array.isArray;

exports.boolean = function isBoolean(arg) {
  return typeof arg === "boolean";
};

exports.null = function isNull(arg) {
  return arg === null;
};

exports.nullOrUndefined = function isNullOrUndefined(arg) {
  return arg == null;
};

exports.number = function isNumber(arg) {
  return typeof arg === "number";
};

exports.string = function isString(arg) {
  return typeof arg === "string";
};

exports.notEmptyString = function isString(arg) {
  return typeof arg === "string" && arg !== "";
};

exports.symbol = function isSymbol(arg) {
  return typeof arg === "symbol";
};

exports.undefined = function isUndefined(arg) {
  return arg === void 0;
};

exports.object = function isObject(arg) {
  return typeof arg === "object" && arg !== null;
};

exports.function = function isFunction(arg) {
  return typeof arg === "function";
};

exports.primitive = function isPrimitive(arg) {
  return (
    arg === null ||
    typeof arg === "boolean" ||
    typeof arg === "number" ||
    typeof arg === "string" ||
    typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined"
  );
};

exports.buffer = Buffer.isBuffer;
