Weapon = require(`..\\weapon.js`);
class Krak_Grenade extends Weapon {
  constructor() {
    super(6, {class: "GRENADE", shots: 1}, 6, -1, 6)
  }
}
module.exports = Krak_Grenade
