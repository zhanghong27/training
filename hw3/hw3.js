// reduce
Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue === undefined ? undefined : initialValue;
    for (let i = 0; i < this.length; i++) {
        if (accumulator === undefined) {
            accumulator = this[i];
        } 
        else {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }
    return accumulator;
};

// filter
Array.prototype.myFilter = function(callback) {
    let filteredArray = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        filteredArray.push(this[i]);
      }
    }
    return filteredArray;
};

// find 
Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
};

// concat
Array.prototype.myConcat = function(...args) {
    let newArr = [...this];
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        newArr.push(...args[i]);
      } else {
        newArr.push(args[i]);
      }
    }
    return newArr;
};

// push
Array.prototype.myPush = function(...args) {
    let length = this.length;
    for (let i = 0; i < args.length; i++) {
      this[length + i] = args[i];
    }
    return this.length;
};

// pop
Array.prototype.myPop = function() {
    if (this.length === 0) {
      return undefined;
    }
    const lastElement = this[this.length - 1];
    this.length--;
    return lastElement;
};
  
  