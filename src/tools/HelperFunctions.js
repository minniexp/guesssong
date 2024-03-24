const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
        // Generate a number from 0 to range - 1
        let randomNum = Math.floor(Math.random() * range);
        nums.add(randomNum);
    }
    return [...nums];
};


const randomUniqueQuestion = (range) => {
    // Generate a number from 0 to range - 1
    return Math.floor(Math.random() * range);
};

export {
    randomUnique, randomUniqueQuestion
}