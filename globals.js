import planets from './jsons/planets.json' with{type: 'json'}
import { RandomElement } from './main.js';
let chosenPlanets = Array.from({ length: 5 }, () => RandomElement(Object.values(planets))); //generates 5 random planets and adds them to chosenPlanets (AS OBJECTS)

export let days = 10, logs = [];
export { chosenPlanets };