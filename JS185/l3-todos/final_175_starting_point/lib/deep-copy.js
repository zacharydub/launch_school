const deepCopy = object => {
  if (typeof object !== "object") return object;
  return JSON.parse(JSON.stringify(object));
  //The deepCopy function uses JSON to make a deep copy of an arbitrary object....The JSON.stringify method can convert most JavaScript objects to a JSON-formatted string. However, this process discards the object's prototype as well as any methods defined on the object. Fortunately, we're not concerned about either of those things since we're working with ordinary objects that don't have useful prototypes or methods. Once we have a JSON-formatted string, we can use JSON.parse to convert it back to a JavaScript object.
};

module.exports = deepCopy;