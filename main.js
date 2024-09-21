import gameData from './jsons/gameData.json' with{type: 'json'}
import planets from './jsons/planets.json' with{type: 'json'}
import { currentPlanet, chosenPlanets, o2, days, logs } from './globals.mjs';


export function RandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
} //generates a random element (index) from an array
let IsSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
function Log(message){
    logs.push(`- [${currentPlanet}] ` + message)
}
function ReadLog(){
    console.log('PLANET DISCOVERY LOGS: \n')
    logs.forEach(log => console.log(log))
}
function activateTest(testType){
    console.log("BUTTON CLICKED")
    const didSucceed = IsSuccessful(gameData.tests[testType].successRate)? 'success' : 'failure' //determines if test was successful
    const result = RandomElement(gameData.tests[testType][didSucceed]); //gets a random response from the array of results
    Log(result) 
    ReadLog() 
    document.getElementById('ASTROtext').innerHTML = result //displays result on html
}  
function SwitchPlanet(planet){ //called from html button
    currentPlanet = planet
}

chosenPlanets.forEach(planet => {
    console.log(planet)
}) 
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.grid-item').forEach((button, index) => {
        console.log(button);
        button.addEventListener('click', () => activateTest('test' + (index + 1)));
    });
});


//activateTest('test1') // The test is determined from html button, it will be called on currentPlanet
//activateTest('test4'); 

// setInterval(() => {
//     console.log(`O2% left: ${--o2}`)
// },(2000)); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left

