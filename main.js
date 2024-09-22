import gameData from './jsons/gameData.json' with{type: 'json'}
import planets from './jsons/planets.json' with{type: 'json'}

import {chosenPlanets, days, logs } from './globals.js';

let currentPlanet;
let o2 = 100
let i = 0;
let speed = 30;
let isOpen = false;
let IsSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
let isTyping;
const typingSound = document.getElementById('typingSound');
console.log(chosenPlanets)

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

function activateTest(testType) {
    console.log("BUTTON CLICKED");
    const didSucceed = IsSuccessful(gameData.tests[testType].successRate) ? 'success' : 'failure'; // determines if test was successful
    const result = RandomElement(gameData.tests[testType][didSucceed]); // gets a random response from the array of results

    function typeWriter() {
        if (i < result.length) {
            document.getElementById('ASTROtext').innerHTML += result.charAt(i);
            typingSound.volume = 0.1;
            typingSound.play();
            i++;
            setTimeout(typeWriter, speed);
        } else {
            isTyping = false;
            typingSound.pause();
            typingSound.currentTime = 0; // Reset audio to the start
        }
    }
    
    i = 0;
    // typingSound.currentTime = 0; // Reset audio to the start
    document.getElementById('ASTROtext').innerHTML = ' ';
    typeWriter();
    isTyping = true;
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

    let O2 = document.getElementById('o2')
    setInterval(() => {
        O2.innerHTML = `Oxygen: ${--o2}%`
    },(2000)); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left

