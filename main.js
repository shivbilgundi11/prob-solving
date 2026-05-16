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
