import planets from './jsons/planets.json' with{type: 'json'}
import { RandomElement } from './main.js';
let chosenPlanets = Array.from({ length: 5 }, () => RandomElement(Object.values(planets))); //generates 5 random planets and adds them to chosenPlanets (AS OBJECTS)
export let currentPlanet = "Planet1"; // Planet 1 is a placeholder for the text that comes from each planet button
export let o2 = 100, days = 10, logs = [];
export { chosenPlanets };