// 1
function reverseNumber(num) {
    const reversed = parseInt(num.toString().split('').reverse().join(''));
    return reversed;
}

// 2
function isPalindrome(str){
    const reversed = str.split('').reverse().join('')
    return str == reversed;
}

// 3
function generateCombo(str){
    const arr = [];
    for (let i = 0; i < str.length; i++){
        for (let j = i + 1; j <= str.length; j++){
            arr.push(str.slice(i, j));
        }
    }
    return arr;
}

// 4
function sortString(str){
    const sorted = str.split('').sort().join('');
    return sorted;
}

// 5
function capitalize(str){
    const capitalizeWords = str.split('').map(word => {
        const first = word.charat(0).toUpperCase();
        const rest = word.slice(1);
        return `${first}${rest}`;
    })
    return capitalizeWords.join(' ');
}

// 6
function maxLength(sentence){
    const words = sentence.split(' ');
    const longest = '';
    let max_len = 0;
    for (let i = 0; i < words.length; i++){
        const word = words[i];
        if (word.length > max_len){
            max_len = word.length;
            longest = word;
        }
    }
    return longest;
}

// 7
function countVowel(str){
    const vowels = ['a', 'o', 'e', 'i', 'u'];
    let count = 0;
    const lower_str = str.toLowerCase();
    for (let i = 0; i < str.length; i++){
        const char = lower_str[i];
        if (vowels.includes(char)){
            count++;
        }
    }
    return count;
}

// 8
function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
        return false;
        }
    }
    return true;
}

// 9
function getType(arg) {
    return typeof arg;
}

// 10
function identityMatrix(n) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? 1 : 0);
      }
      matrix.push(row);
    }
    return matrix;
}

// 11
function findSecondLowestAndGreatest(arr) {
    arr.sort(function(a, b) {
      return a - b;
    });
    var secondLowest = arr[1];
    var secondGreatest = arr[arr.length - 2];
    return secondLowest + ", " + secondGreatest;
}

// 12
function isPerfectNumber(num) {
    let sum = 0;
    for (let i = 1; i < num; i++) {
      if (num % i === 0) {
        sum += i;
      }
    }
    return sum === num;
}

// 13
function getFactors(num) {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
}

// 14
function amountToCoins(amount, coins) {
    let result = [];
    for (let i = 0; i < coins.length; i++) {
      while (amount >= coins[i]) {
        result.push(coins[i]);
        amount -= coins[i];
      }
    }
    return result;
}

// 15
function power(base, exponent) {
    return Math.pow(base, exponent);
}

// 16
function extractUniqueCharacters(str) {
    const chars = str.split('');
    const uniqueChars = chars.filter((char, index) => {
      return chars.indexOf(char) === index;
    });
    return uniqueChars.join('');
}

// 17
function countOccurrences(str) {
    str = str.toLowerCase();
    const counts = {};
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (/[a-z]/.test(char)) {
        counts[char] = (counts[char] || 0) + 1; // ensure default to 0
      }
    }
    return counts;
}
  
// 18
function binarySearch(arr, value) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
  
        if (arr[mid] === value) {
            return mid;
        } else if (arr[mid] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
  
    return -1;
}
  
// 19
function getLargerElements(arr, num) {
    return arr.filter((elem) => elem > num);
}
  
// 20 
function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}
  
// 21
function getSubsets(array, length, startingIndex = 0, current = []) {
    if (current.length === length) {
      return [current];
    }
  
    const result = [];
  
    for (let i = startingIndex; i < array.length; i++) {
      const updated = current.concat(array[i]);
  
      const subsets = getSubsets(array, length, i + 1, updated);
  
      result.push(...subsets);
    }
  
    return result;
}

// 22
function countOccurrences(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === letter) {
        count++;
      }
    }
    return count;
}

// 23
function findFirstNonRepeatedChar(str) {
    const charCount = {};
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      charCount[char] = charCount[char] ? charCount[char] + 1 : 1;
    }
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (charCount[char] === 1) {
        return char;
      }
    }
    
    return null;
}
  
// 24
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
}

// 25
function Longest_Country_Name(countryList) {
    let longestName = "";
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].length > longestName.length) {
        longestName = countryList[i];
      }
    }
    return longestName;
}

// 26
function longestSubstring(str) {
    let max = 0, start = 0;
    let map = new Map();
  
    for(let i = 0; i < str.length; i++) {
      let char = str[i];
      
      if(map.get(char) >= start) {
        start = map.get(char) + 1;
      }
      
      map.set(char, i);
      
      if(i - start + 1 > max) {
        max = i - start + 1;
      }
    }
  
    return str.substr(start, max);
}

// 27
function longestPalindrome(str) {
    let maxLength = 1;
    let start = 0;
    
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j < str.length; j++) {
        let isPalindrome = true;
        for (let k = i; k <= (i + j) / 2; k++) {
          if (str[k] !== str[j - k + i]) {
            isPalindrome = false;
            break;
          }
        }
        if (isPalindrome && j - i + 1 > maxLength) {
          maxLength = j - i + 1;
          start = i;
        }
      }
    }
    
    return str.substring(start, start + maxLength);
  }
  
// 28
function add(a, b) {
    return a + b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function doMath(operation, a, b) {
    return operation(a, b);
}

// 29
function getFunctionName(fn) {
    return fn.name;
}
  
  
  
  
  
  
  
  
  
  