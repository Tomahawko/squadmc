/* eslint-disable quote-props */
import SquadMap from "./SquadMap";

let Johanna = 4508;
let Driel = 4892;
let Heelsum =  5611;

/**
 * This object holds all relevant information of the squad maps, including dimensions, heightmap, etc.
 * @type {*[]}
 */
export const MAPDATA = [
  {
    name: "Driel",
    url: "/img/maps/driel/{z}_{x}_{y}.jpg",
    bounds: [4892, 4892], // map dimensions in meters
  },
  {
    name: "Heelsum",
    url: "/img/maps/heelsum/{z}_{x}_{y}.jpg",
    bounds: [5611, 5611], // map dimensions in meters
  },
  {
    name: "Johanna",
    url: "/img/maps/johanna/{z}_{x}_{y}.jpg",
    bounds: [4508, 4508], // map dimensions in meters
  },
];

export function getMapNames() {
  const names = [];
  MAPDATA.forEach((map) => {
    names.push(map.name);
  });
  // console.log(`returning map names: ${names}`);
  return names;
}

export function getSquadMap(mapName) {
  // console.log("getSquadMap:", mapName);
  for (let i = 0; i < MAPDATA.length; i += 1) {
    if (mapName === MAPDATA[i].name) {
      return new SquadMap(MAPDATA[i]);
    }
  }

  throw new Error(`No map named ${mapName} exists!`);
}

export function printMapExtras() {
  MAPDATA.forEach((map) => {
    const e = map.extra;
    if (e) {
      const mm = e.minimap;
      const xM = -mm[0][0] + mm[1][0];
      const yM = -mm[0][1] + mm[1][1];
      const xScale = e.xScale || 100;
      const yScale = e.yScale || 100;

      const xO = e.lOrigin[0] - mm[0][0];
      const yO = e.lOrigin[1] - mm[0][1];

      console.log(`${map.name}`);
      console.log(`map dimensions:    ${xM / 100}x${yM / 100}`);
      console.log(`orig heightmap:    ${e.hDim[0]}x${e.hDim[1]}`);

      console.log(`scale heightmap:   x:${xScale}% y:${yScale}%`);
      console.log(`crop with offset:  ${xO / 100}x${yO / 100}`);
      console.log("---");
    }
  });
}
