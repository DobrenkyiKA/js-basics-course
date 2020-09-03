export const delay = (timeout) => {
  return new Promise((resolve =>
      setTimeout(resolve, timeout)));
};

export const runPromisesInSeries = (promiseCalls) => {
  promiseCalls.reduce((current, next) => current.then(next), Promise.resolve());
};

export const Promise_all = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let counter = promises.length;
    if (counter === 0) {
      resolve([]);
    }
    promises.forEach((promise, index) => {
      promise.then(value => {
        results[index] = value;
        counter--;
        if (counter === 0) {
          resolve(results);
        }
      })
      .catch(reason => reject(reason));
    });
  });
};

export const fibonacci = (n) => {
  return fib(n)
};

function* fib(n, current = 0, next = 1) {
  if (n === 0) {
    return current;
  }
  yield current;
  yield* fib(n - 1, next, current + next);
}

export async function helper (generatorFunction) {
  const generator = generatorFunction();
  let generatedValue = await generator.next().value;
  try {
    while(generatedValue !== undefined) {
      generatedValue = await generator.next(generatedValue).value;
    }
  } catch(e) {
    generator.throw(e);
  }
};


export const MyPromise = () => {};
