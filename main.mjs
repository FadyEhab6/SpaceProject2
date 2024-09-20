import gameData from './gameData.json' assert{type: 'json'}

let currentPlanet = "Planet1"   //Planet 1 is a placeholder for the text that comes from each planet button
let o2 = 100, days = 10, logs = []

const RandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]; //generates a random element (index) from an array
let IsSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
function Log(message){
    logs.push(message)
}
function ReadLog(){
    logs.forEach(log => console.log(log + '\n'))
}
async function activateTest(testType){
    const didSucceed = IsSuccessful(gameData.tests[testType].successRate)? 'success' : 'failure' //determines if test was successful
    const result = RandomElement(gameData.tests[testType][didSucceed]); //gets a random response from the array of results
    Log(result) 
    ReadLog() 
} 

function planetTester(currentPlanet){
    let test = "test1"       //Test 1 is a placeholder for the text that comes from each test button
    activateTest(test)
} 
function SwitchPlanet(planet){ //called from html button
    currentPlanet = planet
}
planetTester(currentPlanet)
//activateTest('test4'); 

// setInterval(() => {
//     console.log(`O2% left: ${--o2}`)
// },(2000)); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left

