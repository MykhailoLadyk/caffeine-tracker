var countPairs = function (nums, k) {
  let counter = 0;
  let hashmap = {};
  for (let i = 0; i < nums.length; i++) {
    hashmap[nums[i]] = hashmap[nums[i]] || [];
    hashmap[nums[i]].push(i);
  }
  for (let key in hashmap) {
    let val = hashmap[key];
    for (let i = 0; i < val.length; i++) {
      for (let j = i + 1; j < val.length; j++) {
        if ((val[i] * val[j]) % k == 0) {
          counter++;
        }
      }
    }
  }
  return counter;
};
console.log(countPairs([3, 1, 2, 2, 2, 1, 3], 2));
