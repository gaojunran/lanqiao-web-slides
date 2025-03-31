const pipeline = (initialValue, sequence) => {
  return sequence.reduce((prevPromise, fn) => {
      const result = prevPromise.then(fn)
      console.log(result);
      return result;
  }, Promise.resolve(initialValue));
};

const pipeline2 = async (initialValue, sequence) => {
  return sequence.reduce(async (prevPromise, fn) => {
      let result = await prevPromise;
      return fn(result);
  }, Promise.resolve(initialValue));
};

