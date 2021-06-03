Weapon = require(`..\\weapon.js`);
class Bolt_Rifle extends Weapon {
  constructor() {
    super(30, {class: "RAPIDFIRE", shots: 2}, 4, -1, 1)
  }
}
module.exports = Bolt_Rifle
