const fs = require("fs");

function shotProbability(model, weapon, enemyModel) {
  let st = Date.now();
  let probabilites = new Array(weapon.type.shots * weapon.damage + 1);
  probabilites.fill(0);
  for(let i = 0;i <= weapon.type.shots;i++) {
    pHit = binomialProb(weapon.type.shots, i, probRole(model.ballisticSkill))
    for(let j = 0;j <= i;j++) {
      pWound = binomialProb(i, j, probRole(getWound(weapon.strength / enemyModel.toughness)));
      //console.log(i, j, pHit, pWound);
      probabilites[j * weapon.damage] += pHit * pWound;
    }
  }
  //console.log(Date.now() - st);
  //return [probabilites, probabilites.reduce((accum, value) => {return accum + value;})];
  return probabilites;
}
function getWound(ratio) {
  switch(true) {
    case ratio >= 2:
      return 2;
    case ratio <= 0.5:
      return 6;
    case ratio > 1:
      return 3;
    case ratio < 1:
      return 5;
    case ratio == 1:
      return 4;
    case ratio == 0:
      return 7;
  }
}
function binomialProb(numTrials, numSuccess, probSuccess) {
  let prob = (factorial(numTrials) / (factorial(numTrials - numSuccess) * factorial(numSuccess))) * Math.pow(probSuccess, numSuccess) * Math.pow(1 - probSuccess, numTrials - numSuccess);
  return prob;
}
function factorial(number) {
  let result = 1;
  for(let n = 1;n <= number;n++) {
    result *= n;
  }
  return result;
}
function probRole(n) {
  if(n < 1 || n > 6) {return null;}
  return (7 - n) / 6;
}

class GameState {
  constructor(_team1, _team2, _currentTeam) {
    this.team1 = _team1;
    this.team2 = _team2;
  }
}

class Node {
  constructor(_parent, _gameState, _depth, _limit) {
    this.parent = _parent;
    this.gameState = _gameState;
    this.depth = _depth;
    this.limit = _limit;
    this.createChildren();
  }
  createChildren() {
    if(this.depth == this.limit) {return;}
    this.gameState.team1.slice(0, 1).forEach((model) => {
      let grenades = [];
      let pistols = [];
      let normals = [];
      model.weapons.forEach((weapon) => {
        switch (weapon.type.class) {
          case "GRENADE":
            grenades.push(weapon)
            break;
          case "PISTOL":
            pistols.push(weapon)
            break;
          case "MELEE":
            break;
          default:
            normals.push(weapon)
        }
      });
      console.log(grenades, pistols, normals);
      normals.forEach((weapon) => {
        this.gameState.team2.forEach((enemyModel) => {
          let result = shotProbability(model, weapon, enemyModel);
          console.log(result);
        });

      });

    });

  }
}

let models = {};
let weapons = {};
let loadModels = new Promise((resolve, reject) => {
  fs.readdir(`models`, (err, files) => {
  if(err) {
    throw err;
  } else {
    files.forEach((item) => {
      models[(item.split(".")[0]).replace(/ /g, `_`)] = require(`.\\models\\` + item);
    });
    resolve();
  }
});
})
let loadWeapons = new Promise((resolve, reject) => {
  fs.readdir(`Weapons`, (err, files) => {
  if(err) {
    throw err;
  } else {
    files.forEach((item) => {
      weapons[(item.split(".")[0]).replace(/ /g, `_`)] = require(`.\\weapons\\` + item);
    });
    resolve();
  }
});
})

Promise.all([loadModels, loadWeapons]).then(() => {
  let team1 = [new models.Intercessor(weapons), new models.Intercessor(weapons), new models.Intercessor(weapons)];
  let team2 = [new models.Intercessor(weapons), new models.Intercessor(weapons)];
  let startState = new GameState(team1, team2);
  let startNode = new Node(null, startState, 1, 10);
})
