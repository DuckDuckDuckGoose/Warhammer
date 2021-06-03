Model = require(`..\\model.js`);
class Intercessor extends Model {
  constructor(weaponList) {
    super(6, 3, 3, 4, 4, 2, 2, 7, 3, Infinity)
    let weapons = ["Bolt_Rifle"]//, "Bolt_Pistol", "Frag_Grenade", "Krak_Grenade"];
    this.assignWeapons(weapons, weaponList);
  }
}

module.exports = Intercessor;
