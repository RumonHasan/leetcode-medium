// returning the first and last index of the target
const searchRange = (nums, target) => {
  let targetFirst = -1; // default value as -1
  let indexes = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target && targetFirst === -1) {
      targetFirst = i;
      // edge case for singe number array
      if (i === nums.length - 1) {
        indexes = [targetFirst, targetFirst];
      }
    } else {
      //edge case for array with all same values
      if (i === nums.length - 1 && targetFirst !== -1) {
        indexes = [targetFirst, i];
      }
      // edge case for finding the first and last if there is a bigger elemen
      if (nums[i] > target && targetFirst !== -1) {
        return [targetFirst, i - 1];
      }
    }
  }
  return targetFirst === -1 ? [-1, -1] : indexes;
};

//console.log(searchRange([1,4], 4));

const wordBreak = (s, wordDict) => {
  return verifyBreak(s, wordDict, 0, []);
};
// using recursion to create subsections and check whether each segment is available or not
function verifyBreak(word, dic, start, memo) {
  if (start === word.length) return true;
  if (memo[start] !== undefined) return memo[start];

  for (let end = start + 1; end <= word.length; end++) {
    let wildGuess = word.substring(start, end);
    if (dic.includes(wildGuess) && verifyBreak(word, dic, end, memo)) {
      return (memo[start] = true);
    }
  }
  return (memo[start] = false);
}

//console.log(wordBreak("letscheckthis", ['leet', 'code']))

// palindromic partitiion
const isPalindrome = (s, start, end) => {
  while (start < end) {
    if (s[start] !== s[end]) return false;
    start++;
    end--;
  }
  return true;
};

// partition palindrome using dfs
const partition = (s) => {
  const partitionArray = [];
  // dfs recursive helper
  const dfs = (index, s, slate) => {
    // base case
    if (index === s.length) {
      partitionArray.push(slate.slice());
      return;
    }
    // dfs recursive case
    for (let j = index; j < s.length; j++) {
      if (isPalindrome(s, index, j)) {
        console.log(index, j);
        let substring = s.slice(index, j + 1);
        console.log(substring);
        slate.push(substring);
        dfs(j + 1, s, slate);
        console.log(slate);
        slate.pop();
      }
    }
  };
  dfs(0, s, []);
  return partitionArray;
};

//console.log(partition("aab"))

const combinationSum = (candidates, target) => {
  console.log(candidates);
  let finalArray = [];
  const sortedCandidates = candidates.sort((a, b) => a - b);

  const backtracking = (index, target, stack) => {
    if (index === candidates.length) {
      finalArray.push(stack.slice());
    }
    for (let j = index; j < sortedCandidates.length; j++) {
      let subArray = sortedCandidates.slice(index, j + 1);
      console.log(subArray);
    }
  };

  backtracking(0, target, []);

  return finalArray;
};
//console.log(combinationSum([2,3,6,7], 7));

// leetcode 151: Reverse Words in a string

const reverseWords = (s) => {
  const sArray = s.split(' ');
  let finalString = '';
  let tempStack = [];
  let revStack = [];

  for (let i = 0; i < sArray.length; i++) {
    if (sArray[i] !== '') {
      tempStack.push(sArray[i]);
    }
  }
  for (let i = tempStack.length - 1; i >= 0; i--) {
    revStack.push(tempStack[i]);
  }
  for (let i = 0; i < revStack.length; i++) {
    finalString += revStack[i] + ' ';
  }
  return finalString.slice(0, -1);
};

//console.log(reverseWords("a good   example"));

// return the single number that has only like one occurence
const singleNumberII = (nums) => {
  console.log(nums);
  let hash = {};
  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] ? hash[nums[i]]++ : (hash[nums[i]] = 1);
  }
  for (const [key, value] of Object.entries(hash)) {
    if (value === 1) {
      return parseFloat(key);
    }
  }
};

//console.log(singleNumberII([2,2,3,2]));

const majorityElementII = (nums) => {
  const occurenceLimit = Math.floor(nums.length / 3);
  let finalArray = [];

  let hash = {};
  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] ? hash[nums[i]]++ : (hash[nums[i]] = 1);
  }
  for (const [key, value] of Object.entries(hash)) {
    if (value > occurenceLimit) {
      finalArray.push(parseFloat(key));
    }
  }
  return finalArray;
};

//console.log(majorityElementII([3,2,3]))

// leetcode 390 elimination game
const lastRemaining = (n) => {
  let initialArray = [];
  for (let i = 1; i <= n; i++) {
    initialArray.push(i);
  }
  console.log(initialArray);
};

//console.log(lastRemaining(9))

// find peak elements where it is strictly greater than its neighbors

const findPeakElement = (nums) => {
  const dummyElement = -Infinity;
  let maxElement = -Infinity;
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    const currentElement = nums[i];
    const prevElement = i === 0 ? dummyElement : nums[i - 1];
    const nextElement = i === nums.length - 1 ? dummyElement : nums[i + 1];

    // checking peak element
    if (currentElement > prevElement && currentElement > nextElement) {
      maxElement = Math.max(currentElement, maxElement);
      index = nums.indexOf(maxElement);
    }
  }
  return index;
};

//console.log(findPeakElement(
// [-2147483648,-2147483647]));

// need to find the longest consequtive elements length
const longestConsequtive = (nums) => {
  if (nums.length === 1) {
    return 1;
  }
  if (nums.length === 0 || undefined) {
    return 0;
  }
  let index = 0;
  let sortedNums = nums.sort((a, b) => a - b);
  const difference = 1;
  let conArray = [];
  let secondIndex = 1;
  let maxLength = -Infinity;
  while (index < sortedNums.length) {
    if (sortedNums[secondIndex] - sortedNums[index] === difference) {
      conArray.push(sortedNums[index]);
      conArray.push(sortedNums[secondIndex]);
    }
    secondIndex++;
    index++;
  }
  let filteredArray = Array.from(new Set([...conArray]));
  // splitting for the longest
  let segment = [];
  let collection = [];
  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i + 1] - filteredArray[i] === difference) {
      segment.push(filteredArray[i]);
      segment.push(filteredArray[i + 1]);
    } else {
      collection.push(segment);
      segment = [];
    }
  }
  // getting the largest collection from the sets
  for (let i = 0; i < collection.length; i++) {
    let array = Array.from(new Set([...collection[i]]));
    maxLength = Math.max(maxLength, array.length);
  }
  return maxLength === -Infinity ? 1 : maxLength;
};

//console.log(longestConsequtive(
//  [9,1,4,7,3,-1,0,5,8,-1,6]))

// product of self

const findDuplicate = (nums) => {
  let hash = {};
  for (let index in nums) {
    hash[nums[index]] ? hash[nums[index]]++ : (hash[nums[index]] = 1);
  }
  for (const [key, value] of Object.entries(hash)) {
    if (value >= 2) {
      return parseInt(key);
    }
  }
};

//console.log(findDuplicate([2,2,2,2,2]))

const singleNumber = (nums) => {
  console.log(nums);
  let array = [];
  let hash = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]]) {
      hash[nums[i]]++;
    } else {
      hash[nums[i]] = 1;
    }
  }
  for (const [key, value] of Object.entries(hash)) {
    if (value === 1) {
      array.push(parseInt(key));
    }
  }
  return array;
};

//console.log(singleNumber([1,2,1,3,2,5]));

// find final triangular sum of the array

const triangleSum = (nums) => {
  if (nums.length === 1) {
    return nums[0];
  }
  let array = [];
  for (let i = 0; i < nums.length; i++) {
    let triangleSumVal = 0;
    if (nums[i + 1] === undefined) {
      break;
    }
    triangleSumVal = (nums[i] + nums[i + 1]) % 10;
    array.push(triangleSumVal);
  }
  if (array.length !== 1) {
    return triangleSum(array);
  } else {
    return array[0];
  }
};

//console.log(triangleSum([1,2,3,4,5]));

// medium water

const maxArea = (height) => {
  console.log(height);
  let index = 0;
  let secondIndex = height.length - 1;
  let maxAmount = 0;
  let waterStore = -Infinity;

  while (index < secondIndex) {
    if (height[index] < height[secondIndex]) {
      maxAmount = height[index] * (secondIndex - index);
      index++;
    } else {
      maxAmount = height[secondIndex] * (secondIndex - index);
      secondIndex--;
    }
    waterStore = Math.max(maxAmount, waterStore);
  }
  return waterStore;
};

//console.log(maxArea([1,8,6,2,5,4,8,3,7]));

// checking the total number of collisions leetcode 2211
const countCollisions = (directions) => {
  // hint code from online... no personal solutions found yet
  const directionsArray = directions.split('');
  let numberOfCollisions = 0;
  console.log(directionsArray);
  // right side
  let start;
  for (start = 0; start < directionsArray.length; start++) {
    if (directionsArray[start] !== 'L') {
      break;
    }
  }
  console.log(start);
  // left side
  let end;
  for (end = directions.length - 1; end >= 0; end--) {
    if (directions[end] !== 'R') {
      break;
    }
  }
  // check collisions
  for (let i = start; i <= end; i++) {
    if (directions[i] !== 'S') {
      numberOfCollisions++;
    }
  }
  return numberOfCollisions;
};

//console.log(countCollisions("LLRSLL"));

// find
const numberOfArithmeticSlices = (nums) => {
  console.log('array', nums);
  // current difference
  let difference = 0;
  let count = 0; // elements with curr difference
  let total = 0; // subarray count;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // prev number
    const prev = nums[i - 1] === undefined ? -Infinity : nums[i - 1];

    // current diff
    const currentDiff = Math.abs(num - prev);

    if (currentDiff === difference) {
      console.log(num, prev);
      count += 1;
      console.log(count);
      total += count - 2;
    } else {
      difference = currentDiff;
      count = 2;
    }
  }
  //console.log('total', total);
};

//console.log(numberOfArithmeticSlices([1,2,3,4,5,7]));

// finding the pivot and creating the array
const pivotArray = (nums, pivot) => {
  console.log(nums, pivot);
  let lower = [];
  let upper = [];
  let same = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < pivot) {
      lower.push(nums[i]);
    } else if (nums[i] > pivot) {
      upper.push(nums[i]);
    } else {
      same.push(nums[i]);
    }
  }
  return [...lower, ...same, ...upper];
};

//console.log(pivotArray([9,12,5,10,14,3,10],10));

// minimum number of steps to make anagrams

const minSteps = (s, t) => {
  let sHash = {};
  let tHash = {};
  let minSteps = 0;
  for (let i = 0; i < s.length; i++) {
    sHash[s[i]] ? sHash[s[i]]++ : (sHash[s[i]] = 1);
  }
  for (let i = 0; i < t.length; i++) {
    tHash[t[i]] ? tHash[t[i]]++ : (tHash[t[i]] = 1);
  }

  // for the letters that are not present and double
  for (let i = 0; i < s.length; i++) {
    if (tHash[s[i]]) {
      tHash[s[i]]--;
    }
  }
  for (let i = 0; i < t.length; i++) {
    if (sHash[t[i]]) {
      sHash[t[i]]--;
    }
  }
  for (let [_, value] of Object.entries(sHash)) {
    if (value !== 0) {
      minSteps += value;
    }
  }
  for (let [_, value] of Object.entries(tHash)) {
    if (value !== 0) {
      minSteps += value;
    }
  }
  return minSteps;
};

//console.log(minSteps("leetcode","coats"));

// to be continued
const spiralOrder = (matrix) => {
  console.log(matrix);
  // spiral parts
  let spiralParts = [];

  // corners
  let rowFirst = 0;
  let lastRow = matrix.length - 1;
  let colFirst = 0;
  let lastCol = matrix[0].length - 1;

  while (rowFirst <= lastRow && colFirst <= lastCol) {
    // first row
    for (let i = colFirst; i <= lastCol; i++) {
      spiralParts.push(matrix[rowFirst][i]);
    }
    rowFirst++;
    // first col
    for (let i = rowFirst; i <= lastRow; i++) {
      console.log(rowFirst);
      spiralParts.push(matrix[i][lastCol]);
    }
    lastCol--;
    for (let i = lastCol; i >= colFirst; i--) {
      spiralParts.push(matrix[lastRow][i]);
    }
    lastRow--;
    for (let i = lastRow; i >= rowFirst; i--) {
      spiralParts.push(matrix[i][colFirst]);
    }
    colFirst++;
  }

  return spiralParts;
};

//console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]));

// 0 - red, 1 - white, 2 - blue

const sortColors = (nums) => {
  let hash = {};
  let finalStack = [];
  for (let index in nums) {
    hash[nums[index]] ? hash[nums[index]]++ : (hash[nums[index]] = 1);
  }
  const fillArray = (key, value) => {
    let counter = 0;
    while (counter !== value) {
      finalStack.push(parseInt(key));
      counter++;
    }
  };
  for (const [key, value] of Object.entries(hash)) {
    fillArray(key, value);
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = finalStack[i];
  }
  return nums;
};

//console.log(sortColors([2,0,2,1,1,0]));

const groupAnagrams = (strs) => {
  let groups = [];
  let wordMap = new Map();

  for (let i = 0; i < strs.length; i++) {
    let word = strs[i].split('').sort().join('');
    // remember the map has key and value pairs and a map cannot contain duplicate keys
    if (!wordMap.has(word)) {
      wordMap.set(word, [strs[i]]);
    } else {
      wordMap.get(word).push(strs[i]);
    }
  }
  // iterating through map in js to find the elements
  wordMap.forEach((key, value) => {
    groups.push(key);
  });

  return groups;
};
//console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))

// find an array of duplicates
const findDuplicates = (nums) => {
  let array = nums.sort((a, b) => a - b);
  let finalNums = [];
  let hash = {};
  for (let index in nums) {
    if (hash[nums[index]]) {
      hash[nums[index]]++;
    } else {
      hash[nums[index]] = 1;
    }
  }
  for (const [key, value] of Object.entries(hash)) {
    if (value === 2) {
      finalNums.push(parseInt(key));
    }
  }
  return finalNums;
};

//console.log(findDuplicates([4,3,2,7,8,2,3,1]))

//console.log(findSubsequences([4,6,7,7]));

// returning the longest subarray mountain

// important of two pass solutions
const longestMountain = (arr) => {
  // edge case
  if (arr.length < 3) {
    return 0;
  }
  // variables
  let maxLen = 0;
  let index = 0;
  let pointy = false;
  let floor = false;
  while (index < arr.length) {
    let count = 1; // starting from 1 cuz of two number comparison
    // checking for increasing peak starting point
    if (arr[index] < arr[index + 1]) {
      // mountain increase check
      while (index < arr.length - 1 && arr[index] < arr[index + 1]) {
        index++;
        count++;
        pointy = true;
      }
      //mountain drop check
      while (index < arr.length - 1 && arr[index] > arr[index + 1]) {
        index++;
        count++;
        floor = true;
      }
      count > 2 && pointy && floor
        ? (maxLen = Math.max(maxLen, count))
        : undefined;
      pointy = false;
      floor = false;
    } else {
      index++; // iteration for skipping the initial drops till we find the first mountain
      // index from the else statement cuz we want to increment till we find next peak
    }
  }
  return maxLen;
};
//console.log(longestMountain(
//[875,884,239,731,723,685]));

// stone game

const stoneGame = (piles) => {
  let newPiles = piles.sort((a, b) => a - b);
  let playerCheck = true;
  // players
  let aliceSum = 0;
  let bobSum = 0;
  let aliceTurns = newPiles.length / 2;
  let bobTurns = newPiles.length / 2;

  for (let i = newPiles.length - 1; i >= 0; i--) {
    if (playerCheck && aliceTurns !== 0) {
      aliceSum += newPiles[i];
      aliceTurns--;
    }
    if (playerCheck === false && bobTurns !== 0) {
      bobSum += newPiles[i];
      bobTurns--;
    }
    playerCheck = !playerCheck;
  }
  if (aliceSum > bobSum) {
    return true;
  } else {
    return false;
  }
};

//console.log(stoneGame([5,3,4,5]));

// number of subarrays

const numberOfSubarrays = (nums, k) => {
  let newArray = new Array(nums.length).fill('');
  let count = 0;
  let subArrayCount = 0;

  for (let i = 0; i < newArray.length; i++) {
    nums[i] % 2 === 0 ? (newArray[i] = 0) : (newArray[i] = 1);
  }
  // looking for subarrays with atleast k using two pointer approach
  let secondIndex = 0;
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] === 1) {
      k--;
      count = 0;
    }
    while (k === 0) {
      k += newArray[secondIndex];
      secondIndex++;
      count++;
    }
    subArrayCount += count;
  }
  return subArrayCount;
};

//console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,1,2], 2));

const numRescueBoats = (people, limit) => {
  let sortedPeople = people.sort((a, b) => b - a);
  let boatCounter = 0;
  // two prong approach from both ends
  let index = 0;
  let secondIndex = sortedPeople.length;
  while (index < secondIndex) {
    if (sortedPeople[index] === limit) {
      boatCounter++;
      index++;
    } else {
      if (sortedPeople[index] < limit) {
        const weightCheck = parseInt(
          sortedPeople[index] + sortedPeople[secondIndex - 1]
        );
        if (weightCheck === limit || weightCheck < limit) {
          boatCounter++;
          index++;
          secondIndex--;
        } else {
          boatCounter++;
          index++;
        }
      }
    }
  }
  return boatCounter;
};

//console.log(numRescueBoats(
//  [3,2,2,1]
//, 3))

const numTeams = (rating) => {
  let counter = 0;
  // brute force approach
  for (let i = 0; i < rating.length; i++) {
    for (let j = i; j < rating.length; j++) {
      for (let k = j; k < rating.length; k++) {
        if (rating[i] > rating[j] && rating[j] > rating[k]) {
          counter++;
        }
        if (rating[i] < rating[j] && rating[j] < rating[k]) {
          counter++;
        }
      }
    }
  }
  return counter;
};

//console.log(numTeams([2,5,3,4,1]));

// first approach nested
var zeroFilledSubarray = function (nums) {
  let result = 0;
  let index = 0;
  let len = nums.length;
  let zeroCheck = false;
  let count = 0;
  let array = [];

  // scanning for zero subarrays;
  while (index < len) {
    // using two pass system for iteration
    if (nums[index] === 0) {
      let tempArray = [];
      while (index < len && nums[index] === 0) {
        index++;
        count++;
        tempArray.push(count);
        zeroCheck = true;
      }
      array.push(tempArray);
      tempArray = [];
      count = 0;
      zeroCheck = false;
    } else {
      index++;
    }
  }
  for (let i = 0; i < array.length; i++) {
    const sum = array[i].reduce((a, b) => a + b);
    result += sum;
  }
  return result;
};

// second approach single O(n);
const zeroFilledSubarrays = (nums) => {
  let result = 0;
  let index = 0;
  let len = nums.length;

  // scanning for zero subarrays;
  while (index < len) {
    // using single pass
    if (nums[index] === 0) {
      let tempIndex = index;
      while (index < len && nums[tempIndex] === 0) {
        result += tempIndex - index + 1;
        tempIndex++;
      }
      index = tempIndex;
    } else {
      index++;
    }
  }
  return result;
};

//console.log(zeroFilledSubarrays([0,0,0,2,0,0]));

// not done yet
const reorganizingString = (s) => {
  console.log(s);
  let sHash = {};
  let newArray = new Array(s.length).fill('');
  console.log(newArray);

  for (let i = 0; i < s.length; i++) {
    if (sHash[s[i]]) {
      sHash[s[i]]++;
    } else {
      sHash[s[i]] = 1;
    }
  }
  console.log(sHash);

  for (const [key, value] of Object.entries(sHash)) {
    console.log(value);
  }
};

//console.log(reorganizingString(
//"aab"))

const lengthOfLIS = (nums) => {
  console.log(nums);
  // using nested approach
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return 1;
  }
  if (nums.every((element) => element === nums[0])) {
    return 1;
  }
  let lenArray = [];

  for (let i = 0; i < nums.length; i++) {
    let startingPosiion = nums[i];
    let array = [startingPosiion];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > startingPosiion) {
        array.push(nums[j]);
      } else {
        continue;
      }
    }
    lenArray.push(array);
  }
  let maxLen = -Infinity;
  for (let i = 0; i < lenArray.length; i++) {
    maxLen = Math.max(maxLen, lenArray[i].length);
  }
  let array;
  for (let index in lenArray) {
    if (lenArray[index].length === maxLen) {
      array = lenArray[index];
    }
  }
  // extracting the largest subsequence
  if (array.length === 1) {
    return 1;
  }

  for (let i = 0; i < array.length; i++) {}
};

//console.log(lengthOfLIS(

//  [1,3,6,7,9,4,10,5,6]))

// max distance to closest person;
const maxDistToClosest = (seats) => {
  let maxDistance = 0;
  let closeLeft = 0;
  let closeRight = 0;
  for (let i = 0; i < seats.length; i++) {
    if (seats[i] === 0) {
      const leftSide = seats.slice(0, i);
      const rigthSide = seats.slice(i + 1, seats.length + 1);
      // check left
      for (let j = leftSide.length - 1; j >= 0; j--) {
        if (leftSide[j] === 0) {
          closeLeft++;
        } else {
          closeLeft++;
          break;
        }
      }
      // check rigth
      for (let k = 0; k < rigthSide.length; k++) {
        if (rigthSide[k] === 0) {
          closeRight++;
        } else {
          closeRight++;
          break;
        }
      }
      if (closeRight === 0) {
        maxDistance = Math.max(maxDistance, closeLeft);
      }
      if (closeLeft === 0) {
        maxDistance = Math.max(maxDistance, closeRight);
      }

      if (closeLeft > closeRight) {
        maxDistance = Math.max(maxDistance, closeRight);
      } else {
        maxDistance = Math.max(maxDistance, closeLeft);
      }
    }
    closeLeft = 0;
    closeRight = 0;
  }
  return maxDistance;
};

//console.log(maxDistToClosest(
//  [0,1]));

// find the longest word that can be formed

const findLongestWord = (s, dictionary) => {
  // egde case for single letters
  if (dictionary.every((element) => element.length === 1)) {
    dictionary.sort();
    return dictionary[0];
  }
  // check subsequence
  const checkSubsequence = (word, string) => {
    if (word.length > s.length) return false;
    let position = 0;
    for (let i = 0; i < word.length; i++) {
      position = string.indexOf(word[i], position); // checking whether position is present or not
      if (position === -1) {
        // if any of the index is not present;
        return false;
      }
      position += 1; // checking from the next position
    }
    return true;
  };
  let answerWord = '';
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    if (checkSubsequence(word, s)) {
      // checking for substring .. if it is true then it activates check
      // check length
      if (word.length > answerWord.length) {
        answerWord = word;
      } else if (word.length === answerWord.length) {
        const compareResult = word.localeCompare(answerWord);
        if (compareResult < 0) answerWord = word;
      }
    }
  }
  return answerWord;
};
//console.log(findLongestWord("abpcplea",
//["ale","apple","monkey","plea"]));

// finding the longest word in a dictionary

const longestWord = (words) => {
  let sortedWords = words.sort();
  const getPrefix = (word) => {
    // extract all the prefix
    let prefixArray = [];
    let prefix = '';
    for (let i = 0; i < word.length; i++) {
      if (i !== word.length - 1) {
        prefix += word[i];
        prefixArray.push(prefix);
      }
    }
    return prefixArray;
  };
  let resultWord = '';
  for (let i = 0; i < sortedWords.length; i++) {
    const word = sortedWords[i];
    let prefixSet = getPrefix(word);

    // checking the prefix set
    if (prefixSet.every((singleSet) => sortedWords.includes(singleSet))) {
      if (word.length > resultWord.length) {
        resultWord = word;
      } else if (word.length === resultWord.length) {
        const compare = word.localeCompare(resultWord);
        if (compare < 0) {
          resultWord = word;
        }
      }
    }
  }

  return resultWord;
};

//console.log(longestWord(["a","banana","app","appl","ap","apply","apple"]));

const findMaxLength = (nums) => {
  var hash = { 0: -1 };
  var count = 0;
  var max = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === 0) count--;
    else count++;

    if (hash[count] != null) {
      max = Math.max(max, i - hash[count]);
    } else {
      hash[count] = i;
    }
  }
  return max;
};

//console.log(findMaxLength([0,1,0,1,0]))

// people indexes in order to find common subsets of people working in various companies
const peopleIndexes = (favoriteCompanies) => {
  console.log(favoriteCompanies);
  let indexHash = [];
  let finalIndexArray = [];
  for (let index in favoriteCompanies) {
    indexHash.push(new Set(favoriteCompanies[index]));
  }
  // checking hashSet presences
  const checkThisShitSet = (primarySet, checkSet) => {
    if (primarySet.size > checkSet.size) {
      console.log(checkSet);
      const checkSetArray = Array.from(checkSet);
      if (checkSetArray.every((checkEl) => primarySet.has(checkEl))) {
        return 1;
      }
    }
  };
  // nested approach
  for (let i = 0; i < indexHash.length; i++) {
    let flag = 1;
    for (let j = 0; j < indexHash.length; j++) {
      if (i !== j) {
        if (checkThisShitSet(indexHash[j], indexHash[i]) === 1) {
          // if it does contain then it breaks and continues with the next set relations
          flag = 0;
          break;
        }
      }
    }
    flag === 1 && finalIndexArray.push(i);
  }

  return finalIndexArray;
};

//console.log(peopleIndexes([["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]));

// returning the longest len of the substring containing same letters after the changes made in k times
const characterReplacement = (s, k) => {
  console.log(s, k);
  let left = 0;
  let right = 0;
  let maxCharCount = 0;
  const visited = {};

  while (right < s.length) {
    const char = s[right];
    visited[char] = visited[char] ? (visited[char] += 1) : (visited[char] = 1);
    if (visited[char] > maxCharCount) {
      maxCharCount = visited[char];
    }
    const rightLeft = right - left + 1;
    console.log(visited, maxCharCount, rightLeft);
    if (rightLeft - maxCharCount > k) {
      left++;
      visited[s[left]]--;
    }
    right++;
  }

  return right - left;
};

//console.log(characterReplacement("ABABA", 2));

// asteroid collision

const asteroidCollision = (asteroids) => {
  const astroStack = [];
  for (let i = 0; i < asteroids.length; i++) {
    // our asteroid
    let asteroid = asteroids[i];
    // check collision
    let checkCollision = false;
    // check collision
    while (astroStack[astroStack.length - 1] > 0 && asteroid < 0) {
      checkCollision = true;
      let absRoid = Math.abs(asteroid);
      let absStack = Math.abs(astroStack[astroStack.length - 1]);
      // checks
      if (absRoid === absStack) {
        astroStack.pop();
        break;
      } else if (absStack < absRoid) {
        astroStack.pop();
        checkCollision = false;
        // note if it is the last remaining element then gets out
      } else if (absStack > absRoid) {
        // we continue cuz stack has the bigger balls
        break;
      }
    }
    // no collision then keep adding
    !checkCollision && astroStack.push(asteroid);
  }
  return astroStack;
};

//console.log(asteroidCollision([10,2,-5]))

// key is to find the next greatest elements but in a circular fashion if there is none present
const nextGreaterElements = (nums) => {
  const stack = new Array(nums.length).fill(-1);
  const len = nums.length;
  let index = 0;
  let recircleState = false;

  // checking for the next greates element
  while (index < len) {
    // main arrays to traverse through for next biggest
    const currentElement = nums[index];
    const prevElements = nums.slice(0, index + 1);
    const nextElements =
      nums.slice(index + 1, nums.length).length === 0
        ? [currentElement]
        : nums.slice(index + 1, nums.length);

    // checking the first set of elements in order to check the first availability
    if (!recircleState) {
      for (let i = 0; i < nextElements.length; i++) {
        if (nextElements[i] > currentElement) {
          stack[index] = nextElements[i];
          break;
        }
        if (i === nextElements.length - 1) {
          recircleState = true;
        }
      }
    }
    if (recircleState) {
      for (let i = 0; i < prevElements.length; i++) {
        if (prevElements[i] > currentElement) {
          stack[index] = prevElements[i];
          recircleState = false;
          break;
        }
        if (i === prevElements.length - 1) {
          recircleState = false;
        }
      }
    }

    index++;
  }
  return stack;
};
//console.log(nextGreaterElements([3,1,0,1]));

// expected answer: [2,3,4,-1,4]
// the last number three does not have a next greater number but in a circular pattern the greatest comes back to 4
// if cannot locate the next greatest element then go in a circular pattern once more

const maxProduct = (words) => {
  let maxLength = 0;
  const checkWord = (mainWord, checkWord) => {
    let mainWordSet = new Set([...mainWord]);
    let checkWordArray = checkWord.split('');
    if (checkWordArray.every((letter) => !mainWordSet.has(letter))) {
      return true;
    }
  };
  for (let i = 0; i < words.length; i++) {
    let mainWord = words[i];
    for (let j = i + 1; j < words.length; j++) {
      if (checkWord(mainWord, words[j])) {
        maxLength = Math.max(mainWord.length * words[j].length, maxLength);
      }
    }
  }
  return maxLength;
};

//console.log(maxProduct(["vfa","xtlz","efvep","qax","xttqeqhdzda","dotpkwl","vzexpeg","lnwcc","tz","oddqwzk","qpo","wa","gahbx","dxmffnv","pwcawa","gp","bmfomiyep","pqlbfol","yvkxl","mewwmixa","adbqqe","ihdeoawnpo","sreiw","ohppahwicoq","wgw","zrjow","qwqebael","rlkrx","njraonrxx","cmkdzas","ctcrryvpyc","kcsbd","uvmjcmelngg","rznp","hezmqrsdoe","doxsmfh","sxbpdfio","bg","fwjgmgjez","pskvtosefsx","gcj","xv","rcoabdx","zsgag","uohvz","dsmffq","nbbtm","ercccjym","iagqmyauqun","czwexke","unig","iyczgxmakc","qgnjfqai","qbatxtev","qpp","jp","bg","ek","jbele","oepzeekydf","xfncmi","dyr","htnbkxtaxo","hvglb","iao","sgqw","vwnmvcjtu","tc","ylyn","wzibe","ywzemkxnds","bapdoxed","fuosanrps","iqnidqfprif","ibeweskp","vdoofj","ybnwnqtyx","jbzuipwr","vjtfp","ihgunpppa","hohpqb","upjtrljrg","pgh","av","cglwgcpac","tznomaqzd","kxigufgqhqp","wt","iyahn","vnmjndkd","dde","uztuzssitar","wvd","svr","cy","gtvh","hefltcdldzj","itrd","egszngv","pxr"]));

// setting the matrix columns and rows into zero
const setZeroes = (matrix) => {
  let colSet = new Set();
  let rowSet = new Set();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        colSet.add(j);
        rowSet.add(i);
      }
    }
  }
  // col and row set
  let rowLen = matrix[0].length;
  let colLen = matrix.length;
  for (let col of colSet) {
    for (let j = 0; j < colLen; j++) {
      matrix[j][col] = 0;
    }
  }
  for (let row of rowSet) {
    for (let i = 0; i < rowLen; i++) {
      matrix[row][i] = 0;
    }
  }
  return matrix;
};

//console.log(setZeroes([[1,1,1],[1,0,1],[1,1,1]]));

// note: remember left max bound can be the left amount.. and the rightmost amount cannot exceed
// the right most bound... therefore using the sliding technique and shifting the starting index when it hits the highest right bound
const numSubarrayBoundedMax = (nums, left, right) => {
  console.log(nums, left, right);
  let end = -1;
  let start = -1;
  // initialising negative to including additional el for subarray
  let finalLength = 0;
  let index = 0;
  while (index < nums.length) {
    // once it hits the max on the right side... reset the pointers to the index of the external range element
    if (nums[index] > right) {
      end = index;
      start = index;
    } else {
      if (nums[index] >= left && nums[index] <= right) {
        end = index;
      }
    }
    console.log(end, start);
    finalLength += Math.abs(end - start);
    index++;
  }
  return finalLength;
};
//console.log(numSubarrayBoundedMax(
//  [2,3,4,3], 2, 3));

// return total subarrays whose subarrays equal to k

const subArraySum = (nums, k) => {
  let map = {};

  let output = 0;
  let sum = 0;

  map[0] = 1;

  for (const num of nums) {
    sum += num;

    const prefix = sum - k;

    if (map[prefix]) {
      output += map[prefix];
    }
    if (!map[sum]) {
      map[sum] = 1;
    } else {
      map[sum]++;
    }
  }

  return output;
};

//console.log(subArraySum(
//  [1,2,3], 3));

const maxProductSubarray = (nums) => {
  console.log(nums);
  // trick is to get both the maximum and minimum for the pairs of products of the number to avoid negative number issue.
  let result = Math.max(...nums);
  let currentMin = 1;
  let currentMax = 1;
  let temp = 1;
  for (let num of nums) {
    if (num === 0) {
      currentMax = currentMin = 1;
      continue;
    } else {
      temp = currentMax * num;
      currentMax = Math.max(temp, num * currentMin, num);
      currentMin = Math.min(temp, num * currentMin, num);
      result = Math.max(currentMax, result);
    }
  }
  return result;
};

//console.log(maxProductSubarray([2,3,4,-2,0,4,40]));

// getting the min length

const minSubarrayLen = (target, nums) => {
  let sum = 0;
  let start = 0;
  let minLen = Infinity;
  // initial check
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    while (sum >= target) {
      sum -= nums[start];
      let windowReduce = i + 1 - start;
      start++;
      minLen = Math.min(minLen, windowReduce);
    }
  }
  return minLen === Infinity ? 0 : minLen;
};

//console.log(minSubarrayLen(
//   15,
//[5,1,3,5,10,7,4,9,2,8]));

// longest ones after flipping for K zeroes

const longestOnes = (nums, k) => {
  //console.log(nums, k);
  let maxLen = -Infinity;
  let start = 0;
  let zeroCount = 0;
  for (let end = 0; end < nums.length; end++) {
    // counting till reaching K
    if (nums[end] === 0) {
      zeroCount++;
    }
    // checking while sum is bigger than k
    while (zeroCount > k) {
      // reduces the zero till it hits same level of zero count as K
      if (nums[start] === 0) {
        zeroCount--;
      }
      // increase the start index to start from the beginning of the zero indexes in the array
      start++;
    }
    let differenceLen = end + 1 - start;
    maxLen = Math.max(differenceLen, maxLen);
  }
  return maxLen;
};
//console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2));

const numSubarrayProductLessThanK = (nums, k) => {
  console.log(nums, k);
  let product = 1;
  let start = 0;
  let count = 0;
  // using sliding window technique
  for (let end = 0; end < nums.length; end++) {
    product = product * nums[end];

    while (product >= k) {
      // dividing subarray in order to reduce the window and increase the count;
      product = product / nums[start];
      start++;
    }
    let subLength = end - start + 1;
    count = count + subLength;
  }
  return count < 0 ? 0 : count;
};

//console.log(numSubarrayProductLessThanK([10,5,2,6], 100));

const longestSubarray = (nums) => {
  console.log(nums);
  let countMaxOnes = 0;
  if (nums.every((el) => el === 0)) {
    return 0;
  }
  /*
    // for(let i = 0; i < nums.length; i++){
    //     if(nums[i] === 0){
    //         const leftSide = nums.slice(0, i).length === 0 ? [0] : nums.slice(0, i);
    //         const rightSide = nums.slice(i + 1, nums.length + 1);
    //         let rightOnes = [];
    //         let leftOnes = [];
            
    //         // left side filter
    //         for(let j = leftSide.length - 1; j >= 0; j-- ){
    //             if(leftSide[j] === 1){
    //                 leftOnes.push(1);
    //             }else{
    //                 break;
    //             }
    //         }
    //         // right side filter
    //         for(let k = 0; k < rightSide.length; k++){
    //             if(rightSide[k] === 1){
    //                 rightOnes.push(1);
    //             }else{
    //                 break;
    //             }
    //         }
    //         countMaxOnes = Math.max(countMaxOnes, rightOnes.length + leftOnes.length)
    //     }
    // }*/
  // sliding window approach O(N);
  let start = 0;
  let zeroCount = 0;
  let maxZeroCount = 1;
  for (let end = 0; end < nums.length; end++) {
    if (nums[end] === 0) {
      zeroCount++;
    }
    while (zeroCount > maxZeroCount) {
      if (nums[start] === 0) {
        zeroCount--;
      }
      start++;
    }
    countMaxOnes = Math.max(countMaxOnes, end - start);
  }
  return countMaxOnes;
};

//console.log(longestSubarray([1,1,1,0,1,1,0,1]));

// need to find maxOccurence of substrings
const maxFreq = (s, maxLetters, minSize, maxSize) => {
  let stringMap = new Map();
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      // limiting the substring options
      if (Math.abs(j - i) >= minSize - 1 && Math.abs(j - i) <= maxSize - 1) {
        const substring = s.slice(i, j + 1);
        if (stringMap.has(substring)) {
          stringMap.set(substring, stringMap.get(substring) + 1);
        } else {
          stringMap.set(substring, 1);
        }
      } else {
        continue;
      }
    }
  }
  // checking for unique letters for collective occurences
  const checkRepeat = (word) => {
    let hash = {};
    for (let i = 0; i < word.length; i++) {
      hash[word[i]] ? hash[word[i]]++ : (hash[word[i]] = 1);
    }
    let keysLen = Object.keys(hash);
    if (keysLen.length <= maxLetters) {
      return true;
    }
    return false;
  };
  // filtering the map;
  let count = 0;
  for (let [key, value] of stringMap) {
    if (checkRepeat(key)) {
      if (count < value) {
        count = value;
      }
    }
  }
  return count;
};
//console.log(maxFreq("fjkhekdgbiegfjhdklhglcdfdemmamgihhcflkibgalfbghelbaijbemdhjaimbmmhlkfmgefafjfbmjcabghjffagefdkkcdkhkiklhafdfbcfhblljledcdbmcjiggibijbjeaemamfhgbkmgfmbhmgbeclikcajghdlmhfblbmlbbmebkdldeadekebjjljlehkjfaehjhimhjhgjefbgcigkbccfhehehlaaemghjajibdghillfhchjlelmmgahheigmlgiakfkikmbjjidmiahhmaagkegfljjedclbhbjclaieedcalhdfamgagciekhikbmhakjjbjccalbhedcjidmkkdgchmbikhcjaldellhmagblagbhmmkflcgclcdfkijglbmeimlmdjbjjijiejkbhlgjhfklfdmhgglmflbcajblibldlfakdkgjdjmiafbkfifahjbdblckdhmhjdmeahchffkelikfehldmdhhgackdlhdjgkackckfedkahjelajheaaemaekkhckhadaeadeekafaclbjjhdfdbieghmagmgfemcfjjdadejefelahejijlmgdegijihjfceciaagcimbfbmlccigdaealbecfagegkafbadfchekfjcfcigllfceheeihiaaemcgfmbeidcdkmbgckmkdgembafeheeeghakicbfdkkiificiafffjckedceblmhiekcdleihkahelhhbddidgibbifjjhcegkacjmdelkiaefdglfajhfbfemcbcgkaiebjleafblclidaagadcdjadkfdahgaldjkkmadjhbgmmbaelajeegbgghfgllbfdhdjcdmbciklliceemgcfimfklghlfikigcgachkjeaejeaihlmhbjcejlkhckimieggallbcibmdjibijhfceekamcmcmhicajlhkgaglgbeaebgfgggdemilbjcehdcmjkgfjjli", 6, 20, 26));

const validStackSequences = (pushed, popped) => {
  const stack = [];
  let pushIndex = 0;
  let popIndex = 0;
  while (pushIndex < pushed.length || popIndex < popped.length) {
    if (stack[stack.length - 1] === popped[popIndex]) {
      stack.pop();
      popIndex++;
    } else {
      if (pushIndex > pushed.length - 1) {
        return false;
      }
      stack.push(pushed[pushIndex]);
      pushIndex++;
    }
  }
  if (stack.length === 0 || undefined) {
    return true;
  } else {
    return false;
  }
};

//console.log(validStackSequences([1,2,3,4,5], [4,5,3,2,1]));

const minimumTotal = (triangle) => {
  const newTriangle = [];
  // fill new triangle
  for (let i = 0; i < triangle.length; i++) {
    let singleRow = triangle[i];
    let newTriangleRow = new Array(singleRow.length).fill(0);
    newTriangle.push(newTriangleRow);
  }
  // adding the initial starting point
  newTriangle[0] = triangle[0]; // adding the first row
  // main loop
  for (let row = 1; row < triangle.length; row++) {
    let singleRowLen = triangle[row].length;
    for (let col = 0; col < singleRowLen; col++) {
      let lastColIndex = triangle[row].length - 1;
      // first element in every row
      if (col === 0) {
        newTriangle[row][0] = newTriangle[row - 1][0] + triangle[row][0];
      } else if (col === lastColIndex) {
        if (col === 1) {
          newTriangle[row][lastColIndex] =
            newTriangle[row - 1][0] + triangle[row][lastColIndex];
        } else {
          let prevRowEndValue = newTriangle[row - 1].length - 1;
          newTriangle[row][lastColIndex] =
            newTriangle[row - 1][prevRowEndValue] + triangle[row][lastColIndex];
        }
      } else {
        // final case for the center elements
        let valOne = triangle[row][col] + newTriangle[row - 1][col];
        let valTwo = triangle[row][col] + newTriangle[row - 1][col - 1];
        let minVal = Math.min(valOne, valTwo);
        newTriangle[row][col] = minVal;
      }
    }
  }
  // extracting the last row for minval in order to get the lowest path sum;
  return Math.min(...newTriangle[newTriangle.length - 1]);
};
//console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]));

// calculating the number of islands

const numIslands = (grid) => {
  const island = '1';
  const water = '0';
  let countIslands = 0;
  // function to convert islands into body of water
  const islandConversion = (row, col, grid) => {
    if (
      grid[row] === undefined ||
      grid[row][col] === undefined ||
      grid[row][col] === water
    ) {
      return;
    }
    grid[row][col] = water;
    // recursive calls takes care of the connected island bodies and converts em into water
    islandConversion(row + 1, col, grid);
    islandConversion(row, col + 1, grid);
    islandConversion(row, col - 1, grid);
    islandConversion(row - 1, col, grid);
  };
  // note island is surrounded by water both vertically and horizontally
  for (let row = 0; row < grid.length; row++) {
    const rowLen = grid[row].length;
    for (let col = 0; col < rowLen; col++) {
      if (grid[row][col] === island) {
        countIslands++;
        islandConversion(row, col, grid);
      }
    }
  }
  return countIslands;
};

// console.log(numIslands([
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
//   ]));

// const maxAreaOfIslands = (grid)=>{
//     console.log(grid);

//     let maxArea = 0;

//     const checkIsland = (row, col, grid)=>{

//     }

//     for(let i = 0; i < grid.length; i++){
//         let rowLen = grid[row].length;
//         for(let j = 0; j < rowLen; j++){

//         }
//     }

// }

//console.log(maxAreaOfIslands([[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]));

const isStraightHand = (hand, groupSize) => {
  hand.sort((a, b) => a - b);
  if (hand.length % groupSize) {
    return false;
  }
  let hash = {};
  for (let index = 0; index < hand.length; index++) {
    hash[hand[index]] ? hash[hand[index]]++ : (hash[hand[index]] = 1);
  }
  let index = 0;
  while (index < hand.length) {
    if (hash[hand[index]] > 0) {
      for (let gIndex = 0; gIndex < groupSize; gIndex++) {
        const valueIncrements = hand[index] + gIndex;
        if (hash[valueIncrements]) {
          hash[valueIncrements]--;
        } else {
          return false;
        }
        if (hash[valueIncrements] === 0) delete hash[valueIncrements];
      }
    }
    index++;
  }
  return true;
};
//console.log(isStraightHand([9,13,15,23,22,25,4,4,29,15,8,23,12,19,24,17,18,11,22,24,17,17,10,23,21,18,14,18,7,6,3,6,19,11,16,11,12,13,8,26,17,20,13,19,22,21,27,9,20,15,20,27,8,13,25,23,22,15,9,14,20,10,6,5,14,12,7,16,21,18,21,24,23,10,21,16,18,16,18,5,20,19,20,10,14,26,2,9,19,12,28,17,5,7,25,22,16,17,21,11],
//  10));

//console.log(isStraightHand([1,2,3,6,2,3,4,7,8], 3))

//console.log(isStraightHand([1,2,3,6,2,3,4,7,8],
//  3));

// longest increasing subsequence
const findNumberOfLIS = (nums) => {
  const countOfSubsequence = new Array(nums.length).fill(1);
  const lenOfSubsequence = new Array(nums.length).fill(1);
  // forming the subsequence i will get the els that come after it with gaps
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {}
  }

  //console.log('count', countOfSubsequence, 'length', lenOfSubsequence);
};

// console.log(findNumberOfLIS([1,3,5,4,7]));

const lengthOfLISRetry = (nums) => {
  const lengthOfSubsequence = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] >= nums[i]) {
        continue;
      }
      if (nums[i] > nums[j]) {
        // interchanging the subsequence vals before the primary element
        lengthOfSubsequence[i] = Math.max(
          lengthOfSubsequence[i],
          lengthOfSubsequence[j] + 1
        );
      }
    }
  }
  return Math.max(...lengthOfSubsequence);
};

//console.log(lengthOfLISRetry([0,1,0,3,2,3]));

const partitionLabels = (s) => {
  let occurenceHash = {};
  // getting the last index of the occurence of the letter
  let end = 0;
  let sizeOfPartitiion = 0;
  let indices = [];
  // adding the last indexes of the letters
  for (let i = 0; i < s.length; i++) {
    if (occurenceHash[s[i]]) {
      occurenceHash[s[i]] = i;
    } else {
      occurenceHash[s[i]] = i;
    }
  }
  // if the size of each partition is end + 1 then inject and record the partition length
  for (let i = 0; i < s.length; i++) {
    if (occurenceHash[s[i]] || occurenceHash[s[i]] === 0) {
      sizeOfPartitiion++;
      end = Math.max(occurenceHash[s[i]], end);
    }
    if (sizeOfPartitiion === end + 1) {
      indices.push(sizeOfPartitiion);
    }
  }
  // deducting the extra partition indexes
  let finalIndicex = new Array(indices.length).fill(0);
  for (let i = 0; i < indices.length; i++) {
    if (i === 0) {
      finalIndicex[i] = indices[i];
    } else {
      finalIndicex[i] = indices[i] - indices[i - 1];
    }
  }
  return finalIndicex;
};

//console.log(partitionLabels("ababcbacadefegdehijhklij"))

// partition string;
const partitionString = (s) => {
  let map = new Set();
  let count = 1;
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map = new Set();
      count++;
    }
    map.add(s[i]);
  }
  return count;
};

//console.log(partitionString("abacaba"));

// length of longest number of subsequence
const findNumberOfLISRetry = (nums) => {
  if (nums.every((el) => el === nums[0])) {
    return nums.length;
  }
  let subLength = new Array(nums.length).fill(1);
  let repeatCountArray = new Array(nums.length).fill(1);
  // checking for the longest increasing substring
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // skip if case not satisfied
      if (nums[j] >= nums[i]) {
        continue;
      }
      if (nums[i] > nums[j]) {
        // recording the repeat count for similar subsequence value then adding 1
        if (subLength[i] === subLength[j] + 1) {
          repeatCountArray[i] += repeatCountArray[j];
        } else {
          subLength[i] = Math.max(subLength[i], subLength[j] + 1);
          repeatCountArray[i] = repeatCountArray[j];
        }
      }
    }
  }
  let maxSubLenValue = Math.max(...subLength);
  let finalCount = 0;
  for (let index in nums) {
    if (subLength[index] === maxSubLenValue) {
      finalCount += repeatCountArray[index];
    }
  }
  return finalCount;
};
// console.log(findNumberOfLISRetry(
//     [1,2,3,1,2,3,1,2,3]));

// const checkFindLongestSubsequence = (nums)=>{
//     console.log(nums);

//     const dp = new Array(nums.length).fill(1);
//     const cArr = new Array(nums.length).fill(1);
//     let max = 1;

//     for(let i = 1; i < nums.length; i++){
//         // traversing uptill j
//         for(let j = 0; j < i; j++){
//             if(nums[i] > nums[j]){
//                 console.log('main', nums[i], 'second', nums[j])
//                 if (dp[j] + 1 > dp[i]) {
//                     dp[i] =  1 + dp[j];
//                     cArr[i] = cArr[j]
//                 }else if(dp[j] + 1 === dp[i]){
//                     cArr[i] += cArr[j];
//                     console.log(cArr);
//                 }

//             }

//         }

//         max = Math.max(max, dp[i]);
//         console.log(max);
//     }

// }

// //console.log(checkFindLongestSubsequence([1,2,4,3,5,4,7,2]));

// longest non repeating substring with every character being unique
const longestNonRepeatingCharacters = (s) => {
  console.log(s);
  let max = 0;
  let end = 0;
  let start = 0;
  let hash = {};
  while (end < s.length) {
    if (hash[s[end]]) {
      hash[s[end]]++;
    } else {
      hash[s[end]] = 1;
    }
    // checking for repeating characters
    while (hash[s[end]] > 1) {
      // decrement the substring from the left
      let leftChar = s[start];
      hash[leftChar] > 1 ? hash[leftChar]-- : delete hash[leftChar];
      start++;
    }
    max = Math.max(max, end - start + 1);
    end++;
  }
  return max;
};
///console.log(longestNonRepeatingCharacters(
// "tmmzuxt"))

// finding substring and corresponding it with the number of replacements
const longestCharacterReplacement = (s, k) => {
  console.log(s);

  let end = 0;
  let start = 0;
  let visitedHash = {};
  let maxReplacements = k;
  let maxLength = 0;

  while (end < s.length) {
    if (visitedHash[s[end]]) {
      visitedHash[s[end]]++;
    } else {
      visitedHash[s[end]] = 1;
    }
    console.log(visitedHash);
    // get length of the current substring
    let maxLetter = Math.max(...Object.values(visitedHash));
    while (end - start + 1 - maxLetter > maxReplacements) {
      visitedHash[s[start]]--;
      start++;
    }
    console.log('end', end, 'start', start);
    maxLength = Math.max(end - start + 1, maxLength);
    console.log(maxLength);
    end++;
  }

  return maxLength;
};

//console.log(longestCharacterReplacement(
//  "AABABBA", 1))

// find starting index of similar anagrams
const findAnagrams = (s, p) => {
  //console.log(s, p);

  let endIndex = 0;
  let startIndex = 0;
  let anagramLength = p.length;
  let indexRecord = [];
  let pHashMain = {};
  let sHashMain = {};
  for (let index in p) {
    // populating list for p length
    pHashMain[p[index]] ? pHashMain[p[index]]++ : (pHashMain[p[index]] = 1);
    sHashMain[s[index]] ? sHashMain[s[index]]++ : (sHashMain[s[index]] = 1);
  }
  // checking whether the hashmaps are equal or not
  const checkHashEquals = (pHashMain, sHashMain) => {
    const pHashKeys = Object.keys(pHashMain).length;
    const sHashKeys = Object.keys(sHashMain).length;
    if (sHashKeys === pHashKeys) {
      // comparing every key of one object with their corresponding key values
      return Object.keys(pHashMain).every(
        (key) =>
          sHashMain.hasOwnProperty(key) && pHashMain[key] === sHashMain[key]
      );
    }
    return false;
  };
  if (checkHashEquals(pHashMain, sHashMain)) {
    indexRecord.push(0);
  } else {
    indexRecord = [];
  }
  endIndex = anagramLength;
  // using sliding window technique to check every plength string
  while (endIndex < s.length) {
    if (sHashMain[s[endIndex]]) {
      sHashMain[s[endIndex]]++;
    } else {
      sHashMain[s[endIndex]] = 1;
    }
    sHashMain[s[startIndex]]--;
    // delete object if the object key value is equal to 0
    if (sHashMain[s[startIndex]] == 0) {
      delete sHashMain[s[startIndex]];
    }
    startIndex++; // incrementing start to the next element to check hash;
    if (checkHashEquals(pHashMain, sHashMain)) {
      indexRecord.push(startIndex);
    }
    endIndex++;
  }
  return indexRecord;
};

//console.log(findAnagrams(
//  "cbaebabacd",
// "abc"));

const maxVowels = (s, k) => {
  const sArray = s.split('');
  const vowelObject = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  let start = 0;
  let end = 0;
  let maxVowels = 0;
  let tempIndex = 0;
  // setting the range
  while (tempIndex < k) {
    // vowel hashing
    if (sArray[tempIndex] in vowelObject) {
      vowelObject[sArray[tempIndex]]++;
      maxVowels += vowelObject[sArray[tempIndex]];
    }
    tempIndex++;
  }
  // starting from next range
  end = k;
  while (end < sArray.length) {
    if (sArray[end] in vowelObject) {
      vowelObject[sArray[end]]++;
    }
    if (sArray[start] in vowelObject) {
      vowelObject[sArray[start]]--;
    }
    start++;
    const vowelVals = Object.values(vowelObject);
    const totalVowels = vowelVals.reduce((a, b) => a + b);
    maxVowels = Math.max(maxVowels, totalVowels);
    end++;
  }
  return maxVowels;
};

//console.log(maxVowels("abciiidef", 3));

// longest substring with k repeated characters or more
const longestSubstring = (s, k) => {
  console.log(s);
  let mainHash = {};
  for (let index in s) {
    mainHash[s[index]] ? mainHash[s[index]]++ : (mainHash[s[index]] = 1);
  }
  console.log(mainHash);
  let maxLength = 0;
  let start = 0;
  let vals = Object.values(mainHash);
  if (vals.every((val) => val >= k)) {
    return s.length;
  }

  // traversing string;
  for (let i = 0; i < s.length; i++) {
    if (mainHash[s[i]] < k) {
      const slice = s.slice(start, i);
      console.log(slice);
      maxLength = Math.max(slice.length, maxLength);
      start = i + 1;
    }
  }

  return maxLength;
};

//console.log(longestSubstring("ababacb",
//3));

// max number of Ks or Fs in the answer key

const maxConsecutiveAnswers = (answerKey, k) => {
  console.log(answerKey.split(''), k);
  let end = 0;
  let start = 0;
  let maxAnswers = 0;
  let tempCount = 0;
  // True combinations but replacing for F
  while (end < answerKey.length) {
    if (answerKey[end] === 'T') {
      tempCount++;
    }
    // reduce window when count is bigger than k
    while (tempCount > k) {
      if (answerKey[start] === 'T') tempCount--;
      start++;
    }
    maxAnswers = Math.max(end - start + 1, maxAnswers);
    end++;
  }
  end = 0;
  start = 0;
  tempCount = 0;
  while (end < answerKey.length) {
    if (answerKey[end] === 'F') {
      tempCount++;
    }
    // reduce window when count is bigger than k
    while (tempCount > k) {
      if (answerKey[start] === 'F') tempCount--;
      start++;
    }
    maxAnswers = Math.max(end - start + 1, maxAnswers);
    end++;
  }
  return maxAnswers;
};

//console.log(maxConsecutiveAnswers("TTFFFTTF", 2));

// do it later
const findLength = (nums1, nums2) => {
  console.log(nums1, nums2);
};

// console.log(findLength([1,2,3,2,1],[3,2,1,4,7]));

// easy problem
const matrixReshape = (mat, r, c) => {
  //flatten the matrix;
  if (r * c !== mat[0].length * mat.length) return mat;
  let flattenedMatrix = new Array(mat[0].length * mat.length).fill(0);
  let tempIndex = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      flattenedMatrix[tempIndex] = mat[i][j];
      tempIndex++;
    }
  }
  // new matrix construction
  let newMatrix = new Array(r).fill(0);
  // fill columns
  for (let i = 0; i < newMatrix.length; i++) {
    newMatrix[i] = new Array(c).fill(0);
  }
  // filling new matrix
  let index = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      newMatrix[i][j] = flattenedMatrix[index];
      index++;
      // mat cannot be contructed
      if (newMatrix[i][j] === undefined) return mat;
    }
  }
  return newMatrix;
};
//console.log(matrixReshape([[1,2]], 2, 4));

// max frequencey element

const maxFrequence = (nums, k) => {
  nums.sort((a, b) => a - b);
  console.log(nums);
  let end = 0;
  let start = 0;
  let total = 0;
  let maxLen = 0;

  while (end < nums.length) {
    total += nums[end];
    // window control
    while (nums[end] * (end - start + 1) > total + k) {
      total -= nums[start];
      start++;
    }

    maxLen = Math.max(maxLen, end - start + 1);
    end++;
  }
  return maxLen;
};

//console.log(maxFrequence([1,1,1,2,2,4], 2));

const minSubarrayLenAlternate = (nums, target) => {
  let end = 0;
  let start = 0;
  let total = 0;
  let minLen = Infinity;
  while (end < nums.length) {
    total += nums[end];
    while (total >= target) {
      minLen = Math.min(minLen, end - start + 1);
      total -= nums[start];
      start++;
    }
    end++;
  }
  return minLen === Infinity ? 0 : minLen;
};

//console.log(minSubarrayLenAlternate([2,3,1,2,4,3], 7));

const subarraySumAlternate = (nums, k) => {
  let end = 0;
  let hash = {};
  let totalSubs = 0;
  let sum = 0;
  hash[0] = 1;
  while (end < nums.length) {
    sum += nums[end];
    const sumPref = sum - k;
    console.log(sumPref);

    if (hash[sumPref]) {
      totalSubs += hash[sumPref];
    }
    // populate hash
    if (hash[sum]) {
      hash[sum]++;
    } else {
      hash[sum] = 1;
    }

    end++;
  }
  return totalSubs;
};

//console.log(subarraySumAlternate([1,2,3], 3));

const numberOfSubstrings = (s) => {
  let hash = { a: -1, b: -1, c: -1 };
  let end = 0;
  let totalCounter = 0;
  while (end < s.length) {
    if (s[end] in hash) {
      hash[s[end]] = end;
    }
    let vals = Object.values(hash);
    let min = Math.min(...vals);
    if (!vals.some((singleVal) => singleVal < -1)) {
      totalCounter += min + 1;
    }
    end++;
  }
  return totalCounter;
};

//console.log(numberOfSubstrings("abcabc"));

/*

    1) min = 0; total = min + 1 = 1;
    2) min = 1; total += 1 + 1 + 1 = 3;
    3) min = 2; total += 3 + 2 + 1 = 6
    4) min = 3; total += 6 + 3 + 1 = 10;

    main logic

*/

// minimum card pickup
const minimumCardPickup = (cards) => {
  let hash = {};
  let start = 0;
  let end = 0;
  let minLength = Infinity;
  while (end < cards.length) {
    if (hash[cards[end]]) {
      hash[cards[end]]++;
    } else {
      hash[cards[end]] = 1;
    }
    while (hash[cards[end]] > 1) {
      minLength = Math.min(minLength, end - start + 1);
      if (hash[cards[start]]) {
        hash[cards[start]]--;
      }
      start++;
    }
    end++;
  }
  return minLength === Infinity ? -1 : minLength;
};

//console.log(minimumCardPickup([3,4,2,3,4,7]));

const longestBeautifulSubstring = (word) => {
  console.log(word);
  let end = 0;
  let vowelString = 'aeiou';
  let maxLength = 0;
  while (end < word.length) {
    if (word[end] === 'a') {
      let eventualEndIndex = end;
      let check = true;
      for (let i = 0; i < 5; i++) {
        // if the vowel is not equal then breaks loop
        if (word[eventualEndIndex] !== vowelString[i]) {
          check = false;
          break;
        }
        // check through whole string for repeated letters
        while (
          eventualEndIndex < word.length &&
          word[eventualEndIndex] == vowelString[i]
        ) {
          // if the letter is
          eventualEndIndex++;
        }
      }
      if (check) {
        maxLength = Math.max(maxLength, eventualEndIndex - end);
      }
      // jumping end to the next a location
      end = eventualEndIndex - 1;
    }
    end++;
  }
  return maxLength;
};

//console.log(longestBeautifulSubstring("aeiaaioaaaaeiiiiouuuooaauuaeiu"));

// halted
const countVowelsSubstrings = (word) => {
  console.log(word);
  let end = 0;
  let vowelHash = { a: true, i: true, e: true, o: true, u: true };
  let vowelArray = ['a', 'i', 'e', 'o', 'u'];
  let counter = 0;

  while (end < word.length) {
    if (vowelHash[word[end]]) {
      let eventualEnd = end;
      while (eventualEnd < word.length && vowelHash[word[eventualEnd]]) {
        eventualEnd++;
      }
      console.log(end, eventualEnd);
      const vowelSlice = word.slice(end, eventualEnd);
      console.log(vowelSlice);
      let sliceHash = {};
      let sliceEnd = 0;
      let sliceStart = 0;
      while (sliceEnd < vowelSlice.length) {
        sliceHash[vowelSlice[sliceEnd]]
          ? sliceHash[vowelSlice[sliceEnd]]++
          : (sliceHash[vowelSlice[sliceEnd]] = 1);
        while (
          sliceHash['a'] > 0 &&
          sliceHash['i'] > 0 &&
          sliceHash['u'] > 0 &&
          sliceHash['e'] > 0 &&
          sliceHash['o'] > 0
        ) {
          console.log(sliceEnd, sliceStart);
          counter++;
          if (sliceHash[vowelSlice[sliceStart]] > 0) {
            sliceHash[vowelSlice[sliceStart]]--;
          }
          sliceStart++;
        }
        sliceEnd++;
      }
      end = eventualEnd;
    }
    end++;
  }
  console.log(counter);
};

//console.log(countVowelsSubstrings("cuaieuouac"));

// can swap at most two of the characters in order to find the longest repeated character substring
// const maxRepOpt = (text)=>{
//     console.log(text);
//     // edge case for if the letters are only one type then return length
//     if(text.split('').every((letter)=> letter === text[0])){
//         return text.length;
//     };
//     // note u can swipe at most two characters

// }

// console.log(maxRepOpt("aabaabaa"));

const lengthOfLastWord = (s) => {
  const array = s.split(' ');
  // traversing from the back;
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] !== '') {
      return array[i].length;
    }
  }
};

//console.log(lengthOfLastWord("   fly me   to   the moon  "));

const longestMountainRetry = (arr) => {
  let maxCount = 0;
  if (arr.length < 3) return 0;
  let end = 0;
  //using one pass loop to get the answers
  while (end < arr.length) {
    // if bigger then enter
    let count = 1; // since two elements by default
    let up = false;
    let down = false;
    if (arr[end] < arr[end + 1]) {
      // enter the loop when bigger
      up = true;
      while (arr[end] < arr[end + 1]) {
        count++;
        end++;
      }
      while (arr[end] > arr[end + 1]) {
        count++;
        end++;
        down = true;
      }
      if (count > 2 && up && down) {
        maxCount = Math.max(maxCount, count);
      }
    } else {
      end++;
    }
  }
  return maxCount;
};

//console.log(longestMountainRetry([875,884,239,731,723,685]));

// binary array sum with goal
const numSubarraysWithSum = (nums, goal) => {
  console.log(nums);
  let subCounter = 0;

  // two pointer solution
  for (let end = 0; end < nums.length; end++) {
    let total = 0;
    for (let start = end; start < nums.length; start++) {
      // const slice = nums.slice(end, start + 1);
      total += nums[start];
      if (total === goal) {
        subCounter++;
      }
    }
  }

  return subCounter;
};

//console.log(numSubarraysWithSum([1,0,1,0,1], 2));

// longest uncommon subsequence I pre

const findLUSlength = (a, b) => {
  if (a === b) return -1;

  return Math.max(a.length, b.length);
};

//console.log(findLUSlength("aba", "cdc"));

//console.log(findSubarrays([77,95,90,98,8,100,88,96,6,40,86,56,98,96,40,52,30,33,97,72,54,15,33,77,78,8,21,47,99,48]));

const findSubarraysPractise = (nums) => {
  let collection = {};
  let end = 0;
  let start = 0;
  let tempIndex = 0;
  let defLen = 2;
  let sum = 0;
  while (tempIndex < defLen) {
    sum += nums[tempIndex];
    tempIndex++;
  }
  collection[sum] = 1;
  end = defLen;
  // sliding addition
  while (end < nums.length) {
    // substract the sum and add one
    sum = sum - nums[start] + nums[end];
    if (collection[sum]) {
      return true;
    } else {
      collection[sum] = 1;
    }
    start++;
    end++;
  }
  return false;
};

//console.log(findSubarraysPractise([4,2,4]));

// set approach and recording the previous value;
const canPartition = (nums) => {
  let numSet = new Set();
  numSet.add(0); // initial default value;
  let targetVal = nums.reduce((a, b) => a + b) / 2;
  // iterating and storing the sum
  for (let i = nums.length - 1; i >= 0; i--) {
    let numSetCopy = new Set(numSet);
    numSet.forEach((element) => {
      numSetCopy.add(element + nums[i]);
    });
    numSet = numSetCopy;
    if (numSet.has(targetVal)) return true;
  }
  return false;
};

//console.log(canPartition([1,5,11,5]));

const zigzagConversion = (s, numRows) => {
  console.log(s, numRows);
  if (numRows === 1) return s;
  // let finalString = '';
  // formula way
  // for(let i = 0; i < numRows; i++){
  //     let incrementalChange = (numRows - 1) * 2;
  //     for(let j = i; j < s.length; j+= incrementalChange){
  //         finalString += s[j];
  //         if(i > 0 && i < numRows - 1
  //             // found this online for the middle rows
  //             && j + incrementalChange - 2 * i < s.length){
  //            // online fuckers man are genius
  //             finalString += s[j + incrementalChange - 2 * i]
  //         }
  //     }
  // }

  // alternate way;

  // let zigZagString = Array(numRows).fill('');

  // let count = 0;
  // let zigDown = true;
  // for(let i = 0; i < s.length; i++){
  //     zigZagString[count] += s[i];
  //     if(zigDown){
  //         count++;
  //     }else{
  //         count--;
  //     }
  //     if(count === numRows){

  //         zigDown = false;
  //         count-=2;
  //         console.log(count);
  //     }
  //     if(count === 0){
  //         zigDown = true;
  //     }
  //     console.log(zigZagString)
  // }
};

//console.log(zigzagConversion("PAYPALISHIRING", 4));

// arranging the frequency in decreasing order
const frequencySort = (s) => {
  let hash = {};
  let finalString = '';
  for (let index in s) {
    hash[s[index]] ? hash[s[index]]++ : (hash[s[index]] = 1);
  }
  let sortableArray = [];
  for (let key in hash) {
    sortableArray.push([key, hash[key]]);
  }
  let sortedArray = sortableArray.sort((a, b) => b[1] - a[1]);
  // creating the string
  for (let i = 0; i < sortedArray.length; i++) {
    finalString += sortedArray[i][0].repeat(sortedArray[i][1]);
  }
  return finalString;
};

//console.log(frequencySort('tree'));

const multiplyStrings = (num1, num2) => {
  if (num1 === '0' || num2 === '0') return '0';
  const result = new Array(num1.length + num2.length).fill(0);
  num1 = num1.split('').reverse().join('');
  num2 = num2.split('').reverse().join('');
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      // console.log(num1[i],num2[j]);
      const singleProd = parseInt(num1[i]) * parseInt(num2[j]);
      result[i + j] += singleProd;
      result[i + j + 1] += Math.floor(result[i + j] / 10);
      result[i + j] = result[i + j] % 10;
    }
  }
  let finalResult = result.reverse();
  console.log(finalResult);
  let index = 0;
  let newSlice = [];
  // no leading zeroes
  if (finalResult[0] !== 0) {
    return finalResult.toString().split(',').join('');
  }
  // for leading zeroes
  while (finalResult[index] === 0) {
    index++;
    newSlice = finalResult.slice(index, finalResult.length);
  }
  return newSlice.toString().split(',').join('');
};

// console.log(multiplyStrings("9", "99"));

// getting the top K most frequent element
const topKFrequent = (words, k) => {
  const stack = [];
  let wordMap = new Map();
  // get the occurence using map
  for (let index in words) {
    if (wordMap.has(words[index])) {
      wordMap.set(words[index], wordMap.get(words[index]) + 1);
    } else {
      wordMap.set(words[index], 1);
    }
  }
  // array conversion then reenter new map
  const sortedMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));
  for (let [key, _] of sortedMap) {
    stack.push(key);
  }
  let final = stack.sort((a, b) => {
    if (sortedMap.get(b) == sortedMap.get(a)) {
      return a.localeCompare(b);
    } else {
      return b - a;
    }
  });
  return final.slice(0, k);
};

// console.log(topKFrequent(["i","love","leetcode","i","love","coding"],
// 3));

const replaceWords = (dictionary, sentence) => {
  const sentenceArray = sentence.split(' ');
  // console.log('main',dictionary, sentenceArray);
  for (let i = 0; i < sentenceArray.length; i++) {
    let tempStack = [];
    for (let j = 0; j < dictionary.length; j++) {
      if (sentenceArray[i].startsWith(dictionary[j])) {
        tempStack.push({ root: dictionary[j], length: dictionary[j].length });
      }
    }
    if (tempStack.length <= 0) {
      continue;
    }
    let sortedStack = tempStack.sort((a, b) => a.length - b.length);
    sentenceArray[i] = sortedStack[0].root;
  }
  let result = '';
  for (let i = 0; i < sentenceArray.length; i++) {
    result += sentenceArray[i] + ' ';
  }
  return result.slice(0, -1);
};

// console.log(replaceWords(["a", "aa", "aaa", "aaaa"],
// "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"));

// max non overlapping nums
const maxNonOverlapping = (nums, target) => {
  let set = new Set();
  let count = 0;
  let total = 0;

  for (let num of nums) {
    total += num;
    if (set.has(total - target) || total === target) {
      count++;
      set.clear();
      total = 0;
    } else {
      set.add(total);
    }
  }
  return count;
};

//console.log(maxNonOverlapping([1,1,1,1], 2));

// min steps to make t and anagram of s
const minStepsAnagram = (s, t) => {
  let sHash = {};
  let tHash = {};
  for (let index in s) {
    sHash[s[index]] ? sHash[s[index]]++ : (sHash[s[index]] = 1);
    tHash[t[index]] ? tHash[t[index]]++ : (tHash[t[index]] = 1);
  }
  let count = 0;
  // loop and check
  let sVals = Object.keys(sHash);
  for (let i = 0; i < sVals.length; i++) {
    // checking if frequency of t is less
    const sLetter = sVals[i];
    if (tHash[sLetter]) {
      if (tHash[sLetter] < sHash[sLetter]) {
        const difference = sHash[sLetter] - tHash[sLetter];
        count += difference;
      }
    } else {
      count += sHash[sLetter];
    }
  }
  return count;
};

//console.log(minStepsAnagram("leetcode","practice"));

// subarray ranges
const subArrayRanges = (nums) => {
  console.log(nums);
  // nested approach
  let total = 0;
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    // specifying the starting vals
    min = nums[i];
    max = nums[i];
    for (let j = i; j < nums.length; j++) {
      min = Math.min(min, nums[j]);
      max = Math.max(max, nums[j]);
      const difference = max - min;
      total += difference;
    }
  }
  return total;
};

//console.log(subArrayRanges([1,2,3]));

const sumSubarrayMins = (arr) => {
  let min = Infinity;
  let total = 0;
  const MOD = 1e9 + 7;
  for (let i = 0; i < arr.length; i++) {
    min = arr[i];
    for (let j = i; j < arr.length; j++) {
      min = Math.min(min, arr[j]);
      total += min;
    }
  }
  return total % MOD;
};

//console.log(sumSubarrayMins([3,1,2,4]));

const numMatchingSubseq = (s, words) => {
  // check words
  // check words
  let foundCounter = 0;
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let indexCollection = [];
    for (let j = 0; j < words[i].length; j++) {
      let startIndex = 0;
      if (indexCollection.length > 0) {
        startIndex = indexCollection[indexCollection.length - 1];
      }
      let indexes = s.indexOf(word[j], j === 0 ? startIndex : startIndex + 1);
      indexCollection.push(indexes);
    }
    if (indexCollection.length === 0) continue;
    if (indexCollection.length === 1) {
      foundCounter++;
      continue;
    }
    let verifyIndex = false;
    if (indexCollection.length > 1) {
      for (let k = 1; k < indexCollection.length; k++) {
        if (indexCollection[k] === indexCollection[k - 1]) {
          verifyIndex = false;
          break;
        }
        if (indexCollection[k] >= indexCollection[k - 1]) {
          verifyIndex = true;
        } else {
          verifyIndex = false;
          break;
        }
      }
    }
    if (verifyIndex) foundCounter++;
  }
  return foundCounter;
};

//console.log(numMatchingSubseq("btovxbkumc",
//["btovxbku","to","zueoxxxjme","yjkclbkbtl"]));

// divisor num k length;
const divisorSubstrings = (num, k) => {
  const stringNum = num.toString();
  let countDivisor = 0;
  let endIndex = k;
  let startIndex = 0;
  // first check
  const numSlice = stringNum.slice(0, k);
  if (num % parseInt(numSlice) === 0) countDivisor++;
  // other substrings
  while (endIndex < stringNum.length) {
    startIndex++;
    const numSlice = parseInt(stringNum.slice(startIndex, endIndex + 1));
    if (num % numSlice === 0) countDivisor++;
    endIndex++;
  }
  return countDivisor;
};

//console.log(divisorSubstrings(430043, 2));

const longestOnesRetry = (nums, k) => {
  let end = 0;
  let start = 0;
  let zeros = 0;
  let maxLen = 0;
  while (end < nums.length) {
    nums[end] === 0 && zeros++;
    while (zeros > k) {
      nums[start] === 0 && zeros--;
      start++;
    }
    maxLen = Math.max(maxLen, end + 1 - start);
    end++;
  }
  return maxLen;
};

//console.log(longestOnesRetry([1,1,1,0,0,0,1,1,1,1,0], 2));

const minSetSize = (arr) => {
  if (arr.every((num) => num === arr[0])) return 1;
  let numMap = new Map();
  for (let index in arr) {
    if (numMap.has(arr[index])) {
      numMap.set(arr[index], numMap.get(arr[index]) + 1);
    } else {
      numMap.set(arr[index], 1);
    }
  }
  const sortedMap = Array.from(numMap.values()).sort((a, b) => b - a);
  // use the length to find out the calculations
  let totalLen = arr.length;
  let subTotal = 0;
  let count = 0;
  for (let i = 0; i < sortedMap.length; i++) {
    subTotal += sortedMap[i];
    count++;
    if (subTotal >= totalLen / 2) break;
  }
  return count;
};
//console.log(minSetSize([3,3,3,3,5,5,5,2,2,7]));

// find least number of unique integers are removing k Characters
const findLeastNumOfUniqueInts = (arr, k) => {
  let hash = {};
  for (let index in arr) {
    hash[arr[index]] ? hash[arr[index]]++ : (hash[arr[index]] = 1);
  }
  const sortedNums = [];
  for (let [key, value] of Object.entries(hash)) {
    sortedNums.push({ num: parseInt(key), count: value });
  }
  const sortable = sortedNums.sort((a, b) => a.count - b.count);
  let postArray = [];
  // optimal strategy involves removing the numbers with the smallest count:
  for (let i = 0; i < sortable.length; i++) {
    const num = sortable[i].num.toString();
    const count = sortable[i].count;
    for (let j = 0; j < count; j++) {
      postArray.push(parseInt(num));
    }
  }
  // removing the k elements
  for (let i = 0; i < k; i++) {
    postArray.shift();
  }
  let postSet = new Set([...postArray]);
  return postSet.size;
};

//console.log(findLeastNumOfUniqueInts([4,3,1,1,3,3,2], 3));

// getting the daily waiting temperatures from when it gets
const dailyTemperatures = (temperatures) => {
  console.log(temperatures);
  // main waiting day stack

  // brute force but time limit exceeded
  const bruteForceApproach = (stack) => {
    for (let i = 0; i < temperatures.length; i++) {
      let dayCount = 0;
      let presentTemp = temperatures[i];
      let index = 0;
      const slice =
        temperatures.slice(i + 1, temperatures.length).length === 0
          ? [0]
          : temperatures.slice(i + 1, temperatures.length);
      // check something
      while (index < slice.length) {
        if (slice[index] > presentTemp) {
          dayCount++;
          stack[i] = dayCount;
          break;
        } else {
          dayCount++;
          index++;
        }
      }
    }
    return stack;
  };
  // monotic stack array questions
  // optimized
  let res = new Array(temperatures.length).fill(0);
  let stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      let popped = stack.pop();
      // console.log(stack, popped);
      res[popped] = i - popped;
    }
    stack.push(i);
  }
  return res;
};

//console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));

const findLonely = (nums) => {
  let hash = {};
  const stack = [];
  // let record ocurreunce
  for (let index in nums) {
    hash[nums[index]] ? hash[nums[index]]++ : (hash[nums[index]] = 1);
  }
  for (let index = 0; index < nums.length; index++) {
    if (hash[nums[index]] && hash[nums[index]] < 2) {
      if (!hash[nums[index] - 1] && !hash[nums[index] + 1]) {
        stack.push(nums[index]);
      }
    }
  }
  return stack;
};

//console.log(findLonely([69, 45, 69]));

// longest beautiful substring of all vowels present;
const longestBeautifulSubstringProblem = (word) => {
  console.log(word);

  let vowelString = 'aeiou';
  let maxWordLength = 0;
  let end = 0;
  // checking through the entire word in one pass.. need double index tracker
  while (end < word.length) {
    if (word[end] === 'a') {
      let checkIndex = end;
      let check = true;
      for (let i = 0; i < vowelString.length; i++) {
        if (word[checkIndex] !== vowelString[i]) {
          check = false;
          break;
        }
        // for repeated characters
        while (
          checkIndex < word.length &&
          word[checkIndex] === vowelString[i]
        ) {
          checkIndex++;
        }
      }
      if (check) {
        maxWordLength = Math.max(maxWordLength, checkIndex - end + 1);
      }
      end = checkIndex - 1;
    }
    end++;
  }
  return maxWordLength;
};
//console.log(longestBeautifulSubstringProblem("aaioaaaaeiiiiouuuooaauuaeiu"));

const greatestLetter = (s) => {
  let checkSet = new Set();
  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    const sliceBefore = s.slice(0, i);
    const sliceAfter = s.slice(i + 1, s.length);
    const slice = [...sliceBefore, ...sliceAfter];

    if (
      letter === letter.toLowerCase() &&
      slice.includes(letter.toUpperCase())
    ) {
      checkSet.add(letter.toUpperCase());
    } else if (
      letter === letter.toUpperCase() &&
      slice.includes(letter.toLowerCase())
    ) {
      checkSet.add(letter.toUpperCase());
    }
  }
  const checkArray = [...checkSet];
  let charCodes = [];
  let maxLetter = '';
  const checkString = checkArray.join('');
  for (let i = 0; i < checkString.length; i++) {
    const charCode = checkString.charCodeAt(i);
    charCodes.push(charCode);
  }
  const maxCode = Math.max(...charCodes);
  maxLetter = String.fromCharCode(maxCode);
  return maxLetter === '\u0000' ? '' : maxLetter;
};

//console.log(greatestLetter("arRAzFif"));

// return top k frequent elements array
const topKFrequentElements = (nums, k) => {
  let hash = {};
  for (let index in nums) {
    if (hash[nums[index]]) {
      hash[nums[index]]++;
    } else {
      hash[nums[index]] = 1;
    }
  }
  // sorting the object based on their value
  const newHashArray = Object.entries(hash).sort((a, b) => b[1] - a[1]);
  // getting the most frequent elements
  let counter = 0;
  let resultArray = [];

  for (let i = 0; i < newHashArray.length; i++) {
    resultArray.push(parseInt(newHashArray[i][0]));
    counter++;
    if (counter === k) break;
  }
  return resultArray;
};

//console.log(topKFrequentElements([1,1,1,2,2,3], 2));

const singleNonDuplicate = (nums) => {
  let map = new Map();
  for (let index in nums) {
    if (map.has(nums[index])) {
      // adding 1 if the element exists
      map.set(nums[index], map.get(nums[index]) + 1);
    } else {
      map.set(nums[index], 1);
    }
  }
  for (const [key, value] of map) {
    if (value === 1) return key;
  }
};

//console.log(singleNonDuplicate([1,1,2,3,3,4,4,8,8]));

var lengthOfLISCheck = function (nums) {
  console.log(nums);
  let lengthOfArray = new Array(nums.length).fill(1);
  // getting the subsequence.. setting the limit for iterating till i
  for (let i = 1; i < nums.length; i++) {
    const endLimitNumber = nums[i]; // this should be the biggest
    for (let j = 0; j < i; j++) {
      // if its smaller then ignore
      if (nums[j] >= endLimitNumber) {
        continue;
      }
      if (endLimitNumber > nums[j]) {
        let originalLength = lengthOfArray[j];
        lengthOfArray[i] = Math.max(lengthOfArray[i], originalLength + 1);
      }
    }
  }
  return Math.max(...lengthOfArray);
};
//console.log(lengthOfLISCheck([10,9,2,5,3,7,101,18]))

// finding the number of longest substrings

const findNumberOfLISCheck = (nums) => {
  console.log(nums);
  if (nums.every((num) => num === nums[0])) return nums.length;
  const lengthOfLongest = new Array(nums.length).fill(1);
  let collection = {};
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] <= nums[j]) {
        continue;
      }
      // replacing and recalculating the length
      if (nums[j] < nums[i]) {
        lengthOfLongest[i] = Math.max(
          lengthOfLongest[i],
          lengthOfLongest[j] + 1
        );
        console.log(lengthOfLongest[i]);
        if (collection[lengthOfLongest[i]]) {
          collection[lengthOfLongest[i]]++;
        } else {
          collection[lengthOfLongest[i]] = 1;
        }
      }
    }
  }
  console.log(lengthOfLongest, collection);
  let maxLength = Math.max(...lengthOfLongest);
  for (const [key, value] of Object.entries(collection)) {
    if (parseInt(key) === maxLength) {
      return value;
    }
  }
  console.log(maxLength);
};

//console.log(findNumberOfLISCheck([1,2,4,3,5,4,7,2]));

// 1 2 4 5 7
// 1 2 3 5 7
// 1 2 3 4 7

// longest palindromic substring
const longestPalindromeSubstring = (s) => {
  // checking all unique
  let hash = {};
  for (let index in s) {
    hash[s[index]] ? hash[s[index]]++ : (hash[s[index]] = 1);
  }
  let values = Object.values(hash);
  if (values.every((value) => value === 1)) {
    return s[0];
  }
  let result = '';
  // primary iteration...
  if (s.length === 1) return s;
  let palindromicCollection = [];
  for (let i = 0; i < s.length; i++) {
    // initial indexes
    let right = i + 1;
    let left = i - 1;
    // default result;
    // for odd ranges
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      const slice = s.slice(left, right + 1);
      palindromicCollection.push(slice);
      if (s[left] !== s[right]) {
        break;
      }
      right++;
      left--;
    }
    // for even ranges
    left = i;
    right = i + 1;
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      const slice = s.slice(left, right + 1);
      palindromicCollection.push(slice);
      if (s[left] !== s[right]) {
        break;
      }
      right++;
      left--;
    }
  }
  if (palindromicCollection.length === 0) {
    palindromicCollection.push(s[0]);
  }
  let maxLen = 0;
  for (let i = 0; i < palindromicCollection.length; i++) {
    maxLen = Math.max(maxLen, palindromicCollection[i].length);
    if (maxLen === palindromicCollection[i].length) {
      result = palindromicCollection[i];
    }
  }
  return result;
};

//console.log(longestPalindromeSubstring(
//"abcda"));

const countSubstrings = (s) => {
  let counter = s.length;
  let palindromicCollection = [];
  for (let i = 0; i < s.length; i++) {
    // odd combos
    let right = i + 1;
    let left = i - 1;
    while (left >= 0 && right <= s.length - 1 && s[right] == s[left]) {
      const slice = s.slice(left, right + 1);
      palindromicCollection.push(slice);
      right++;
      left--;
    }
    // even pairs
    left = i;
    right = i + 1;
    while (left >= 0 && right <= s.length - 1 && s[right] == s[left]) {
      const slice = s.slice(left, right + 1);
      palindromicCollection.push(slice);
      right++;
      left--;
    }
  }
  return counter + palindromicCollection.length;
};

//console.log(countSubstrings("xabay"));

const maxSubarray = (nums) => {
  let sum = nums[0];
  let finalSum = nums[0];
  // using sliding window technqiue
  let end = 1;
  while (end < nums.length) {
    if (sum + nums[end] > nums[end]) {
      sum += nums[end];
    } else {
      if (sum + nums[end] <= nums[end]) {
        sum = nums[end];
      }
      finalSum = Math.max(finalSum, sum);
      end++;
    }
  }

  return finalSum;
};

//console.log(maxSubarray([-2,-2,-3,4,-1,2,1,-5,4]));

const longestNiceSubstring = (s) => {
  if (s.length === 1) return '';
  // brute force
  let subCollection = new Set();
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (j === i) continue;
      const slice = s.slice(i, j + 1);
      subCollection.add(slice);
    }
  }
  // check function for subarray nice or valid based on condition
  const checkSubstring = (substring) => {
    let upper = new Set();
    let lower = new Set();

    for (let index in substring) {
      if (substring[index] === substring[index].toLowerCase()) {
        lower.add(substring[index]);
      } else if (substring[index] === substring[index].toUpperCase()) {
        upper.add(substring[index]);
      }
    }
    // set comparison
    let check = false;
    if (upper.size === lower.size) {
      const upperArray = [...upper].sort();
      const lowerArray = [...lower].sort();

      // comparison
      for (let i = 0; i < upperArray.length; i++) {
        if (upperArray[i].toLowerCase() === lowerArray[i].toLowerCase()) {
          check = true;
        } else {
          check = false;
          break;
        }
      }
    }
    return check;
  };
  const collectionArray = [...subCollection];
  const finalCollection = [];
  // final check
  for (let i = 0; i < collectionArray.length; i++) {
    if (checkSubstring(collectionArray[i])) {
      finalCollection.push(collectionArray[i]);
    }
  }
  // getting max
  console.log(finalCollection);
  let maxLen = 0;
  for (let i = 0; i < finalCollection.length; i++) {
    maxLen = Math.max(maxLen, finalCollection[i].length);
  }
  const result = finalCollection.filter(
    (collection) => collection.length === maxLen
  );
  return result[0] === undefined ? '' : result[0];
};

//console.log(longestNiceSubstring(
//  "dDzeE"));

// easy problem
const checkIfPangram = (sentence) => {
  const set = new Set();

  for (let index in sentence) {
    set.add(sentence[index]);
  }
  if (set.size !== 26) {
    return false;
  } else {
    return true;
  }
};

//console.log(checkIfPangram('thequickbrownfoxjumpsoverthelazydog'));

const partitionLabelsRetry = (s) => {
  let hash = {};
  for (let index in s) {
    hash[s[index]] = parseInt(index);
  }
  let endPointer = 0;
  let size = 0;
  let collection = [];
  // as soon as you get to the end value in hash then that is a partition
  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]] || hash[s[i]] === 0) {
      size++;
      endPointer = Math.max(endPointer, hash[s[i]]);
    }
    if (endPointer + 1 === size) {
      collection.push(size);
    }
  }
  let finalIndexes = [];
  finalIndexes.push(collection[0]);
  for (let i = 1; i < collection.length; i++) {
    finalIndexes.push(collection[i] - collection[i - 1]);
  }
  return finalIndexes;
};

// console.log(partitionLabelsRetry(
//     "caedbdedda"));

// count palindromic subsequence of length 3
const countPalindromicSubsequence = (s) => {
  console.log(s);

  // brute force approach using tripple nested loop
  let set = new Set();
  for (let first = 0; first < s.length; first++) {
    for (let second = first + 1; second < s.length; second++) {
      for (let third = second + 1; third < s.length; third++) {
        if (s[first] === s[third]) {
          const palindromeString = s[first] + s[second] + s[third];
          set.add(palindromeString);
        }
      }
    }
  }

  // optimized approach finding similar characters on both sides using nested loop
  let optimizedSet = new Set();
  for (let index = 0; index < s.length; index++) {
    let rightSet = new Set();
    let leftSet = new Set();
    if (index === 0 || index === s.length - 1) {
      continue;
    }
    const rightSlice = s.slice(index + 1, s.length);
    const leftSlice = s.slice(0, index);
    for (let i = 0; i < rightSlice.length; i++) {
      rightSet.add(rightSlice[i]);
    }
    for (let j = 0; j < leftSlice.length; j++) {
      leftSet.add(leftSlice[j]);
    }
    // iterating through set to check
    for (const letter of rightSet) {
      if (leftSet.has(letter)) {
        const palindrome = letter + s[index] + letter;
        optimizedSet.add(palindrome);
      }
    }
  }
  // final acceptable approach
};

//console.log(countPalindromicSubsequence(
//  "bbcbaba"))

// non decreasing array
const checkPossibility = (nums) => {
  // decreasing the left element is suitable as the next elements are not known
  let maxCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= nums[i + 1]) continue;
    if (nums[i] > nums[i + 1]) {
      if (nums[i] > nums[i + 1] && i === 0) {
        nums[i] = nums[i + 1];
        maxCount++;
      }
      if (nums[i - 1] > nums[i + 1]) {
        nums[i + 1] = nums[i];
        maxCount++;
      } else if (nums[i - 1] === nums[i + 1]) {
        nums[i] = nums[i + 1];
        maxCount++;
      } else if (nums[i - 1] < nums[i + 1]) {
        nums[i] = nums[i + 1];
        maxCount++;
      }
    }
    if (maxCount === 1) {
      break;
    }
  }
  let newNums = [...nums];
  let checkIncrease = true;
  for (let i = 0; i < newNums.length; i++) {
    if (newNums[i] > newNums[i + 1]) {
      checkIncrease = false;
      break;
    }
  }
  return checkIncrease;
};

//console.log(checkPossibility([1,4,1,2]));

const countKDifference = (nums, k) => {
  let counter = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (i === 0) continue;
      const difference = Math.abs(nums[j] - nums[i]);
      if (difference === k) counter++;
    }
  }
  return counter;
};
// console.log(countKDifference([1,2,2,1], 1));

// finding k different pairs
const findPairs = (nums, k) => {
  let counter = 0;
  let map = new Map();
  // getting occurences
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1);
    }
  }
  // using non repetition map
  for (const [key, value] of map) {
    if (k === 0) {
      if (value >= 2) {
        counter++;
      }
    } else {
      const checkVal = key + k;
      if (map.has(checkVal)) {
        counter++;
      }
    }
  }
  return counter;
};

// console.log(findPairs([3,1,4,1,5], 2));
var isSumEqual = function (firstWord, secondWord, targetWord) {
  let first = 0;
  let second = 0;
  let target = 0;
  let values = {
    a: '0',
    b: '1',
    c: '2',
    d: '3',
    e: '4',
    f: '5',
    g: '6',
    h: '7',
    i: '8',
    j: '9',
  };
  for (let index in firstWord) {
    first += values[firstWord[index]];
  }
  for (let index in secondWord) {
    second += values[secondWord[index]];
  }
  for (let index in targetWord) {
    target += values[targetWord[index]];
  }

  return parseInt(first) + parseInt(second) === parseInt(target);
};

//console.log(isSumEqual('acb', 'cba', 'cdb'));

// generating all possible subsets of an array of arrays
const subsets = (nums) => {
  const subsets = [];
  const singleSubSet = [];
  // using backtracking
  const generateSubsetBacktrack = (index) => {
    if (index >= nums.length) {
      console.log(singleSubSet);
      let subCopy = [...singleSubSet];
      subsets.push(subCopy);
      return;
    }
    // including nums from prev subsets
    singleSubSet.push(nums[index]);
    generateSubsetBacktrack(index + 1);

    // removing the last nums[index] for the second condition
    singleSubSet.splice(singleSubSet.length - 1, 1);
    generateSubsetBacktrack(index + 1);
  };
  generateSubsetBacktrack(0);
  return subsets;
};
//console.log(subsets([1,2,3]));

// incomplete
const subsetsWithDup = (nums) => {
  const subsets = [];
  const singleSubSet = [];

  const generateSubsetBacktrack = (index) => {
    if (index >= nums.length) {
      let subCopy = [...singleSubSet];
      subsets.push(subCopy);
      return;
    }
    // including nums from prev subsets
    singleSubSet.push(nums[index]);
    generateSubsetBacktrack(index + 1);

    // removing the last nums[index] for the second condition
    singleSubSet.splice(singleSubSet.length - 1, 1);
    generateSubsetBacktrack(index + 1);
  };
  generateSubsetBacktrack(0);

  const noDuplicateSets = new Set();
  for (let i = 0; i < subsets.length; i++) {
    const subset = subsets[i].toString().split(',').join('');
    noDuplicateSets.add(subset);
  }
  // converting into integer
  const noDuplicateArray = [...noDuplicateSets];
  for (let i = 0; i < noDuplicateArray.length; i++) {
    noDuplicateArray[i] = noDuplicateArray[i].split('');
    for (let j = 0; j < noDuplicateArray[i].length; j++) {
      noDuplicateArray[i][j] = parseInt(noDuplicateArray[i][j]);
    }
  }
  return noDuplicateArray;
};

// setting matrix values as zeroes
const setZeroesRetry = (matrix) => {
  // storing rows and columns in sets to stop repeatition
  let colSet = new Set();
  let rowSet = new Set();

  // getting the zero locations
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] === 0 && colSet.add(j) && rowSet.add(i);
    }
  }
  // converting the rows to zero
  for (let col of colSet) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][col] = 0;
    }
  }
  // converting the columns to zeros
  for (let row of rowSet) {
    for (let i = 0; i < matrix[0].length; i++) {
      matrix[row][i] = 0;
    }
  }
  return matrix;
};

//console.log(setZeroesRetry([[0,1,8,0],[3,4,5,2],[1,3,1,5]]));

// removing overlapping intervals
const eraseOverlapIntervals = (intervals) => {
  if (intervals.length === 0) {
    return 0;
  }
  let sortedIntervals = intervals.sort((a, b) => a[1] - b[1]);
  // stack approach
  let endValue = sortedIntervals[0][1];
  let counter = 0;
  for (let i = 1; i < sortedIntervals.length; i++) {
    const currentInterval = sortedIntervals[i];
    if (currentInterval[0] < endValue) {
      counter++;
    } else {
      endValue = currentInterval[1];
    }
  }
  return counter;
};

// console.log(eraseOverlapIntervals(

// [[0,2],[1,3],[2,4],[3,5],[4,6]]));

// getting the subarray sum
const subArraysum = (nums, k) => {
  let end = 0;
  let map = new Map();
  map.set(0, 1);
  let sum = 0;
  let counter = 0;
  while (end < nums.length) {
    sum += nums[end];
    const prevSum = sum - k;
    if (map.has(prevSum)) {
      counter += map.get(prevSum);
    }
    if (map.has(sum)) {
      map.set(sum, map.get(sum) + 1);
    } else {
      map.set(sum, 1);
    }

    end++;
  }
  return counter;
};

//console.log(subArraysum([1,2,3], 3));

// diagonally sorting a matrix
// const diagonalSort = (mat)=>{
//     console.log(mat);
//     let newMatrix = new Array(mat.length).fill(0);
//     for(let i = 0; i < newMatrix.length; i++){
//         newMatrix[i] = new Array(mat[0].length).fill(0);
//     };
//     console.log(newMatrix);

//     // getting the diagonals
//     for(let i = 0; i < mat.length; i++){
//         for(let j = 0; j <mat.length; j++){

//         }
//     }

// }

// // diagonal coords
// // 2, 0
// // 1,0 2,1
// // 0,0 1,1, 2,2

// console.log(diagonalSort([[3,3,1,1],[2,2,1,2],[1,1,1,2]]));

// count distinct integers
const countDistinctIntegers = (nums) => {
  let set = new Set();
  for (let index in nums) {
    set.add(nums[index]);
  }
  let newArray = [...nums];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i].toString().split('');
    newArray.push(parseInt(num.reverse().join('')));
  }
  for (let index in newArray) {
    set.add(newArray[index]);
  }
  return set.size;
};

//console.log(countDistinctIntegers([1,13,10,12,31]));

const checkString = (s) => {
  let indexA = [];
  let aCounter = 0;
  let genCounter = 1;
  if (s.split('').every((letter) => letter === 'b')) return true;
  for (let index in s) {
    s[index] === 'a' && indexA.push(parseInt(index)) && aCounter++;
  }
  // false conditions
  if (indexA.length === 1 && indexA[0] > 0) return false;
  if (indexA[0] > 0) return false;
  for (let i = 1; i < indexA.length; i++) {
    if (indexA[i] - indexA[i - 1] !== 1) return false;
    genCounter++;
  }
  return genCounter === aCounter;
};

//console.log(checkString("ba"));

// array is guaranteed to be a increasing then drop then peak index
const peakIndexInAMountainArray = (arr) => {
  console.log(arr);

  let endIndex = 0;
  let indexRecord = 0;
  while (endIndex < arr.length) {
    if (arr[endIndex + 1] > arr[endIndex]) {
      let peakCheck = false;
      while (endIndex < arr.length && arr[endIndex + 1] > arr[endIndex]) {
        endIndex++;
      }
      // checking for drop in index value
      while (endIndex < arr.length && arr[endIndex + 1] < arr[endIndex]) {
        peakCheck = true;
        break;
      }
      // if peak check is true then record the point of change
      if (peakCheck) {
        return (indexRecord = endIndex);
      }
    } else {
      endIndex++;
    }
  }
};
//get index of 2 with peak 15

//console.log(peakIndexInAMountainArray([0,10,15,5,2]));

// 1268. Search Suggestions System
const suggestedProducts = (products, searchWord) => {
  let sortedProducts = products.sort();
  let searchCollection = [];
  // nested approach
  let checkString = '';
  for (let i = 0; i < searchWord.length; i++) {
    let letter = searchWord[i];
    checkString += letter;
    let singleCollection = [];
    for (let j = 0; j < products.length; j++) {
      if (sortedProducts[j].startsWith(checkString)) {
        singleCollection.push(sortedProducts[j]);
      }
    }
    if (singleCollection.length > 3) {
      searchCollection.push(singleCollection.slice(0, 3));
    } else {
      searchCollection.push(singleCollection);
    }
  }
  return searchCollection;
};

//console.log(suggestedProducts(["mobile","mouse","moneypot","monitor","mousepad"],
//"mouse" ))

// finding the max sum of hour class in a 3*3 matrix
const maxSumOfHourGlass = (grid) => {
  // forming 3 * 3 matrix
  let maxHourSum = 0;
  for (let i = 0; i < grid.length; i++) {
    let gridRow = grid[i];
    for (let j = 0; j < gridRow.length; j++) {
      if (grid.length - i < 3) {
        continue;
      } else if (gridRow.length - j < 3) {
        continue;
      } else {
        let singleHourGlassSum =
          grid[i][j] +
          grid[i][j + 1] +
          grid[i][j + 2] +
          grid[i + 1][j + 1] +
          grid[i + 2][j] +
          grid[i + 2][j + 1] +
          grid[i + 2][j + 2];
        if (!isNaN(singleHourGlassSum)) {
          maxHourSum = Math.max(maxHourSum, singleHourGlassSum);
        }
      }
    }
  }
  return maxHourSum;
};

//console.log(maxSumOfHourGlass([[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]));
var kthDistinct = function (arr, k) {
  let hash = {};
  for (let index in arr) {
    hash[arr[index]] ? hash[arr[index]]++ : (hash[arr[index]] = 1);
  }
  let collection = [];
  for (const [key, value] of Object.entries(hash)) {
    value === 1 && collection.push(key);
  }
  if (collection.length < k) {
    let remainingLength = k - collection.length;
    for (let i = 0; i < remainingLength; i++) {
      collection.push('');
    }
    return collection[k - 1];
  } else {
    return collection[k - 1];
  }
};

//console.log(kthDistinct(
//  ["a","b","a"], 3));

// using basic binary search
const search = (nums, target) => {
  let sortedNums = nums.sort((a, b) => a - b);
  let index = -Infinity;
  const binaryCheck = (target, start, end) => {
    // edge case if the start index exceeds the length
    if (start > end) {
      return -1;
    }
    const middleIndex = Math.floor(end - start / 2);
    if (sortedNums[middleIndex] === target) {
      index = middleIndex;
      return;
    }
    if (sortedNums[middleIndex] > target) {
      binaryCheck(target, start, middleIndex - 1);
    }
    if (sortedNums[middleIndex] < target) {
      binaryCheck(target, middleIndex + 1, end);
    }
  };
  binaryCheck(target, 0, nums.length - 1);
  return index === -Infinity ? -1 : index;
};

//console.log(search([-1,0,3,5,9,12], 9));

// removing all the adjacent duplicates within the string and recombining the remaining parts in order to find
// other combinations.
const removeAllAdjacentDuplicates = (s, k) => {
  console.log(s, k);
  // note hash approach is also a possible way but will not work due to the order switch
  // using the stack approach to store the character and its count
  let stack = [[s[0], 1]]; // initial value
  let endIndex = 1;
  while (endIndex < s.length) {
    if (stack.length && stack[stack.length - 1][0] === s[endIndex]) {
      stack[stack.length - 1][1] += 1;
    } else {
      // pushing an extra new char with one occurence
      stack.push([s[endIndex], 1]);
    }
    if (stack[stack.length - 1][1] === k) {
      stack.pop();
    }
    endIndex++;
  }
  let finalString = '';
  // iterating stack
  for (let i = 0; i < stack.length; i++) {
    const letter = stack[i][0];
    finalString += letter.repeat(stack[i][1]);
  }
  return finalString;
};

//console.log(removeAllAdjacentDuplicates("deeedbbcccbdaa", 3));

// remove stars to the left of every characters
const removeStars = (s) => {
  const star = '*';
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    s[i] !== star && stack.push(s[i]);
    s[i] === star && stack.pop();
  }
  return stack.join('');
};
// console.log(removeStars("leet**cod*e"));
const backSpaceCompare = (s, t) => {
  let stackOne = [];
  let stackTwo = [];

  for (let index in s) {
    s[index] !== '#' && stackOne.push(s[index]);
    s[index] === '#' && stackOne.pop();
  }
  for (let index in t) {
    t[index] !== '#' && stackTwo.push(t[index]);
    t[index] === '#' && stackTwo.pop();
  }
  return stackOne.join('') === stackTwo.join('');
};

//console.log(backSpaceCompare("ab##", "c#d#"));

// matrix diagonal sum;
const diagonalSum = (mat) => {
  // traversing the matrix
  let matLen = mat.length;
  let finalSum = 0;
  let collectionArray = [];
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      // primary diagonal;
      if (i === j) {
        collectionArray.push(mat[i][j]);
      }
      if (i === j && i + j === matLen - 1) {
        continue;
      }
      if (i + j === matLen - 1) {
        collectionArray.push(mat[i][j]);
      }
    }
  }
  finalSum = collectionArray.reduce((a, b) => a + b);
  return finalSum;
};

// console.log(diagonalSum([[1,2,3],
//     [4,5,6],
//     [7,8,9]]));

// product of the other elements other than the number itself.
const productExceptSelf = (nums) => {
  // get the suffix products
  let suffProdArray = new Array(nums.length).fill(1);
  let prefProdArray = new Array(nums.length).fill(1);
  let finalProdArray = new Array(nums.length).fill(1);
  // prod variables
  let suffProd = 1;
  let prefProd = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    suffProd *= nums[i];
    suffProdArray[i] = suffProd;
  }
  // get the prefix products
  for (let i = 0; i < nums.length; i++) {
    prefProd *= nums[i];
    prefProdArray[i] = prefProd;
  }
  // using the pref and the suff prod arrays get prods from each side of the selected elements
  // base logic is to find the next suffix element from each side of the primary element
  for (let i = 0; i < nums.length; i++) {
    const suffProdElement =
      suffProdArray[i + 1] === undefined ? 1 : suffProdArray[i + 1];
    const prefProdElement =
      prefProdArray[i - 1] === undefined ? 1 : prefProdArray[i - 1];
    finalProdArray[i] = suffProdElement * prefProdElement;
  }
  return finalProdArray;
};
// possible output is
// [24,12, 8, 6]

//console.log(productExceptSelf([1,2,3,4]));

// finding the longest word that can be formed using all the other words as prefixes of the current word
const longestWordInDictionary = (words) => {
  const wordsSorted = words.sort();
  // all the prefix needs to be present of the current word
  const getPrefixes = (word) => {
    let prefixSet = new Set();
    let prefs = '';
    for (let i = 0; i < word.length - 1; i++) {
      prefs += word[i];
      prefixSet.add(prefs);
    }
    return prefixSet;
  };
  // main iteration to check which has all the prefixes in the entire array
  let finalWord = '';
  for (let i = 0; i < wordsSorted.length; i++) {
    let word = wordsSorted[i];
    let prefixSetArray = [...getPrefixes(word)];
    // checking whether all the prefixes are present or not in the wordssorted
    let collection = [];
    if (prefixSetArray.every((el) => wordsSorted.includes(el))) {
      if (finalWord.length < word.length) {
        finalWord = word;
        if (finalWord.length === word.length) {
          collection = [finalWord, word].sort();
          finalWord = collection[0];
        }
      }
    }
  }
  return finalWord;
};
//console.log(longestWordInDictionary(["a","banana","app","appl","ap","apply","apple"]));

// leetcode two city scheduling
const twoCitySchedCost = (costs) => {
  let costHashArray = [];
  // base logic finding which city is more expensive than each other.. then after finding the difference
  // calculating where to send which city and sorting it out
  // getting the difference and cost hash
  for (let i = 0; i < costs.length; i++) {
    const localDifference = costs[i][1] - costs[i][0];
    costHashArray.push({
      difference: localDifference,
      values: costs[i],
    });
  }
  // sorting the cost hash array based on the difference
  const costArraySorted = costHashArray.sort(
    (a, b) => a.difference - b.difference
  );
  // assigning the first half for city B and city A
  let halfCheck = false;
  let total = 0;
  for (let i = 0; i < costArraySorted.length; i++) {
    if (!halfCheck) {
      total += costArraySorted[i].values[1];
    } else {
      total += costArraySorted[i].values[0];
    }
    if (i === costArraySorted.length / 2 - 1) {
      halfCheck = true;
    }
  }
  return total;
};

//console.log(twoCitySchedCost([[10,20],[30,200],[400,50],[30,20]]));

// buy and sell stock ii //you are allowed to make multiple transaction
const maxProfit = (prices) => {
  let buyStock = prices[0];
  let profit = 0;
  // main iteration
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < buyStock) {
      buyStock = prices[i];
    } else {
      if (prices[i] > buyStock && prices[i + 1] < prices[i]) {
        const difference = prices[i] - buyStock;
        profit += difference;
        buyStock = prices[i + 1];
      } else {
        if (i === prices.length - 1) {
          profit += prices[i] - buyStock;
          break;
        }
      }
    }
  }
  return profit;
};
//console.log(maxProfit([7,1,5,3,6,4]));

// finding the longest substring that has vowels appearing even number of times
// sliding window approach
const findTheLongestSubstring = (s) => {
  console.log(s);
  const subHash = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0,
  };
  // using vowel hash to store the increments of the vowels
  let endIndex = 0;
  let maxLength = 0;
  let startIndex = 0;
  while (endIndex < s.length) {
    if (s[endIndex] in subHash) {
      subHash[s[endIndex]]++;
    }
    const hashVals = Object.values(subHash);
    console.log(hashVals);
    // // if all the values in the array is divisible by 2 then reduce window
    // hashVals.every((singleValue)=> singleValue % 2 === 0)){

    // }
    endIndex++;
  }
};
//console.log(findTheLongestSubstring("leetminicoworoep"));

// valid palindrome II
const validPalindromeII = (s) => {
  let end = s.length - 1;
  let start = 0;
  // basic palindrome checker
  const checkPalindrome = (s, end, start) => {
    if (start === end) {
      return true;
    }
    let localEnd = end;
    let localStart = start;
    while (localStart <= localEnd) {
      if (s[localStart] !== s[localEnd]) {
        return false;
      }
      localStart++;
      localEnd--;
    }
    return true;
  };
  // main iteration for checking the last two chars.. ignoring the last two chars if they are same
  while (start <= end) {
    if (s[start] !== s[end]) {
      return (
        checkPalindrome(s, end - 1, start) || checkPalindrome(s, end, start + 1)
      );
    }
    end--;
    start++;
  }
  return true;
};

//console.log(validPalindromeII("bzzb"));

// delete and earn values
const deleteAndEarn = (nums) => {
  // using dp way
  nums.sort((a, b) => a - b);
  let hash = {};
  for (let index in nums) {
    if (hash[nums[index]]) {
      hash[nums[index]]++;
    } else {
      hash[nums[index]] = 1;
    }
  }
  const keyVals = Object.keys(hash);
  let newNums = [];
  for (let i = 0; i < keyVals.length; i++) {
    newNums.push(parseInt(keyVals[i]));
  }
  let dpArray = new Array(newNums.length).fill(0);
  // main iteration
  for (let i = 0; i < newNums.length; i++) {
    if (i === 0) {
      // no prev values hence for the first index
      dpArray[i] = newNums[i] * hash[newNums[i]];
    } else if (i === 1) {
      if (newNums[i] - 1 === newNums[i - 1]) {
        dpArray[i] = Math.max(newNums[i] * hash[newNums[i]], dpArray[i - 1]);
      } else {
        dpArray[i] = dpArray[i - 1] + newNums[i] * hash[newNums[i]];
      }
    } else {
      // remaining condition where you can put all values that appear right before the other total values too
      if (newNums[i] - 1 === newNums[i - 1]) {
        // only can be included the max of the current number multiplied by its occurence plus the old sum from dpArray
        let maxCurrentNumEarn = newNums[i] * hash[newNums[i]];
        let maxEarn = Math.max(
          maxCurrentNumEarn + dpArray[i - 2],
          dpArray[i - 1]
        );
        dpArray[i] = maxEarn;
      } else {
        dpArray[i] = newNums[i] * hash[newNums[i]] + dpArray[i - 1];
      }
    }
  }
  return dpArray[dpArray.length - 1];
};
// console.log(deleteAndEarn(

//     [1,6,3,3,8,4,8,10,1,3]))

// house robber problem similar to delete and earn using dp approach;
// keeping in that mind we cannot rob the house adjacent to the left side of the array if we are iterating using a linear appraoch
// if two adjacent houses like the i + 1 houses are robbed they will be alerted
const rob = (nums) => {
  // dp is the logic of cumulative earnings of element that helps to add the summation of problems
  let dpArray = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    // first and second element by default will have custom addition
    if (i === 0) {
      dpArray[i] = nums[i] + dpArray[i];
    }
    if (i === 1) {
      let maxMoney = Math.max(nums[i], dpArray[i - 1]);
      dpArray[i] = maxMoney;
    }
    // remaining logic for index 2 onwards
    if (i > 1) {
      let maxMoney = Math.max(dpArray[i - 1], nums[i] + dpArray[i - 2]);
      dpArray[i] = maxMoney;
    }
  }
  return dpArray[dpArray.length - 1];
};

// house robber problem II where the first house is connected to the last house hence making them adjacent houses
const robII = (nums) => {
  // cannot include the first house and include the last house
  if (nums.length === 1) return nums[0];
  const robCheck = (nums) => {
    let dpArray = new Array(nums.length).fill(0);
    // main iteration
    for (let i = 0; i < nums.length; i++) {
      if (i === 0) {
        dpArray[i] = nums[i];
      }
      // checking for second index seperately
      if (i === 1) {
        let maxSecondValue = Math.max(dpArray[i - 1], nums[i]);
        dpArray[i] = maxSecondValue;
      }
      if (i > 1) {
        let maxValue = Math.max(dpArray[i - 1], dpArray[i - 2] + nums[i]);
        dpArray[i] = maxValue;
      }
    }
    return dpArray;
  };
  // getting the dp with and without first and last elmeent
  let dpOne = robCheck(nums.slice(1, nums.length));
  let dpTwo = robCheck(nums.slice(0, nums.length - 1));
  console.log(dpOne, dpTwo, nums);
  return Math.max(...dpOne, ...dpTwo) === -Infinity
    ? 0
    : Math.max(...dpOne, ...dpTwo);
};
// console.log(robII([1,2,1,1]));

// using basic dpArray approach in order to solve the problem
const minCostClimbingStairs = (cost) => {
  let dpArray = new Array(cost.length).fill(0);
  for (let index in cost) {
    dpArray[index] = cost[index];
  }
  // extra element to create the out of bound destination spot
  dpArray.push(0);
  // contains the elements of simultaneously one step and two step
  for (let i = dpArray.length - 1; i >= 0; i--) {
    if (i === dpArray.length - 1 || i === dpArray.length - 2) {
      continue;
    }
    // rest of the array
    if (i < dpArray.length - 2) {
      let firstStep = dpArray[i] + dpArray[i + 1];
      let secondStep = dpArray[i] + dpArray[i + 2];
      dpArray[i] = Math.min(firstStep, secondStep);
    }
  }
  console.log(dpArray, cost);
  // now we need to get the mininum between the first and second elements of the dp
  return Math.min(dpArray[0], dpArray[1]);
};

// console.log(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1]))

// climbing stairs problem using the reverse dynamic programming strategy
const climbStairs = (n) => {
  let dpArray = new Array(n + 1).fill(0);
  // reverse logic to reach the goal with max of two steps
  for (let i = dpArray.length - 1; i >= 0; i--) {
    if (i === dpArray.length - 1 || i === dpArray.length - 2) {
      dpArray[i] = 1;
    }
    // from the third last index we start recording
    if (i < dpArray.length - 2) {
      dpArray[i] = dpArray[i + 1] + dpArray[i + 2];
    }
  }
  return dpArray[0];
};

//console.log(climbStairs(5));

// combination sum

// longest increasing sub practise using dp approach
const longestIncreasingSub = (nums) => {
  // remmber subsequence can skip values
  let dpArray = new Array(nums.length).fill(1);
  // by default dpArrays have length of 1
  // getting the subsequence
  for (let i = 1; i < nums.length; i++) {
    let endNum = nums[i];
    for (let j = 0; j < i; j++) {
      // if current is smaller then skip
      if (endNum <= nums[j]) continue;
      if (endNum > nums[j]) {
        // to check whether the subsequence is already present or not so we find the max
        dpArray[i] = Math.max(dpArray[j] + 1, dpArray[i]);
      }
    }
  }
  return Math.max(...dpArray);
};

//console.log(longestIncreasingSub([10,9,2,5,3,7,101,18]));

const deleteAndEarnRetryOptimized = (nums) => {
  nums.sort((a, b) => a - b); // sorting the nums to find the value right before
  let numHash = {};
  let uniqueArray = [];
  for (let index in nums) {
    if (numHash[nums[index]]) {
      numHash[nums[index]]++;
    } else {
      numHash[nums[index]] = 1;
      uniqueArray.push(nums[index]);
    }
  }
  // console.log(uniqueArray, numHash); // using the occurence to multiply and add the totals
  let dp = new Array(uniqueArray.length).fill(0);
  for (let i = 0; i < uniqueArray.length; i++) {
    const currentNumTotal = uniqueArray[i] * numHash[uniqueArray[i]];
    if (i === 0) {
      dp[i] = uniqueArray[i] * numHash[uniqueArray[i]];
    } else if (i === 1) {
      if (uniqueArray[i] - 1 === uniqueArray[i - 1]) {
        dp[i] = Math.max(dp[i - 1], currentNumTotal);
      } else {
        dp[i] = Math.max(dp[i - 1], currentNumTotal + dp[i - 1]);
      }
    } else {
      // indexes above 1
      if (uniqueArray[i] - 1 === uniqueArray[i - 1]) {
        dp[i] = Math.max(dp[i - 1], currentNumTotal + dp[i - 2]);
      } else {
        dp[i] = dp[i - 1] + currentNumTotal;
      }
    }
  }
  return dp[dp.length - 1];
};

//console.log(deleteAndEarnRetryOptimized([2,2,3,3,3,4]));

// counting the number of palindromic substrings that can be formed using the one single single string
// first approach is to get the even number of palindromic substrings
// second step is to get the the odd number substrings by going left and right from the selected character
const countPalindromicSubstrings = (s) => {
  let counter = 0;
  for (let index = 0; index < s.length; index++) {
    let leftIndex = index - 1;
    let rightIndex = index + 1;
    // get the odd number of palindromic subs
    while (
      leftIndex >= 0 &&
      rightIndex < s.length &&
      s[leftIndex] === s[rightIndex]
    ) {
      counter++;
      leftIndex--;
      rightIndex++;
    }
    // index switch for even pair detection
    leftIndex = index;
    rightIndex = index + 1;
    // get the even number of palindromic subs
    while (
      leftIndex >= 0 &&
      rightIndex < s.length &&
      s[leftIndex] === s[rightIndex]
    ) {
      counter++;
      leftIndex--;
      rightIndex++;
    }
  }
  return counter + s.length;
};

//console.log(countPalindromicSubstrings('aaa'));

// considering that alice always starts first in the pick
const stoneGameDp = (piles) => {
  piles.sort((a, b) => b - a);
  let aliceDp = new Array(piles.length / 2).fill(0);
  aliceDp[0] = piles[0];
  let bobDp = new Array(piles.length / 2).fill(0);
  let halfPoint = piles.length / 2;
  for (let i = 1; i < piles.length / 2; i++) {
    aliceDp[i] += aliceDp[i - 1] + piles[i];
  }
  const bobPile = piles.slice(halfPoint, piles.length);
  for (let i = 0; i < bobPile.length; i++) {
    if (i === 0) {
      bobDp[i] = bobPile[i];
    } else {
      bobDp[i] += bobDp[i - 1] + bobPile[i];
    }
  }
  return bobDp[bobDp.length - 1] > aliceDp[aliceDp.length - 1] ? false : true;
};

//console.log(stoneGameDp([5,3,4,5]));

// incomplete as it involves 2D dynamic programming algorithm
//2 dimensional dynamic programming problems are usually used to be solved in a grid format in order to better understand the logical solution
const longestCommonSubsequence = (text1, text2) => {
  let dp;
  if (text2.length > text1.length) {
    dp = new Array(text1.length).fill('');
  } else if (text1.length > text2.length) {
    dp = new Array(text2.length).fill('');
  } else {
    dp = new Array(text1.length).fill('');
  }
  let maxLen = Math.max(text1.length, text2.length);
  let textArray = text1.length === maxLen ? text1 : text2;
  let smallerText = text1.length === maxLen ? text2 : text1;

  // main iteration
  let counter = 0;
  for (let i = 0; i < textArray.length; i++) {
    let smallIndex = 0;
    while (smallIndex < smallerText.length) {
      if (smallerText[smallIndex] === textArray[i]) {
        counter++;
        break;
      }
      smallIndex++;
    }
  }
  return counter;
};

//console.log(longestCommonSubsequence("ezupkr", "ubmrapg"));

// applying a linear dp approach to the problem
// every difference should be strictly alternating between negative and positve numbers
const wiggleMaxLength = (nums) => {
  // making increasing and decreasing dp arrays
  let dpPlus = new Array(nums.length).fill(0);
  dpPlus[0] = 1;
  let dpMinus = new Array(nums.length).fill(0);
  dpMinus[0] = 1;
  // initialising first indexes as one because the first subsequence is always one
  // main iteration to control the increasing and decreasing dps
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dpPlus[i] = dpMinus[i - 1] + 1;
      dpMinus[i] = dpMinus[i - 1];
    }
    if (nums[i] < nums[i - 1]) {
      dpMinus[i] = dpPlus[i - 1] + 1;
      dpPlus[i] = dpPlus[i - 1];
    }
    if (nums[i] === nums[i - 1]) {
      dpMinus[i] = dpMinus[i - 1];
      dpPlus[i] = dpPlus[i - 1];
    }
  }
  return Math.max(Math.max(...dpMinus), Math.max(...dpPlus));
};

//console.log(wiggleMaxLength([3,3,3,2,5]));

// // maximum sum of the array after partitiioning and changing the partition to each max number
// const maxSumAfterPartioning = (arr, k) => {
//     console.log(arr, k);
// }

// console.log(maxSumAfterPartioning([1,15,7,9,2,5,10], 3))

// longest increasin subsequence

const longestIncreasingSubsequence = (nums) => {
  // using dp approach by default length will be one of each element since one element is also a sub
  let dp = new Array(nums.length).fill(1);

  // main iteration
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // if the end point is smaller then skip
      if (nums[j] >= nums[i]) {
        continue;
      }
      // main condition to update dp
      if (nums[j] < nums[i]) {
        let currentIncrease = dp[i];
        // chooses the bigger out of the prefix dp sums
        dp[i] = Math.max(currentIncrease, dp[j] + 1);
      }
    }
  }
  return Math.max(...dpArray);
};

//console.log(longestIncreasingSubsequence([10,9,2,5,3,7,101,18]))

const numLongestIncreasingSubsequence = (nums) => {
  console.log(nums);
  let dpArray = new Array(nums.length).fill(1);
  let countArray = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // check for greatest
      if (nums[j] < nums[i]) {
        dpArray[i] = Math.max(dpArray[i], dpArray[j] + 1);
        console.log(dpArray);
      }
    }
  }
};

//console.log(numLongestIncreasingSubsequence([1,3,5,4,7]))

const isSubsequence = (s, t) => {
  //console.log(s, t);

  // let tIndex = 0;
  // let index = 0;
  // while(index < s.length){
  //     if(tIndex === t.length){
  //         return false
  //     }
  //     if(t[tIndex] === s[index]){
  //         index++;
  //     }
  //     tIndex++;
  // }
  // return true;

  // alternate approach
  let sIndex = 0;
  for (let i = 0; i < t.length; i++) {
    if (s[sIndex] === t[i]) {
      sIndex++;
    }
  }
  if (s.length === sIndex) {
    return true;
  }
  return false;
};

//console.log(isSubsequence("abc", "hagdbgc"))

// finding number of matching subsequence
const numMatchingSubsequence = (s, words) => {
  console.log(s, words);
  // time limit exceeded approach
  // let subCounter = 0;
  // for(let i = 0; i < words.length; i++){
  //     let word = words[i];
  //     let wordIndex = 0;
  //     // check with the main string
  //     for(let j = 0; j < s.length; j++){
  //         if(word[wordIndex] === s[j]){
  //             wordIndex++;
  //         }
  //     }
  //     if(wordIndex === word.length){
  //         subCounter++;
  //     }
  // }
  // return subCounter;

  let subCounter = 0;
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let indexCollection = [];
    let check = false;
    let index = 0;
    for (let j = 0; j < word.length; j++) {
      index = s.indexOf(word[j], index !== -1 && j > 0 ? index + 1 : 0);
      indexCollection.push(index);
    }
    // edge case for single letters
    if (word.length === 1 && indexCollection.length === 1) {
      subCounter++;
    }
    // check for increasing index collection
    for (let k = 1; k < indexCollection.length; k++) {
      if (indexCollection[k - 1] > indexCollection[k]) {
        check = false;
        break;
      } else {
        check = true;
      }
    }
    check && subCounter++;
  }
  return subCounter;
};

// console.log(
//   numMatchingSubsequence('btovxbkumc', [
//     'btovxbku',
//     // 'to',
//     // 'zueoxxxjme',
//     // 'yjkclbkbtl',
//   ])
// );

const countVowelsSubstringsOptimized = (word) => {
  let subCounter = 0;
  let vowelHash = { a: 1, e: 1, i: 1, o: 1, u: 1 };
  let vowelList = 'aeiou';
  const checkVowelSub = (string) => {
    let strArray = string.split('');
    return (
      strArray.includes('a') &&
      strArray.includes('i') &&
      strArray.includes('e') &&
      strArray.includes('o') &&
      strArray.includes('u')
    );
  };
  // getting the substrings and checking for each alphabet
  let collection = [];
  for (let i = 0; i < word.length; i++) {
    for (let j = i; j < word.length; j++) {
      if (vowelHash[word[i]]) {
        const slice = word.slice(i, j + 1);
        collection.push(slice);
      }
    }
  }
  for (let i = 0; i < collection.length; i++) {
    let check = false;
    for (let j = 0; j < collection[i].length; j++) {
      if (vowelList.indexOf(collection[i][j]) !== -1) {
        check = true;
      } else {
        check = false;
        break;
      }
    }
    if (check && checkVowelSub(collection[i])) {
      subCounter++;
    }
  }
  return subCounter;
};

//console.log(countVowelsSubstringsOptimized('cuaieuouac'));

// getting the range of the given target value with the first and the last index
const searchRangeNew = (nums, target) => {
  //console.log(nums);
  let range = [-1, -1];
  let index = nums.indexOf(target);
  range[0] = index;
  let reverse = nums.reverse();
  let lastIndex = reverse.indexOf(target);
  range[1] = nums.length - 1 - lastIndex;
  return range[0] === -1 || range[1] === -1 ? [-1, -1] : range;
};
// answer neeed is [2,5] of target 7
//console.log(searchRangeNew([5, 7, 7, 8, 8, 10], 7));
