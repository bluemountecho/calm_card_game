var monsterCards1 = []
var spellCards1 = []
var equipCards1 = []

for (var i = 1; i <= 38; i ++) {
    monsterCards1.push({
        Type: "Monster",
        Card: "card0a.png",
        CardName: "Monster" + i,
        AttackPoint: 20 + i % 10,
        DefensePoint: 20 - i % 10,
        ManaCost: Math.floor(i / 10 + 1)
    })
}
  
for (var i = 1; i <= 51; i ++) {
    spellCards1.push({
        Type: "Spell",
        Card: "card0b.png",
        CardName: "Spell" + i,
        AttackPoint: 5 + i % 3,
        DefensePoint: 5 - i % 3,
        ManaCost: Math.floor(i / 10 + 1)
    })
}
  
for (var i = 1; i <= 33; i ++) {
    equipCards1.push({
        Type: "Equip",
        Card: "card8c.png",
        CardName: "Equip" + i,
        AttackPoint: 5 + i % 3,
        DefensePoint: 5 - i % 3,
        ManaCost: Math.floor(i / 10 + 1)
    })
}

export const monsterCards = monsterCards1
export const spellCards = spellCards1
export const equipCards = equipCards1