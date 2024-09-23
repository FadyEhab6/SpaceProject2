import gameData from './jsons/gameData.json' with{type: 'json'}
import planets from './jsons/planets.json' with{type: 'json'}
import { currentPlanet, chosenPlanets, o2, days, logs } from './globals.mjs';

let maxProbes = [ 4 , 3 , 2 ]
let maxRadar = []
let maxScans = []

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
    let luckChance = 0         //This will change according to the user choices 
    let result
    if (testType == 'test1'){
        let slider = 10       //The value that comes from the slider
        let maxWave = planets[currentPlanet]["attributes"]["Wavelength"]       //maximum wavelength
        let diff = (slider > maxWave)? slider - maxWave : maxWave - slider
        if (diff == 0){
            result = RandomElement(gameData.tests[testType]["success"]) + "\nGases present: " + currentPlanet.attributes.GasesPresent
            //display all three gases
        } 
        else if (diff == 5){
            result = RandomElement(gameData.tests[testType]["close"])
            //tell him that he's close
            //output nothing
        }
        else{
            result = RandomElement(gameData.tests[testType]["failure"])
            //output nothing
        }
    }
    else if (testType == 'test2'){
        let chosenProbe = "standard" //Chosen probe in the test
        if (maxProbes[0] == 0 && chosenProbe == "standard"){
            result = RandomElement(gameData.tests[testType]["out-standard"])
        }
        else if (maxProbes[1] == 0 && chosenProbe == "high"){
            result = RandomElement(gameData.tests[testType]["out-high"])
        }
        else if (maxProbes[2] == 0 && chosenProbe == "deep"){
            result = RandomElement(gameData.tests[testType]["out-deep"])
        }
        else {
            if (bestProbe == chosenProbe){
                if (chosenProbe == "standard"){
                    result = RandomElement(gameData.tests[testType]["success-standard"]) + "\nTemperature: " + RandomElement(currentPlanet.attributes.temperature) + " °K"
                    //display temp
                }
                else if (chosenProbe == "high-temp"){
                    result = RandomElement(gameData.tests[testType]["success-high"]) + "\nTemperature: " + RandomElement(currentPlanet.attributes.temperature) + " °K"
                    //display temp
                }
                else if (chosenProbe == "deep"){
                    result = RandomElement(gameData.tests[testType]["success-deep"]) + "\nTemperature: " + RandomElement(currentPlanet.attributes.temperature) + " °K"
                    //display temp
                }
            }
            else {
                if (chosenProbe == "standard"){
                    result = RandomElement(gameData.tests[testType]["failure-standard"])
                }
                else if (chosenProbe == "high-temp"){
                    result = RandomElement(gameData.tests[testType]["failure-high"])
                }
                else if (chosenProbe == "deep"){
                    result = RandomElement(gameData.tests[testType]["failure-deep"])
                }
            }
        }
    }
    else if (testType == 'test3'){
        let freq = "low"
        if (maxRadar[0] == 0 && freq == "low"){
            result = RandomElement(gameData.tests[testType]["failure-LowOut"])
        }
        else if (maxRadar[1] == 0 && freq == "high"){
            result = RandomElement(gameData.tests[testType]["failure-HighOut"])
        }
        else {
            if (freq == "low"){
                result = RandomElement(gameData.tests[testType]["success-LowF"]) + RandomElement(currentPlanet.attributes.Dialogue3)
            }
            else if (freq == "high"){
                result = RandomElement(gameData.tests[testType]["success-HighF"])
                currentPlanet.attributes.Dialogue3.forEach(element => {
                    result += element
                });
            }
        }
    }
    else if (testType == 'test4'){
        let t = 1
        if (maxRadar[t] == 0){
            if (t == 0){
                result = RandomElement(gameData.tests[testType]["out-1hr"])
            }
            else if (t == 1){
                result = RandomElement(gameData.tests[testType]["out-3hr"])
            }
            else if (t == 2){
                result = RandomElement(gameData.tests[testType]["out-6hr"])
            }
        }
        else{
            luckChance = 90
            if (Math.random() * 100 <= luckChance){
                if (t == 0){
                    let r = Math.floor(Math.random() * arr.length)
                    result = RandomElement(gameData.tests[testType]["success-1hr"]) + "\n" + currentPlanet.attributes.Dialogue4[r]
                    //choose 1 random
                }
                else if (t == 1){
                    let r = Math.floor(Math.random() * arr.length)
                    result = RandomElement(gameData.tests[testType]["success-3hr"]) + "\n" + currentPlanet.attributes.Dialogue4[r]
                    let deleted = currentPlanet.attributes.Dialogue4.splice(r,1)
                    r = Math.floor(Math.random() * arr.length)
                    result += currentPlanet.attributes.Dialogue4[r]
                    currentPlanet.attributes.Dialogue4.push(deleted)
                    //choose 2 random
                }
                else if (t == 2){
                    result = RandomElement(gameData.tests[testType]["success-6hr"]) + "\n" + currentPlanet.attributes.Dialogue4[0] + currentPlanet.attributes.Dialogue4[1] + currentPlanet.attributes.Dialogue4[2]
                    //display all
                }
            }
            else {
                result = RandomElement(gameData.tests[testType]["failure"])
                //display none
            }
        }
    }
    //const didSucceed = (Math.random() * 100 <= luckChance)? 'success' : 'failure' //determines if test was successful
    //const result = RandomElement(gameData.tests[testType][didSucceed]); //gets a random response from the array of results
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

