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


// important of two pass solutions
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
            count > 2 && pointy && floor ? maxLen = Math.max(maxLen, count) : undefined
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
    //[875,884,239,731,723,685]));




// stone game

const stoneGame = (piles)=>{
    let newPiles = piles.sort((a, b)=> a - b);
    let playerCheck = true;
    // players
    let aliceSum = 0;
    let bobSum = 0;
    let aliceTurns = newPiles.length / 2;
    let bobTurns = newPiles.length / 2;

    for(let i = newPiles.length - 1; i >= 0; i--){
        if(playerCheck && aliceTurns !== 0){
            aliceSum += newPiles[i]
            aliceTurns--;
        }
        if(playerCheck === false && bobTurns !== 0){
            bobSum += newPiles[i]
            bobTurns--;
        }
        playerCheck = !playerCheck;
    }
    if(aliceSum > bobSum){
        return true;
    }else{
        return false;
    }
    
    
}

//console.log(stoneGame([5,3,4,5]));


// number of subarrays 

const numberOfSubarrays = (nums, k)=>{
    let newArray = new Array(nums.length).fill('');
    let count = 0;
    let subArrayCount = 0;

    for(let i = 0; i < newArray.length; i++){
        nums[i] % 2=== 0 ? newArray[i] = 0 : newArray[i] = 1;
    }
    // looking for subarrays with atleast k using two pointer approach
    let secondIndex = 0;
    for(let i = 0; i < newArray.length ; i++){
        if(newArray[i] === 1){
            k--;
            count = 0;
        }
        while(k === 0){
            k += newArray[secondIndex];
            secondIndex++;
            count++;
        }
        subArrayCount += count
    }
    return subArrayCount;

}

//console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,1,2], 2));


const numRescueBoats = (people, limit)=>{
    let sortedPeople = people.sort((a, b)=> b - a);
    let boatCounter = 0;
    // two prong approach from both ends
    let index = 0;
    let secondIndex = sortedPeople.length;
    while(index < secondIndex){
        if(sortedPeople[index] === limit){
            boatCounter++;
            index++;
        }else{
            if(sortedPeople[index] < limit){
                const weightCheck = parseInt(sortedPeople[index] + sortedPeople[secondIndex - 1]);
                if(weightCheck === limit || weightCheck < limit){
                    boatCounter++;
                    index++;
                    secondIndex--;
                }else{
                    boatCounter++;
                    index++;
                }
            }
        }
    }
    return boatCounter;
    
}

//console.log(numRescueBoats(
  //  [3,2,2,1]
    //, 3))



const numTeams = (rating)=>{
    let counter = 0;
    // brute force approach
    for(let i = 0; i < rating.length ; i++){
        for(let j = i; j < rating.length ; j++){
            for(let k = j; k < rating.length; k++){
                if(rating[i] > rating[j] && rating[j] > rating[k] ){
                    counter++;
                }
                if(rating[i] < rating[j] && rating[j] < rating[k]){
                    counter++;
                }
            }
        }
    }
    return counter;
}

//console.log(numTeams([2,5,3,4,1]));

// first approach nested
var zeroFilledSubarray = function(nums) {
    let result = 0;
    let index = 0;
    let len  = nums.length;
    let zeroCheck = false;
    let count = 0;
    let array = [];

    // scanning for zero subarrays;
    while(index < len){ 
        // using two pass system for iteration
        if(nums[index] === 0){
            let tempArray = [];
            while(index < len && nums[index] === 0){
                index++;
                count++;
                tempArray.push(count)
                zeroCheck = true;
            }
            array.push(tempArray);
            tempArray = [];
            count = 0;
            zeroCheck = false;
        }else{
            index++
        }
    }
    for(let i = 0; i < array.length; i++){
        const sum = array[i].reduce((a, b)=> a + b);
        result += sum;
    }
    return result;
};

// second approach single O(n);
const zeroFilledSubarrays = (nums)=>{
    let result = 0;
    let index = 0;
    let len  = nums.length;

    // scanning for zero subarrays;
    while(index < len){ 
        // using single pass
        if(nums[index] === 0){
            let tempIndex = index;
            while(index < len && nums[tempIndex] === 0){
                result += (tempIndex - index + 1);
                tempIndex++;
            }
            index = tempIndex;
        }else{
            index++
        }
    }
    return result;
}

//console.log(zeroFilledSubarrays([0,0,0,2,0,0]));

// not done yet
const reorganizingString = (s)=>{
    console.log(s);
    let sHash = {};
    let newArray = new Array(s.length).fill('');
    console.log(newArray);

    for(let i = 0; i < s.length; i++){
        if(sHash[s[i]]){
            sHash[s[i]]++
        }else{
            sHash[s[i]] = 1;
        }
    }
    console.log(sHash);

    for(const [key, value] of Object.entries(sHash)){
        console.log(value);
    }


}

//console.log(reorganizingString(
    //"aab"))


const lengthOfLIS = (nums)=>{
    console.log(nums);
    // using nested approach
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return 1;
    }
    if(nums.every((element)=>element === nums[0])){
        return 1;
    }
    let lenArray = [];

    for(let i = 0; i < nums.length; i++){
        let startingPosiion = nums[i];
        let array = [startingPosiion];
        for(let j = i + 1; j < nums.length; j++){
            if(nums[j] > startingPosiion){
                array.push(nums[j]);
            }else{
                continue;
            }
        }
        lenArray.push(array);
    }
    let maxLen = -Infinity;
    for(let i = 0; i < lenArray.length; i++){
        maxLen = Math.max(maxLen, lenArray[i].length);
    }
    let array;
    for(let index in lenArray){
        if(lenArray[index].length === maxLen){
            array = lenArray[index];
        }
    }
    // extracting the largest subsequence
    console.log(array);
    if(array.length === 1){
        return 1;
    }
    
    for(let i = 0; i < array.length; i++){
       
    }


}

//console.log(lengthOfLIS(
    

  //  [1,3,6,7,9,4,10,5,6]))


  // max distance to closest person;
const maxDistToClosest = (seats)=>{
    let maxDistance = 0;
    let closeLeft = 0;
    let closeRight = 0;
    for(let i = 0; i < seats.length; i++){
        if(seats[i] === 0){
            const leftSide = seats.slice(0, i);
            const rigthSide = seats.slice(i + 1, seats.length + 1);
            // check left
            for(let j = leftSide.length - 1; j >= 0; j--){
                if(leftSide[j] === 0){
                    closeLeft++;
                }else{
                  closeLeft++;
                  break;
                }
            }
            // check rigth
            for(let k = 0; k < rigthSide.length; k++){
                if(rigthSide[k] === 0){
                    closeRight++;
                }else{
                    closeRight++;
                    break;
                }
            }
            if(closeRight === 0){
                maxDistance = Math.max(maxDistance, closeLeft);
            }
            if(closeLeft === 0){
                maxDistance = Math.max(maxDistance, closeRight);
            }

            if(closeLeft > closeRight){
                maxDistance = Math.max(maxDistance, closeRight);
            }else{
                maxDistance = Math.max(maxDistance, closeLeft);
            }
        }
        closeLeft = 0;
        closeRight = 0;
    }
    return maxDistance;
}

//console.log(maxDistToClosest(
  //  [0,1]));



// find the longest word that can be formed

const findLongestWord = (s, dictionary)=>{
    // egde case for single letters
    if(dictionary.every((element)=> element.length === 1)){
        dictionary.sort();
        return dictionary[0];
    }
    // check subsequence
    const checkSubsequence = (word, string)=>{
        if(word.length > s.length) return false;
        let position = 0;
        for(let i = 0; i < word.length; i++){
            position = string.indexOf(word[i], position); // checking whether position is present or not
            if(position === -1){ // if any of the index is not present;
                return false;
            }
            position+= 1;// checking from the next position
        }
        return true;
    }
    let answerWord = '';
    for(let i = 0; i < dictionary.length; i++){
        const word = dictionary[i];
        if(checkSubsequence(word, s)){ // checking for substring .. if it is true then it activates check
            // check length
            if(word.length > answerWord.length){
                answerWord = word;
            }else if(word.length === answerWord.length){
               const compareResult = word.localeCompare(answerWord);
               if(compareResult < 0) answerWord = word;
            }
       }
    }
    return answerWord

}
//console.log(findLongestWord("abpcplea",
//["ale","apple","monkey","plea"]));


// finding the longest word in a dictionary

const longestWord = (words)=>{
    let sortedWords = words.sort();
    const getPrefix = (word)=>{
        // extract all the prefix
        let prefixArray = [];
        let prefix = '';
        for(let i = 0; i < word.length; i++){
            if(i !== word.length - 1){
                prefix += word[i];
                prefixArray.push(prefix);
            }
        }
        return prefixArray;
    }
    let resultWord = '';
    for(let i = 0; i < sortedWords.length; i++){
        const word = sortedWords[i];
        let prefixSet = getPrefix(word);

        // checking the prefix set
        if(prefixSet.every((singleSet)=> sortedWords.includes(singleSet))){
            if(word.length > resultWord.length){
                resultWord = word;
            }else if(word.length === resultWord.length){
                const compare = word.localeCompare(resultWord);
                if(compare < 0){
                    resultWord = word;
                }
            }
        }
    }

   return resultWord;
}

//console.log(longestWord(["a","banana","app","appl","ap","apply","apple"]));

const findMaxLength = (nums)=>{
    var hash = {0:-1};
    var count = 0;
    var max = 0;
    for (var i=0;i<nums.length;i++) {
        if (nums[i] === 0) count--;
        else count++;

        if (hash[count]!= null){
            max = Math.max(max, i - hash[count]);
            } 
         else{
            hash[count] = i 
         } 
    }
    return max;
}


//console.log(findMaxLength([0,1,0,1,0]))



// people indexes in order to find common subsets of people working in various companies
const peopleIndexes = (favoriteCompanies)=>{
    console.log(favoriteCompanies);
    let indexHash = [];
    let finalIndexArray = [];
    for(let index in favoriteCompanies){
        indexHash.push(new Set(favoriteCompanies[index]));
    }
    // checking hashSet presences
    const checkThisShitSet = (primarySet, checkSet)=>{
        if(primarySet.size > checkSet.size){
            console.log(checkSet);
            const checkSetArray = Array.from(checkSet);
            if(checkSetArray.every((checkEl)=> primarySet.has(checkEl))){
                return 1;
            }
        }
    }
    // nested approach
    for(let i = 0; i < indexHash.length; i++){
        let flag = 1;;
        for(let j = 0; j < indexHash.length; j++){
            if(i !== j){
                if(checkThisShitSet(indexHash[j], indexHash[i]) === 1){
                    // if it does contain then it breaks and continues with the next set relations
                    flag = 0;
                    break;
                }
            }
            
        }
        flag === 1 && finalIndexArray.push(i);
       
    }
 
    return finalIndexArray;

}

//console.log(peopleIndexes([["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]));



// returning the longest len of the substring containing same letters after the changes made in k times
const characterReplacement = (s, k)=>{
    console.log(s, k);
    let left = 0;
    let right = 0;
    let maxCharCount = 0;
    const visited = {};

    while(right < s.length){
        const char = s[right];
        visited[char] = visited[char] ? visited[char]+= 1 : visited[char] = 1;
        if(visited[char] > maxCharCount){
            maxCharCount = visited[char];
        }
        const rightLeft = right - left + 1;
        console.log(visited, maxCharCount, rightLeft);
        if(rightLeft - maxCharCount > k){
            left++;
            visited[s[left]]--;
        }
        right++;
    }
    
    return right - left;
  
}

//console.log(characterReplacement("ABABA", 2));


// asteroid collision 

const asteroidCollision = (asteroids) =>{
    const astroStack = [];
    for(let i = 0; i < asteroids.length; i++){
        // our asteroid
        let asteroid = asteroids[i];
        // check collision
        let checkCollision = false;
        // check collision
        while(astroStack[astroStack.length - 1] > 0 && asteroid < 0){
            checkCollision = true;
            let absRoid = Math.abs(asteroid);
            let absStack = Math.abs(astroStack[astroStack.length - 1]);
            // checks
            if(absRoid === absStack){
                astroStack.pop();
                break;
            }else if(absStack < absRoid){
                astroStack.pop();
                checkCollision = false;
                // note if it is the last remaining element then gets out
            }else if(absStack > absRoid){
                // we continue cuz stack has the bigger balls
                break;
            }
        }
        // no collision then keep adding
        !checkCollision && astroStack.push(asteroid);
    }
    return astroStack
};

//console.log(asteroidCollision([10,2,-5]))


// key is to find the next greatest elements but in a circular fashion if there is none present
const nextGreaterElements = (nums)=>{
    const stack = new Array(nums.length).fill(-1);
    const len = nums.length;
    let index = 0;
    let recircleState = false;

    // checking for the next greates element
    while(index < len){
        // main arrays to traverse through for next biggest
        const currentElement = nums[index];
        const prevElements = nums.slice(0, index + 1);
        const nextElements = nums.slice(index + 1, nums.length).length === 0 ? [currentElement] : nums.slice(index + 1, nums.length);

        // checking the first set of elements in order to check the first availability 
        if(!recircleState){
            for(let i = 0; i < nextElements.length; i++){
                if(nextElements[i] > currentElement){
                    stack[index] = nextElements[i];
                    break;
                }
                if(i === nextElements.length - 1){
                    recircleState = true;
                }
            }
        }
        if(recircleState){
            for(let i = 0; i < prevElements.length; i++){
                if(prevElements[i] > currentElement){
                    stack[index] = prevElements[i];
                    recircleState = false;
                    break;
                }
                if(i === prevElements.length - 1){
                    recircleState = false;
                }
            }
        }

        index++;
    }
    return stack;
}
//console.log(nextGreaterElements([3,1,0,1]));

// expected answer: [2,3,4,-1,4]
// the last number three does not have a next greater number but in a circular pattern the greatest comes back to 4
// if cannot locate the next greatest element then go in a circular pattern once more


const maxProduct = words =>{
    let maxLength = 0;
    const checkWord = (mainWord, checkWord)=>{
        let mainWordSet = new Set([...mainWord]);
        let checkWordArray = checkWord.split('');
        if(checkWordArray.every((letter)=> !mainWordSet.has(letter))){
            return true;
        }
    }
    for(let i = 0; i < words.length; i++){
        let mainWord = words[i];
        for(let j = i + 1; j < words.length; j++){
                if(checkWord(mainWord, words[j])){
                    maxLength = Math.max(mainWord.length * words[j].length, maxLength);
                }
        }
    }
    return maxLength;
}

//console.log(maxProduct(["vfa","xtlz","efvep","qax","xttqeqhdzda","dotpkwl","vzexpeg","lnwcc","tz","oddqwzk","qpo","wa","gahbx","dxmffnv","pwcawa","gp","bmfomiyep","pqlbfol","yvkxl","mewwmixa","adbqqe","ihdeoawnpo","sreiw","ohppahwicoq","wgw","zrjow","qwqebael","rlkrx","njraonrxx","cmkdzas","ctcrryvpyc","kcsbd","uvmjcmelngg","rznp","hezmqrsdoe","doxsmfh","sxbpdfio","bg","fwjgmgjez","pskvtosefsx","gcj","xv","rcoabdx","zsgag","uohvz","dsmffq","nbbtm","ercccjym","iagqmyauqun","czwexke","unig","iyczgxmakc","qgnjfqai","qbatxtev","qpp","jp","bg","ek","jbele","oepzeekydf","xfncmi","dyr","htnbkxtaxo","hvglb","iao","sgqw","vwnmvcjtu","tc","ylyn","wzibe","ywzemkxnds","bapdoxed","fuosanrps","iqnidqfprif","ibeweskp","vdoofj","ybnwnqtyx","jbzuipwr","vjtfp","ihgunpppa","hohpqb","upjtrljrg","pgh","av","cglwgcpac","tznomaqzd","kxigufgqhqp","wt","iyahn","vnmjndkd","dde","uztuzssitar","wvd","svr","cy","gtvh","hefltcdldzj","itrd","egszngv","pxr"]));


// setting the matrix columns and rows into zero
const setZeroes = (matrix)=>{
    let colSet = new Set();
    let rowSet = new Set();
    for(let i = 0 ; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] === 0){
                colSet.add(j);
                rowSet.add(i);
            }
        }
    }
    // col and row set
    let rowLen = matrix[0].length;
    let colLen = matrix.length;
    for(let col of colSet){
        for(let j = 0; j < colLen; j++){
            matrix[j][col] = 0;
        }
    }
    for(let row of rowSet){
        for(let i = 0; i < rowLen; i++){
            matrix[row][i] = 0
        }
    }
    return matrix;
}

//console.log(setZeroes([[1,1,1],[1,0,1],[1,1,1]]));


// note: remember left max bound can be the left amount.. and the rightmost amount cannot exceed 
// the right most bound... therefore using the sliding technique and shifting the starting index when it hits the highest right bound
const numSubarrayBoundedMax = (nums, left, right)=>{
    console.log(nums, left, right);
    let end = -1;
    let start = -1;
    // initialising negative to including additional el for subarray
    let finalLength = 0;
    let index = 0;
    while(index < nums.length){
        // once it hits the max on the right side... reset the pointers to the index of the external range element
        if(nums[index] > right){
           end = index;
           start = index;
        }else{
            if(nums[index] >= left && nums[index] <= right){ 
                end = index;
            }
        }
        console.log(end, start);
        finalLength += Math.abs(end - start);
        index++;
        
    }
    return finalLength;
}
//console.log(numSubarrayBoundedMax(
  //  [2,3,4,3], 2, 3));



// return total subarrays whose subarrays equal to k

const subArraySum = (nums, k)=>{
    let map = {};

    let output = 0;
    let sum = 0;

    map[0] = 1;

    for(const num of nums){
        sum += num;

        const prefix = sum - k;

        if(map[prefix]){
            output += map[prefix];
        }
        if(!map[sum]){
            map[sum] = 1;
        }else{
            map[sum]++;
        }
    }
    
    return output;
  
}

//console.log(subArraySum(
  //  [1,2,3], 3));


const maxProductSubarray = (nums)=>{
    console.log(nums);
    // trick is to get both the maximum and minimum for the pairs of products of the number to avoid negative number issue.
    let result = Math.max(...nums);
    let currentMin = 1;
    let currentMax = 1;
    let temp = 1;
    for(let num of nums){
        if (num === 0){
            currentMax = currentMin = 1;
            continue;
        }else{
            temp = currentMax * num;
            currentMax = Math.max(temp, num * currentMin, num);
            currentMin = Math.min(temp, num * currentMin, num);
            result = Math.max(currentMax, result);
        }
    }
    return result;
}

//console.log(maxProductSubarray([2,3,4,-2,0,4,40]));

// getting the min length

const minSubarrayLen = (target, nums)=>{
    let sum = 0;
    let start = 0;
    let minLen = Infinity;
    // initial check
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];
        while(sum >= target){
            sum -= nums[start];
            let windowReduce = (i + 1) - start;
            start++;
            minLen = Math.min(minLen, windowReduce);
        }
    }
    return minLen === Infinity ? 0 : minLen;
}

//console.log(minSubarrayLen(
 //   15,
//[5,1,3,5,10,7,4,9,2,8]));


// longest ones after flipping for K zeroes

const longestOnes = (nums, k)=>{
    //console.log(nums, k);
    let maxLen = -Infinity;
    let start = 0;
    let zeroCount = 0;
    for(let end = 0; end < nums.length; end++){
        // counting till reaching K
       if(nums[end] === 0){
            zeroCount++;
       }
       // checking while sum is bigger than k
       while(zeroCount > k){
        // reduces the zero till it hits same level of zero count as K
            if(nums[start] === 0){
                zeroCount--;
            }
            // increase the start index to start from the beginning of the zero indexes in the array
            start++;
       }
       let differenceLen = (end + 1) - start;
       maxLen = Math.max(differenceLen, maxLen)
    }
    return maxLen;

}
//console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2));


const numSubarrayProductLessThanK = (nums, k)=>{
    console.log(nums, k);
    let product = 1;
    let start = 0;
    let count = 0;
    // using sliding window technique
    for(let end = 0; end < nums.length; end++){
        product = product * nums[end];

        while(product >= k){
            // dividing subarray in order to reduce the window and increase the count;
            product = product / nums[start];
            start++;
        }
        let subLength = (end - start) + 1;
        count = count + subLength;

    }
    return count < 0 ? 0 : count;

}

//console.log(numSubarrayProductLessThanK([10,5,2,6], 100));

const longestSubarray = (nums)=>{
    console.log(nums);
    let countMaxOnes = 0;
    if(nums.every((el)=> el === 0)){
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
    for(let end = 0; end < nums.length; end++){
        if(nums[end] === 0){
            zeroCount++;
        }
        while(zeroCount > maxZeroCount){
            if(nums[start] === 0){
                zeroCount--;
            }
            start++;
        }
        countMaxOnes = Math.max(countMaxOnes, (end - start));
        
    }
    return countMaxOnes;

}

//console.log(longestSubarray([1,1,1,0,1,1,0,1]));

// need to find maxOccurence of substrings
const maxFreq = (s, maxLetters, minSize, maxSize)=>{
    let stringMap = new Map();
    for(let i = 0; i < s.length; i++){
        for(let j = i; j < s.length; j++){
            // limiting the substring options
            if(Math.abs(j - i) >= minSize - 1 && Math.abs(j - i) <= maxSize - 1  ){
                const substring = s.slice(i, j + 1);
                if(stringMap.has(substring)){
                    stringMap.set(substring, stringMap.get(substring) + 1);
                }else{
                    stringMap.set(substring, 1);
                }
            }else{
                continue;
            }
        }
    }
       // checking for unique letters for collective occurences
       const checkRepeat = (word)=>{
        let hash = {};
        for(let i = 0; i < word.length; i++){
            hash[word[i]] ? hash[word[i]]++ : hash[word[i]] = 1;
        }
        let keysLen = Object.keys(hash);
        if(keysLen.length <= maxLetters){
            return true;
        }
        return false;
    }
    // filtering the map;
    let count = 0;
    for(let [key, value] of stringMap){
        if(checkRepeat(key)){
            if(count < value){
                count = value;
            }
        }
    }
    return count;
}
//console.log(maxFreq("fjkhekdgbiegfjhdklhglcdfdemmamgihhcflkibgalfbghelbaijbemdhjaimbmmhlkfmgefafjfbmjcabghjffagefdkkcdkhkiklhafdfbcfhblljledcdbmcjiggibijbjeaemamfhgbkmgfmbhmgbeclikcajghdlmhfblbmlbbmebkdldeadekebjjljlehkjfaehjhimhjhgjefbgcigkbccfhehehlaaemghjajibdghillfhchjlelmmgahheigmlgiakfkikmbjjidmiahhmaagkegfljjedclbhbjclaieedcalhdfamgagciekhikbmhakjjbjccalbhedcjidmkkdgchmbikhcjaldellhmagblagbhmmkflcgclcdfkijglbmeimlmdjbjjijiejkbhlgjhfklfdmhgglmflbcajblibldlfakdkgjdjmiafbkfifahjbdblckdhmhjdmeahchffkelikfehldmdhhgackdlhdjgkackckfedkahjelajheaaemaekkhckhadaeadeekafaclbjjhdfdbieghmagmgfemcfjjdadejefelahejijlmgdegijihjfceciaagcimbfbmlccigdaealbecfagegkafbadfchekfjcfcigllfceheeihiaaemcgfmbeidcdkmbgckmkdgembafeheeeghakicbfdkkiificiafffjckedceblmhiekcdleihkahelhhbddidgibbifjjhcegkacjmdelkiaefdglfajhfbfemcbcgkaiebjleafblclidaagadcdjadkfdahgaldjkkmadjhbgmmbaelajeegbgghfgllbfdhdjcdmbciklliceemgcfimfklghlfikigcgachkjeaejeaihlmhbjcejlkhckimieggallbcibmdjibijhfceekamcmcmhicajlhkgaglgbeaebgfgggdemilbjcehdcmjkgfjjli", 6, 20, 26));

const validStackSequences = (pushed, popped)=>{
    const stack = [];
    let pushIndex = 0;
    let popIndex = 0;
    while(pushIndex < pushed.length || popIndex < popped.length){
        if(stack[stack.length - 1] === popped[popIndex]){
            stack.pop();
            popIndex++;
        }else{
            if(pushIndex > pushed.length - 1){
                return false;
            }
            stack.push(pushed[pushIndex]);
            pushIndex++;
        }
    }
    if(stack.length === 0 || undefined){
        return true;
    }else{
        return false;
    }
}

//console.log(validStackSequences([1,2,3,4,5], [4,5,3,2,1]));

const minimumTotal = (triangle)=>{
    const newTriangle = [];
    // fill new triangle
    for(let i = 0; i < triangle.length; i++){
        let singleRow = triangle[i];
        let newTriangleRow = new Array(singleRow.length).fill(0);
        newTriangle.push(newTriangleRow);
    }
    // adding the initial starting point 
    newTriangle[0] = triangle[0]; // adding the first row
    // main loop
    for(let row = 1; row < triangle.length; row++){
        let singleRowLen = triangle[row].length
        for(let col = 0; col < singleRowLen; col++){
            let lastColIndex = triangle[row].length - 1;
            // first element in every row
            if(col === 0){
                newTriangle[row][0] = newTriangle[row - 1][0] + triangle[row][0];
            }else if(col === lastColIndex){
                if(col === 1){
                    newTriangle[row][lastColIndex] = newTriangle[row - 1][0] + triangle[row][lastColIndex]
                }else{
                    let prevRowEndValue = newTriangle[row - 1].length - 1
                    newTriangle[row][lastColIndex] = newTriangle[row - 1][prevRowEndValue] + triangle[row][lastColIndex];
                }
            }else{
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
    }
//console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]))











































































