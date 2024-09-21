import gameData from './jsons/gameData.json' with{type: 'json'}
import planets from './jsons/planets.json' with{type: 'json'}
import {chosenPlanets, days, logs } from './globals.js';

let currentPlanet 
let o2 = 100
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
    console.log(currentPlanet)
}

chosenPlanets.forEach(planet => {
    console.log(planet)
}) 
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.grid-item').forEach((button, index) => {
        console.log(button);
        button.addEventListener('click', () => activateTest('test' + (index + 1)));
    });
    document.querySelectorAll('.planet[name="PInput"]').forEach((radio) => {
        radio.addEventListener('change', () => {
                console.log("LMAO")
                SwitchPlanet(radio.value)
        });
    });
});

    let O2 = document.getElementById('o2')
    setInterval(() => {
        O2.innerHTML = `Oxygen: ${--o2}%`
    },(2000)); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left

