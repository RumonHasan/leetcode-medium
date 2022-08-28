// returning the first and last index of the target
const searchRange = (nums, target)=>{
    let targetFirst = -1; // default value as -1
    let indexes = [];
    for(let i = 0; i < nums.length; i++){
        if(nums[i] === target && targetFirst === -1){
            targetFirst = i;
            // edge case for singe number array
            if(i === nums.length - 1){
                indexes = [targetFirst, targetFirst];
            }
        }else{
            //edge case for array with all same values
            if(i === nums.length - 1 && targetFirst !== -1){
                indexes = [targetFirst, i];
            }
            // edge case for finding the first and last if there is a bigger elemen
            if(nums[i] > target && targetFirst !== -1){
                return [targetFirst, i - 1];
            }
        }
    }
    return targetFirst === -1 ? [-1, -1]: indexes
}



//console.log(searchRange([1,4], 4));

const wordBreak = (s, wordDict)=>{
    return verifyBreak (s, wordDict, 0,[]);
}
// using recursion to create subsections and check whether each segment is available or not
function verifyBreak (word, dic, start,memo){
    if(start === word.length) return true;
    if(memo[start] !== undefined) return memo[start];

    for(let end = start + 1; end <= word.length; end++){
        let wildGuess = word.substring(start, end);
        if(dic.includes(wildGuess) && verifyBreak(word, dic, end, memo)){
            return memo[start] = true;
        }
    }
    return memo[start] = false;
}

//console.log(wordBreak("letscheckthis", ['leet', 'code']))


// palindromic partitiion
const isPalindrome = (s, start, end)=>{
    while(start < end){
        if(s[start] !== s[end]) return false;
        start++;
        end--;
    }
    return true;
}


// partition palindrome using dfs
const partition = (s)=>{
   const partitionArray = [];
   // dfs recursive helper
   const dfs = (index, s, slate) => {
    // base case
    if(index === s.length){
        partitionArray.push(slate.slice());
        return;
    }
    // dfs recursive case
    for(let j = index; j < s.length; j++){
        if(isPalindrome(s, index, j)){
            console.log(index, j);
            let substring = s.slice(index, j + 1);
            console.log(substring);
            slate.push(substring);
            dfs(j + 1, s, slate);
            console.log(slate);
            slate.pop()
        }
    }
   }
   dfs(0, s, []);
   return partitionArray;
}

//console.log(partition("aab"))

const combinationSum = (candidates, target)=>{
    console.log(candidates);
    let finalArray = [];
    const sortedCandidates = candidates.sort((a, b)=> a - b);

    const backtracking = (index, target, stack)=>{
        if(index === candidates.length){
            finalArray.push(stack.slice());
        }
        for(let j = index; j < sortedCandidates.length; j++ ){
            let subArray = sortedCandidates.slice(index, j + 1);
            console.log(subArray);
        }
    }

    backtracking(0, target, []);

    return finalArray;
}
//console.log(combinationSum([2,3,6,7], 7));



// leetcode 151: Reverse Words in a string

const reverseWords = (s)=>{
    const sArray = s.split(' ');
    let finalString = '';
    let tempStack = [];
    let revStack = [];

    for(let i = 0; i < sArray.length; i++){
        if(sArray[i] !== ''){
            tempStack.push(sArray[i]);
        }
    }
    for(let i = tempStack.length - 1; i >= 0; i--){
        revStack.push(tempStack[i]);
    }
    for(let i = 0; i < revStack.length; i++){
        finalString += revStack[i] + ' ';
    }
    return finalString.slice(0, -1);

}

//console.log(reverseWords("a good   example"));

// return the single number that has only like one occurence
const singleNumberII = (nums)=>{
    console.log(nums);
    let hash = {};
    for(let i = 0; i < nums.length; i++){
        hash[nums[i]] ? hash[nums[i]]++ : hash[nums[i]] = 1;
    }
    for(const [key, value] of Object.entries(hash)){
        if(value === 1){
            return parseFloat(key);
        }
    }
};

//console.log(singleNumberII([2,2,3,2]));

const majorityElementII = (nums)=>{
    const occurenceLimit = Math.floor(nums.length / 3);
    let finalArray = [];

    let hash = {};
    for(let i = 0; i < nums.length; i++){
        hash[nums[i]] ? hash[nums[i]]++ : hash[nums[i]] = 1;
    }
    for(const[key, value] of Object.entries(hash)){
        if(value > occurenceLimit){
            finalArray.push(parseFloat(key));
        }
    }
    return finalArray;
}

//console.log(majorityElementII([3,2,3]))



// leetcode 390 elimination game
const lastRemaining = (n)=>{
    let initialArray = [];
    for(let i = 1; i <= n; i++){
        initialArray.push(i);
    }
    console.log(initialArray);
}

//console.log(lastRemaining(9))



// find peak elements where it is strictly greater than its neighbors

const findPeakElement = (nums)=>{
    const dummyElement = -Infinity;
    let maxElement = -Infinity;
    let index = 0;

    for(let i = 0; i < nums.length; i++){
        const currentElement = nums[i];
        const prevElement = i === 0 ? dummyElement : nums[i - 1];
        const nextElement = i === nums.length - 1 ? dummyElement : nums[i + 1];

        // checking peak element
        if(currentElement > prevElement && currentElement > nextElement){
            maxElement = Math.max(currentElement, maxElement);
            index = nums.indexOf(maxElement);
        }
    }
    return index;

}

//console.log(findPeakElement(
   // [-2147483648,-2147483647]));


// need to find the longest consequtive elements length
const longestConsequtive = (nums)=>{
    if(nums.length === 1){
        return 1;
    }
    if(nums.length === 0 || undefined){
        return 0;
    }
    let index = 0;
    let sortedNums = nums.sort((a, b)=> a - b);
    const difference = 1;
    let conArray = [];
    let secondIndex = 1;
    let maxLength = -Infinity;
    while(index < sortedNums.length){
        if(sortedNums[secondIndex] - sortedNums[index] === difference){
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
    for(let i = 0; i < filteredArray.length; i++){
        if((filteredArray[i + 1] - filteredArray[i]) === difference){
            segment.push(filteredArray[i]);
            segment.push(filteredArray[i + 1]);
        }else{
            collection.push(segment);
            segment = [];
        }
    }
    // getting the largest collection from the sets
    for(let i = 0; i < collection.length; i++){
        let array = Array.from(new Set([...collection[i]]));
        maxLength = Math.max(maxLength, array.length);
    }
    return maxLength === -Infinity ? 1: maxLength;
}

//console.log(longestConsequtive(
  //  [9,1,4,7,3,-1,0,5,8,-1,6]))



// product of self

const findDuplicate = (nums)=>{
   let hash = {};
   for(let index in nums){
        hash[nums[index]] ? hash[nums[index]]++ : hash[nums[index]] = 1;
   }
   for(const [key, value] of Object.entries(hash)){
    if(value >= 2){
        return parseInt(key);
    }
   }
}

//console.log(findDuplicate([2,2,2,2,2]))


const singleNumber = (nums)=>{
    console.log(nums);
    let array = [];
    let hash = {};

    for(let i = 0; i < nums.length; i++){
        if(hash[nums[i]]){
            hash[nums[i]]++;
        }else{
            hash[nums[i]] = 1;
        }
    }
    for(const [key, value] of Object.entries(hash)){
        if(value === 1){
            array.push(parseInt(key));
        }
    }
    return array;
}

//console.log(singleNumber([1,2,1,3,2,5]));


// find final triangular sum of the array 

const triangleSum = (nums)=>{
    if(nums.length === 1){
        return nums[0];
    }
    let array = [];
    for(let i = 0; i < nums.length; i++){
        let triangleSumVal = 0;
        if(nums[i + 1] === undefined){
            break;
        }
        triangleSumVal = (nums[i] + nums[i + 1]) % 10;
        array.push(triangleSumVal);
    }
    if(array.length !== 1){
        return triangleSum(array);
    }else{
        return array[0];
    }
}

//console.log(triangleSum([1,2,3,4,5]));


// medium water

const maxArea = (height)=>{
    console.log(height);
    let index = 0;
    let secondIndex = height.length - 1;
    let maxAmount = 0;
    let waterStore = -Infinity;
    
    while(index < secondIndex){
        if(height[index] < height[secondIndex]){
            maxAmount = height[index] * (secondIndex - index);
            index++;
        }else{
            maxAmount = height[secondIndex] * (secondIndex - index);
            secondIndex--;
        } 
       waterStore = Math.max(maxAmount, waterStore);
    }
    return waterStore;

}

//console.log(maxArea([1,8,6,2,5,4,8,3,7]));


// checking the total number of collisions leetcode 2211
const countCollisions = (directions)=>{
    // hint code from online... no personal solutions found yet
    const directionsArray = directions.split('');
    let numberOfCollisions = 0;
    console.log(directionsArray);
    // right side
    let start;
    for(start = 0; start < directionsArray.length; start++){
       if(directionsArray[start] !== 'L'){
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
}

//console.log(countCollisions("LLRSLL"));


// find 
const numberOfArithmeticSlices = (nums)=>{
    console.log('array',nums);
    // current difference
    let difference = 0;
    let count = 0;// elements with curr difference
    let total = 0;// subarray count;
    for(let i = 0; i < nums.length; i++){
        const num = nums[i];
        // prev number
        const prev = nums[i - 1] === undefined ? -Infinity : nums[i - 1];

        // current diff
        const currentDiff = Math.abs(num - prev);

        if(currentDiff === difference){
            console.log(num, prev);
            count += 1;
            console.log(count);
            total += count - 2;
        }else{
            difference = currentDiff;
            count = 2;
        }

    }
    //console.log('total', total);
}

//console.log(numberOfArithmeticSlices([1,2,3,4,5,7]));


// finding the pivot and creating the array
const pivotArray = (nums, pivot)=>{
    console.log(nums, pivot);
    let lower = [];
    let upper = [];
    let same = [];

    for(let i = 0; i < nums.length; i++){
        if(nums[i] < pivot){
            lower.push(nums[i]);
        }else if(nums[i] > pivot){
            upper.push(nums[i]);
        }else{
            same.push(nums[i]);
        }
    }
    return [...lower, ...same, ...upper];
}

//console.log(pivotArray([9,12,5,10,14,3,10],10));


// minimum number of steps to make anagrams

const minSteps = (s, t)=>{
    let sHash = {};
    let tHash = {};
    let minSteps = 0;
    for(let i = 0; i < s.length; i++){
        sHash[s[i]] ? sHash[s[i]]++ : sHash[s[i]] = 1;
    }
    for(let i = 0; i < t.length; i++){
        tHash[t[i]] ? tHash[t[i]]++ : tHash[t[i]] = 1;
    }
    
    // for the letters that are not present and double
    for(let i = 0; i < s.length; i++){
        if(tHash[s[i]]){
            tHash[s[i]]--;
        }
    }
    for(let i = 0; i < t.length; i++){
        if(sHash[t[i]]){
            sHash[t[i]]--;
        }
    }
    for(let [_, value] of Object.entries(sHash)){
        if(value !== 0){
            minSteps += value;
        }
    }
    for(let [_, value] of Object.entries(tHash)){
        if(value !== 0){
            minSteps += value;
        }
    }
    return minSteps;
}

//console.log(minSteps("leetcode","coats"));

// to be continued
const spiralOrder = (matrix)=>{
    console.log(matrix);
    // spiral parts
   let spiralParts = [];
  
   // corners
   let rowFirst = 0;
   let lastRow = matrix.length - 1;
   let colFirst = 0;
   let lastCol = matrix[0].length - 1;

   while(rowFirst <= lastRow && colFirst <= lastCol){
        // first row
        for(let i = colFirst; i <= lastCol; i++){
            spiralParts.push(matrix[rowFirst][i]);
        }
        rowFirst++;
        // first col 
        for(let i = rowFirst; i <= lastRow; i++){
            console.log(rowFirst);
            spiralParts.push(matrix[i][lastCol]);
        }
        lastCol--;
        for(let i = lastCol; i >= colFirst; i--){
            spiralParts.push(matrix[lastRow][i]);
        }
        lastRow--;
        for(let i = lastRow; i >= rowFirst; i--){
            spiralParts.push(matrix[i][colFirst]);
        } ;
        colFirst++;
   }

   return spiralParts;
}

//console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]));


// 0 - red, 1 - white, 2 - blue

const sortColors = (nums)=>{
    let hash = {};
    let finalStack = [];
    for(let index in nums){
        hash[nums[index]] ? hash[nums[index]]++ : hash[nums[index]] = 1;
    }
    const fillArray = (key,value)=>{
        let counter = 0;
        while(counter !== value){
            finalStack.push(parseInt(key));
            counter++;
        }
    }
    for(const [key, value] of Object.entries(hash)){
        fillArray(key, value);
    }
    for(let i = 0; i < nums.length; i++){
        nums[i] = finalStack[i];
    }
    return nums;
}

//console.log(sortColors([2,0,2,1,1,0]));


const groupAnagrams = (strs)=>{
    let groups = [];
    let wordMap = new Map();
    
    for(let i = 0; i < strs.length; i++){
        let word = strs[i].split('').sort().join('');
        // remember the map has key and value pairs and a map cannot contain duplicate keys
        if(!wordMap.has(word)){
            wordMap.set(word, [strs[i]]);
        }else{
            wordMap.get(word).push(strs[i]);
        }
    }
    // iterating through map in js to find the elements
    wordMap.forEach((key, value)=>{
        groups.push(key);
    })

    return groups;
}
//console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))


// find an array of duplicates
const findDuplicates = (nums)=>{
    let array = nums.sort((a, b)=> a - b);
    let finalNums = [];
    let hash = {};
    for(let index in nums){
        if(hash[nums[index]]){
            hash[nums[index]]++;
        }else{
            hash[nums[index]] = 1;
        }
    }
    for(const [key, value] of Object.entries(hash)){
        if(value === 2){
            finalNums.push(parseInt(key));
        }
    }
    return finalNums;
}

//console.log(findDuplicates([4,3,2,7,8,2,3,1]))


// increasing subsequence 

const findSubsequences = (nums)=>{
    console.log(nums);
    const stack = [];

    for(let i = 0; i < nums.length; i++){
        for(let j = 1; j < nums.length; j++){
            if(nums[i] < nums[j] || nums[i] === nums[j]){
                const array = [nums[i], nums[j]];
                console.log(array);
            }
        }
    }

    return stack;
}

//console.log(findSubsequences([4,6,7,7]));

// returning the longest subarray mountain

const longestMountain = (arr)=>{
    // edge case
    if(arr.length < 3){
        return 0;
    }
    // variables
    let maxLen = 0;
    let index = 0;
    let pointy = false;
    let floor = false;

    while(index < arr.length){
        let count = 1; // starting from 1 cuz of two number comparison
        // checking for increasing peak starting point
        if(arr[index] < arr[index + 1]){
            // mountain increase check
            while(index < arr.length - 1 && arr[index] < arr[index + 1]){
                index++;
                count++;
                pointy = true;
            }
            //mountain drop check
            while(index < arr.length - 1 && arr[index] > arr[index + 1]){
                index++;
                count++;
                floor = true;
            }
            // checking for next increase
            if(count > 2 && pointy && floor){
                maxLen = Math.max(maxLen, count);
            }
            // resetting the vals for next mountain and peak
            pointy = false;
            floor = false;
        }else{
            index++; // iteration for skipping the initial drops till we find the first mountain
            // index from the else statement cuz we want to increment till we find next peak
        }
    }
    return maxLen;
}

//console.log(longestMountain(
  //  [875,884,239,731,723,685]))














