import planets from './jsons/planets.json' with{type: 'json'}
import { RandomElement } from './main.js';

//generates 5 random planets and adds them to chosenPlanets (AS OBJECTS) unique
let chosenPlanets = [];
let chosenPlanetsU = new Set();
while (chosenPlanetsU.size < 5) {
    chosenPlanetsU.add(RandomElement(Object.values(planets)));
}
chosenPlanets = Array.from(chosenPlanetsU);

export let allPlanets = Object.values(planets).map(planet => planet.name);

export let logs = [];
export { chosenPlanets};