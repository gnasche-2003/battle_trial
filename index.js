/*
 * Project's Name: Who's Champion
 * Description: A simple turn-based battle game with characters (2vs2) from the universes.
 * Name
 * Health/hp
 * Attack/atk
 * Defense/def
 * Speed/spd
 * CounterRate/ct_Rate
 */

// Character Function
function Character(name, hp, atk, def, spd, ct_Rate) {
  this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.def = def;
  this.spd = spd;
  this.ct_Rate = ct_Rate;

  // Build Actions
  // attack
  this.attack = function (target) {
    // Deals normal damage
    const damage = Math.max(this.atk - target.def, 0);
    target.hp -= damage;
    console.log(
      `${this.name} attacks ${target.name}, deals ${damage} damage, ${target.name} remains ${target.hp} bloods!}`
    );

    // Deals counter-intuitive damage
    if (target.isAlive() && Math.random() < target.ct_Rate) {
      const counterDamage = Math.max(target.atk - this.def, 0);
      target.hp -= counterDamage;
      console.log(
        `${target.name} attacks back ${this.name}, deals ${counterDamage} damage, ${this.name} remains ${this.hp} bloods!}`
      );
    }
  };

  // isAlive
  this.isAlive = function () {
    return this.hp > 0;
  };
}

// BattleRound function
function battleRound(attacker, defender) {
  // Suppose, 1 of 2 characters hits first
  attacker.attack(defender);

  // If (defender && attacker) are alive, defender will hit back attacker
  if (defender.isAlive() && attacker.isAlive()) {
    defender.attack(attacker);
  }
}

// Battle Function
function battle(char1, char2) {
  let round = 1;

  while (char1.isAlive() && char2.isAlive()) {
    console.log(`Round ${round}: ${char1.name} vs ${char2.name}`);

    if (char1.spd > char2.spd) {
      battleRound(char1, char2);
    } else if (char2.spd > char1.spd) {
      battleRound(char2, char1);
    } else {
      if (Math.random() < 0.5) {
        battleRound(char1, char2);
      } else {
        battleRound(char2, char1);
      }
    }
    round++;
  }

  const winner = char1.isAlive ? char1 : char2;
  console.log(
    `Round ${round}: ${winner.name} wins and remains ${winner.hp} bloods!`
  );
  return winner;
}

// Create Capybara characrer
const capy = new Character("Capybara", 1000, 50, 5, 30, 0.5);

// Create Labubu characrer
const labu = new Character("Labubu", 500, 20, 20, 10, 0.2);

// Start Battle
battle(capy, labu);
