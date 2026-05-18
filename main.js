// 1. Debounce Function
function debounce(funct, delay = 400) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      funct.apply(this, args);
    }, delay);
  };
}

// 2. Throttle Function
function throttle(funct, delay = 400) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date();

    if (now - lastCall >= delay) {
      lastCall = now;
      funct.apply(this, args);
    }
  };
}

// 3. Polyfill for Array.map
Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
    continue;
  }

  return result;
};

// 4. Polyfill for Array.filter
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const filteredResult = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      const value = callback.call(thisArg, this[i], i, this);

      if (value) {
        filteredResult.push(this[i]);
      }
    }

    continue;
  }

  return filteredResult;
};

// 5. Polyfill for Array.reduce
Array.prototype.myReducer = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let accumulator;
  let startndex;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    startndex = 0;
  } else {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    accumulator = this[0];
    startndex = 1;
  }

  for (let i = startndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

// 6. Deep Clone Object: Clone nested objects.
function deepClone(value) {
  if (value === null) return value;

  const dataTypes = [
    "string",
    "number",
    "boolean",
    "undefined",
    "bigint",
    "symbol",
  ];

  if (dataTypes.includes(typeof value)) {
    return value;
  }

  // handle arrays
  if (Array.isArray(value)) {
    const result = [];

    for (let i = 0; i < value.length; i++) {
      result.push(deepClone(value[i]));
    }

    return result;
  }

  // handle objects
  const result = {};

  for (const key in value) {
    result[key] = deepClone(value[key]);
  }

  return result;
}

// 7. Flatten Nested Array
function flattenArray(arr) {
  if (arr.length == 0) return;

  const result = [];

  arr.forEach((value) => {
    if (!Array.isArray(value)) {
      result.push(value);
    } else {
      result.push(...flattenArray(value));
    }
  });

  return result;
}

// 8. Implement Currying
function currying(a = 0) {
  console.log(a);

  return function (b) {
    console.log(b);

    return function (c) {
      console.log(c);

      return function () {
        console.log("Done!");
      };
    };
  };
}

// 9. Memoization
function memoization(funct) {
  let cache = {};

  return function (arg) {
    if (cache[arg]) return cache[arg];

    const result = funct(arg);
    cache[arg] = result;

    return result;
  };
}

// 10. Closure in JS
function outer() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const fn = outer();
// fn(); // 1
// fn(); // 2
// fn(); // 3

// 11. Implement Promise.all
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          result[index] = data;
          completed++;

          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

// =========================== DSA/Prob - Solving =========================== //
// 12. Two Sum
// Find indices whose sum equals target.
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    } else {
      map.set(nums[i], i);
    }
  }
}

twoSum([2, 11, 3, 15, 7, 3], 6);

// 13. Contains Duplicate
function containsDupl(arr) {
  const copy = [];

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (copy.includes(num)) {
      return true;
    } else {
      copy.push(num);
    }
  }

  return false;
}
