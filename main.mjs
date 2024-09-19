import gameData from './gameData.json' assert{type: 'json'}
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]; //generates a random element (index) from an array
let isSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
let o2 = 100
let days = 10

//Object.keys(gameData.planets).forEach(key => console.log(key, gameData.planets[key]))

function activateTest(testType){
    const didSucceed = isSuccessful(gameData.tests[testType].successRate)? 'success' : 'failure' //determines if test was successful
    const result = randomElement(gameData.tests[testType][didSucceed]); //gets a random response from the array of results
    console.log(result);
}

activateTest('test4'); //nigga

setInterval(() => {
    console.log(`O2% left: ${--o2}`)
},(2000)); //countdown oxygen

setInterval(() => {
    console.log(`Days left: ${--days}`)
},(3000)); //countdown days left

//this change was meant to be as a test for commit #TEST 3