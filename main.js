import gameData from './jsons/gameData.json' with{type: 'json'}
import planets from './jsons/planets.json' with{type: 'json'}

import {chosenPlanets, logs } from './globals.js';

let currentPlanet;
let o2 = 100
let days = 10
let i = 0;
let speed = 30;
let isOpen = false;
let IsSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
let isTyping;
const typingSound = document.getElementById('typingSound');
console.log(chosenPlanets)

function Outcome(testType) {
    if(testType === 'test1'){
    ///////////////////// 1 ////////////////////////
        return IsSuccessful(80) ? 'success' : 'failure';
    }
    ///////////////////// 2 ////////////////////////
    if(testType === 'test2'){
        return IsSuccessful(80) ? 'success' : 'failure';
    }
    ////////////////////// 3 ///////////////////////
    if(testType === 'test3'){
        return IsSuccessful(80) ? 'success' : 'failure';
    }
    /////////////////////// 4 //////////////////////
    if(testType === 'test4'){
        return IsSuccessful(80) ? 'success' : 'failure';
    }
}

export function RandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
} //generates a random element (index) from an array

function Log(){     
    if (!isTyping) { //if not typing, log the planet
        logs.push(`- [${currentPlanet.id}] ` + document.getElementById('ASTROtext').innerHTML)
        console.log(currentPlanet)
    }
}
function ReadLog(){
    console.log('PLANET DISCOVERY LOGS: \n')
    logs.forEach(log => console.log(log))
    if(isOpen){ //if dialogue is open, close it and display logs
        document.getElementById('mainS').classList.remove('open');
        document.getElementById('log-button').classList.remove('clicked-log');
        isOpen = !isOpen
    }
    else if(!isOpen){ //if dialogue is closed, open it and hide logs
        document.getElementById('mainS').classList.add('open');
        document.getElementById('log-button').classList.add('clicked-log');
        document.getElementsByClassName('Logs')[0].innerHTML = "PLANET DISCOVERY LOGS:<br><br><br>" + logs.join('<br><hr>')
        isOpen = !isOpen
    }
}

function typeWriter(text, divId) {
    return new Promise((resolve) => { // Return a promise
        let i = 0;
        function type() {
            if (i < text.length) {
                document.getElementById(divId).innerHTML += text.charAt(i);
                typingSound.volume = 0.1;
                typingSound.play();
                i++;
                setTimeout(type, speed); // Call recursively until finished
            } else {
                typingSound.pause();
                typingSound.currentTime = 0; // Reset audio to the start
                resolve(); // Resolve the promise when done typing
            }
        }
        type();
    });
}
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function activateTest(testType) {
    console.log("BUTTON CLICKED with test type: " + testType);
    if(!isTyping){
        const command = RandomElement(gameData.tests[testType].command); // gets a random command from the array of commands
        
        const didSucceed = IsSuccessful(80) ? 'success' : 'failure'; // determines if test was successful
        console.log(didSucceed);
        const result = RandomElement(gameData.tests[testType][didSucceed]); // gets a random response from the array of results
        
        document.getElementById('OPtext').innerHTML = ' ';
        document.getElementById('ASTROtext').innerHTML = ' ';
        isTyping = true;

        // First type the OP text, then type the ASTRO text
        typeWriter(command, 'OPtext')
            .then(() => delay(2000)) // adds delay
            .then(() => typeWriter(result, 'ASTROtext')) // Wait for OPtext to finish
            .then(() => isTyping = false); // Reset isTyping when both are done
    }
}
function SwitchPlanet(planet){ //called from html button
    currentPlanet = planet // <-- dy tmam
    console.log(currentPlanet.name)
} 

chosenPlanets.forEach(planet => {
    console.log(planet)
}) 
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('log').addEventListener('click', Log);
    document.getElementById('log-button').addEventListener('click', ReadLog);

    document.querySelectorAll('.response').forEach((button, index) => {
        button.addEventListener('click', () => activateTest(`test${index + 1}`));
    });

    document.querySelectorAll('.planet[name="PInput"]').forEach((radio, index) => {
        chosenPlanets[index]['id'] = `Planet${index+1}`;
        if(index === 0){
            currentPlanet = chosenPlanets[index];
        }
        radio.addEventListener('change', () => {
            SwitchPlanet(chosenPlanets[index]);
        });
    });
});

    let daysVisual = document.getElementById('days')
        daysVisual.innerHTML = `Days left: ${days}`
    setInterval(() => {
        daysVisual.innerHTML = `Days left: ${--days}`
    },(60000)); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left

