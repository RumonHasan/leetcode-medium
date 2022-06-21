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

function verifyBreak (word, dic, start,memo){
    console.log(start);
    if(start === word.length) return true;
    console.log(memo);
    if(memo[start] !== undefined) return memo[start];

    for(let end = start + 1; end <= word.length; end++){
        let wildGuess = word.substring(start, end);

        if(dic.includes(wildGuess) && verifyBreak(word, dic, end, memo)){
            return memo[start] = true;
        }
    }
    return memo[start] = false;
}

console.log(wordBreak("leetcode", ['leet', 'code']))