import gameData from './jsons/gameData.json' with{type: 'json'}
import planets from './jsons/planets.json' with{type: 'json'}

import {chosenPlanets, logs, allPlanets } from './globals.js';

let currentPlanet;
let o2 = 100
let days = 10
let i = 0;
let speed = 30;
let isOpenLeft = false;
let isOpenRight = false;
let IsSuccessful = (successChance) => (Math.random() * 100 <= successChance); //returns bool if successfull
let isTyping;
let score = 0;
let correctSubmission = []

const typingSound = document.getElementById('typingSound');
console.log(chosenPlanets)
function calcScore(){
    for(let i = 0; i < 5; i++){
        if(document.getElementById(`planets${i+1}`).value === chosenPlanets[i].name){
            console.log('correct +1 score')
            correctSubmission[i] = true;
            score++ 
        } 
        console.log(document.getElementById(`planets${i+1}`))
    }
    console.log(score)
    if(score > 3){
        document.getElementById('victory-state').innerHTML = 'VICTORY';
    }else if(score === 2){ 
        document.getElementById('victory-state').innerHTML = 'BETTER LUCK NEXT TIME';
    }else if(score < 2){
        document.getElementById('victory-state').innerHTML = 'DEFEAT';
    }
}

function VictoryMenu(){ 
    calcScore();
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('victory').classList.add('open');
    document.getElementById('score').innerHTML = score;
    const victoryStat = document.getElementById('victory-stat');
    chosenPlanets.forEach((planet, i) => {
        const planetElement = document.createElement('div');
        planetElement.innerHTML = `Planet${i + 1}: ${planet.name}`;
        if (!correctSubmission[i]) {
            planetElement.style.color = '#c40d0d';
        }
        victoryStat.appendChild(planetElement);
    });
}

document.querySelectorAll('.Planet select').forEach(select => {
    allPlanets.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet; // Assuming planet is a string
        option.textContent = planet; // Use textContent to safely add text
        select.appendChild(option); // Add the option to the select element
    });
    select.addEventListener('change', (e) => {
        select.value = (e.target.value);
        select.defaultValue = allPlanets[0];
        console.log(select.defaultValue);
    });
});



function cluesGenerator(cluesCount) {
    const clues = currentPlanet.clues;
    const generatedClues = [];
    for (let i = 0; i < cluesCount; i++) {
        const randomClue = RandomElement(clues);
        generatedClues.push(randomClue);
        clues.splice(clues.indexOf(randomClue), 1); // Remove the clue to avoid duplicates
    }
    return generatedClues;
}
function test1(sliderInput){
    console.log(`test 1 triggered: ${sliderInput}`)
    //main currentPlanet.maxWavelength - sliderInput 
    //if:
    // diff = 0 -> 3 clues
    // diff = 5 -> 2 clues
    // diff = 10 -> 1 clues
    // diff = 15 -> 0 clues
    //let cluesCount = planets.attributes.maxWavelength - sliderInput
    // extract n clues from currentPlanet.clues


    // let diff = currentPlanet.maxWavelength - sliderInput
    // let cluesCount = 0;

    // if (diff === 0) {
    //     cluesCount = 3;
    // } else if (diff <= 5) {
    //     cluesCount = 2;
    // } else if (diff <= 10) {
    //     cluesCount = 1;
    // }
    // const clues = cluesGenerator(cluesCount);
    // console.log(clues);
}
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
    if(isOpenLeft){ //if dialogue is open, close it and display logs
        document.getElementById('mainS').classList.remove('open');
        document.getElementById('log-button').classList.remove('clicked-log');
    }
    else if(!isOpenLeft){ //if dialogue is closed, open it and hide logs
        document.getElementById('mainS').classList.add('open');
        document.getElementById('log-button').classList.add('clicked-log');
        document.getElementsByClassName('Logs')[0].innerHTML = "PLANET DISCOVERY LOGS:<br><br><br>" + logs.join('<br><hr>')
    }
    isOpenLeft = !isOpenLeft
}
function SubmitMenu(){
    if(isOpenRight){ //if menu is open close it
        document.getElementById('planetSubmit').classList.remove('open');
        document.getElementById('submit-menu').classList.remove('clicked-submit-menu');
    }
    else if(!isOpenRight){ //if menu is closed open it
        document.getElementById('planetSubmit').classList.add('open');
        document.getElementById('submit-menu').classList.add('clicked-submit-menu');
        // document.getElementsByClassName('Logs')[0].innerHTML = "PLANET DISCOVERY LOGS:<br><br><br>" + logs.join('<br><hr>')
    }
    isOpenRight = !isOpenRight
}
function hideResponses(){
    document.getElementsByClassName('responses-container')[0].style.display = 'none';
}
function showResponses(){
    document.getElementsByClassName('responses-container')[0].style.display = 'grid';
}
function showTest(testType){
    document.getElementById(testType).style.display = 'flex';
}
function hideTest(testType){
    document.getElementById(testType).style.display = 'none';
}

function typeWriter(text, divId) {
    return new Promise((resolve) => { // Return a promise
        let i = 0;
        document.getElementById(divId).innerHTML = ' ';
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
function generateText(testType){
    if(!isTyping){
        // const command = RandomElement(gameData.tests[testType].command); // gets a random command from the array of commands
        
        // const didSucceed = IsSuccessful(80) ? 'success' : 'failure'; // determines if test was successful
        // console.log(didSucceed);
        // const result = RandomElement(gameData.tests[testType][didSucceed]); // gets a random response from the array of results
        
        // document.getElementById('OPtext').innerHTML = ' ';
        // document.getElementById('ASTROtext').innerHTML = ' ';

    }
}
function activateTest(testType) {
    console.log("BUTTON CLICKED with test type: " + testType);
    hideResponses();
    showTest(testType);
    if(!isTyping){
        const command = RandomElement(gameData.tests[testType].command); // gets a random command from the array of commands
        
        const didSucceed = IsSuccessful(80) ? 'success' : 'failure'; // determines if test was successful
        const result = RandomElement(gameData.tests[testType][didSucceed]); // gets a random response from the array of results

        //generateText(testType);
        isTyping = true;

        // First type the OP text, then type the ASTRO text
        typeWriter(command, 'OPtext')
            .then(() => {
                // Return a new Promise that resolves when the submit button is clicked
                return new Promise(resolve => {
                    const submitButton = document.getElementById('submit-button');
                    const handleClick = () => {
                        submitButton.removeEventListener('click', handleClick);
                        resolve();
                    };
                    submitButton.addEventListener('click', handleClick);
                });
            })
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
    // TEST 1 BUTTONS //
    let sliderValue = 10;
    let slider = document.getElementById('slider'); //GETS SLIDER VALUE
    slider.addEventListener('input', () => {
        sliderValue = slider.value;
    });
    document.getElementById('back-button').addEventListener('click', function() { //BACK BUTTON
        showResponses();
        hideTest('test1');
    });
    //document.getElementById('submit-button').addEventListener('click',() => test1(sliderValue)); //SUBMIT BUTTON
    // TEST 2 BUTTONS //


    // LOG AND VIEW LOGS BUTTON //
    document.getElementById('return-button').addEventListener('click', VictoryMenu);
    document.getElementById('log').addEventListener('click', Log);
    document.getElementById('submit-menu').addEventListener('click', SubmitMenu);
    document.getElementById('log-button').addEventListener('click', ReadLog);
    // RESPONSE BUTTONS //
    document.querySelectorAll('.response').forEach((button, index) => {
        button.addEventListener('click', () => activateTest(`test${index + 1}`));
    });

    // PLANET BUTTONS //
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
    const intervalId = setInterval(() => {
        if (days === 0) {
            VictoryMenu();
            clearInterval(intervalId);
        } else {
            daysVisual.innerHTML = `Days left: ${--days}`;
        }
    }, 60000); //countdown oxygen

// setInterval(() => {
//     console.log(`Days left: ${--days}`)
// },(3000)); //countdown days left

