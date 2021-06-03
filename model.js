module.exports = class Model {
  constructor(_movement, _weaponSkill, _ballisticSkill, _strength, _toughness, _wounds, _attacks, _leadership, _max) {
    this.movement = _movement;
    this.weaponSkill = _weaponSkill;
    this.ballisticSkill = _ballisticSkill;
    this.strength = _strength;
    this.toughness = _toughness;
    this.wounds = _wounds;
    this.attacks = _attacks;
    this.leadership = _leadership;
    this.max = _max;
    this.state = {"hasFired": false}
    this.weapons = [];
  }
  validWeapons(weapons) {
    return true;
  }
  assignWeapons(weapons, weaponList) {
    let temp = new weaponList.Bolt_Pistol();
    weapons.forEach((weapon) => {
      this.weapons.push(new weaponList[weapon]());
    });

  }
}
