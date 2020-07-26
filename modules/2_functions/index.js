/**
 * Currying
 */
export const mergeWords =
    (word1) =>
        (word2) =>
            (word3) =>
                (word4) =>
                    () => `${word1} ${word2} ${word3} ${word4}`;

/**
 * Every/Some
 */
export const checkUsersValid = (goodUsers) => {
  return (checkedUsers) => checkedUsers.every((checkedUser) => goodUsers.some(
      (goodUser) => goodUser.id === checkedUser.id));
};

/**
 * Reduce
 */
export const countWords = (inputWordsArray) => {
  return inputWordsArray.reduce((result, word) => {
    result[word] = result.hasOwnProperty(word) ? ++result[word] : 1;
    return result;
  }, {});
};

/**
 * Palindrome
 */
export const isPalindrome = (word) => {
  return word.split('').reverse().join('') === word
      ? `The entry is a palindrome`
      : `Entry is not a palindrome`;
};

/**
 * Recursion
 */
export const factorial = (takeFactorial) => {
  if (takeFactorial === 1) return 1;
  return takeFactorial * factorial(--takeFactorial);
};

export const amountToCoins = (amount, coins) => {
  if (amount === 0) return [];
  let currentCoin = coins[0];
  let newAmount = amount - currentCoin;
  if (newAmount > 0 && newAmount < currentCoin) {
    let usedCoin = coins.shift();
    return [usedCoin].concat(amountToCoins(newAmount, coins));
  } else if (newAmount < 0) {
    coins.shift();
    return amountToCoins(amount, coins);
  }
  return [currentCoin].concat(amountToCoins(newAmount, coins));
};

export const repeat = (func, number) => {
  if (number !== 0) {
    func();
    repeat(func, --number);
  }
};

export const reduce = (a,b,c) => {
  return a.reduce(b, c);
};
