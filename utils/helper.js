export function isArray(value) {
  return value && typeof value === "object" && value.constructor === Array;
}
