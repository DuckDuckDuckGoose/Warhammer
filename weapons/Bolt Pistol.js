Weapon = require(`..\\weapon.js`);
class Bolt_Pistol extends Weapon {
  constructor() {
    super(12, {class: "PISTOL", shots: 1}, 4, 0, 1)
  }
}
module.exports = Bolt_Pistol;
