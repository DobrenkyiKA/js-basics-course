/**
 * Change the capitalization of all letters in a string
 */
export const changeCase = (string) => {
  return string.split('').
      map(char => char.toLowerCase() === char
          ? char.toUpperCase()
          : char.toLowerCase()).
      join('');
};

/**
 * Filter out the non-unique values in an array
 */
export const filterNonUnique = (inputArray) => {
  return inputArray.filter(
      e => inputArray.indexOf(e) === inputArray.lastIndexOf(e));
};

/**
 * Sort string in alphabetical order
 */
export const alphabetSort = (string) => {
  return string.split('').sort().join(''); // sort in UNICODE order
  // sort in ALPHABETICAL order:
  // ((a, b) => {
  //   return a.localeCompare(b);
  // }).join('');

};

/**
 * Get min integer
 */
export const getSecondMinimum = (inputArray) => {
  let sortedArray = inputArray.sort((a, b) => a - b);
  return sortedArray[1];
};

/**
 * Double every even integer
 */
export const doubleEveryEven = (inputArray) => {
  return inputArray.map(a => a % 2 === 0 ? a *= 2 : a);
};

/**
 * Create array with all possible pairs of two arrays
 */
export const getArrayElementsPairs = (firstArray, secondArray) => {
  let multidimensionalArray = [];
  for (let i = 0; i < firstArray.length; i++) {
    for (let j = 0; j < secondArray.length; j++) {
      multidimensionalArray.push([firstArray[i], secondArray[j]]);
    }
  }

  return multidimensionalArray;
};

/**
 * Deep equal
 */
export const deepEqual = (firstObject, secondObject) => {
  return JSON.stringify(firstObject) === JSON.stringify(secondObject);
};

/**
 * Format date
 */
export const formatDate = (anyFormatDate) => {
  let formattedDate;
  if (Array.isArray(anyFormatDate)) {
    formattedDate = new Date(anyFormatDate[0], anyFormatDate[1],
        anyFormatDate[2]);
  } else {
    formattedDate = new Date(anyFormatDate);
  }
  let day = formattedDate.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = formattedDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = formattedDate.getFullYear().toString(10).slice(2, 4);

  return `${day}.${month}.${year}`;
};
