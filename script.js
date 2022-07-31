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



