import gameData from './gameData.json' assert{type: 'json'}
import fs from 'fs'
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]; //generates a random element (index) from an array
let isSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
let o2 = 100
let days = 10

//Object.keys(gameData.planets).forEach(key => console.log(key, gameData.planets[key]))
function log(response){
    const filePath = 'SpaceProject2/log.txt'
    fs.appendFile(filePath, `[${currentPlanet}]: ${response}\n` ,(err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File saved at:', filePath)
    })
}

function activateTest(testType){
    const didSucceed = isSuccessful(gameData.tests[testType].successRate)? 'success' : 'failure' //determines if test was successful
    const result = randomElement(gameData.tests[testType][didSucceed]); //gets a random response from the array of results
    log(result)
    log(result)
}

let currentPlanet = "Planet1"   //Planet 1 is a placeholder for the text that comes from each planet button

function planetTester(currentPlanet){
    let test = "test1"       //Test 1 is a placeholder for the text that comes from each test button
    activateTest(test)
}

planetTester(currentPlanet)
//activateTest('test4'); //nigga

// setInterval(() => {
//     console.log(`O2% left: ${--o2}`)
// },(2000)); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left