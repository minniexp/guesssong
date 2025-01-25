const randomUnique = (range, count) => {
  let nums = new Set();
  console.log("randomUnique: ", range, count);
  while (nums.size < count) {
    // Generate a number from 0 to range - 1
    let randomNum = Math.floor(Math.random() * range);
    nums.add(randomNum);
    console.log("nums: ", nums);
  }
  return [...nums];
};

const randomUniqueQuestion = (range) => {
  // Generate a number from 0 to range - 1
  console.log("randomUniqueQuestion: ", Math.floor(Math.random() * range));
  return Math.floor(Math.random() * range);
};

export { randomUnique, randomUniqueQuestion };
