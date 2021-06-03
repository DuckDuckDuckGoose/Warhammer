module.exports = class Weapon {
  constructor(_range, _type, _strength, _armourPen, _damage) {
    this.range = _range;
    this.type = _type;
    this.strength = _strength;
    this.armourPen = _armourPen;
    this.damage = _damage;
  }
}
