Weapon = require(`..\\weapon.js`);
class Frag_Grenade extends Weapon {
  constructor() {
    super(6, {class: "GRENADE", shots: 6}, 3, 0, 1)
  }
}
module.exports = Frag_Grenade;
