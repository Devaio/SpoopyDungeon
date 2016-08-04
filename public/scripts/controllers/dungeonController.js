// Dungeon Controller
angular.module('SpoopyDungeon')
    .controller('DungeonController', [
        'DungeonFactory',
        '$interval',
        dungeonController
    ]);

function dungeonController(DungeonFactory, $interval) {
    var dCtrl = this;
    window.dCtrl = dCtrl;
    dCtrl.players = DungeonFactory.players;
    // console.log('!', DungeonFactory)

    // Creating a new player
    dCtrl.createPlayer = function () {
        new DungeonFactory.Player(dCtrl.newPlayer);
        console.log(DungeonFactory.players);

        // Choose the most recently created player and setup initial values
        dCtrl.currentPlayer = DungeonFactory.players[DungeonFactory.players.length - 1];
        dCtrl.currentPlayer.name = dCtrl.currentPlayer.name + " " + romanize(DungeonFactory.players.length);
        dCtrl.currentPlayer.maxhp = 100;
        dCtrl.currentPlayer.hp = dCtrl.currentPlayer.maxhp;
        dCtrl.currentPlayer.dps = dCtrl.currentPlayer.equipment.Weapon.damage / dCtrl.currentPlayer.equipment.Weapon.speed;

        dCtrl.currentPlayer.save();

        var monsterAttackSpeed = Math.floor(Math.random() * 1000) + 1000;
        console.log("Monster attack speed: " + monsterAttackSpeed);

        // start attacking
        dCtrl.playerAttack = $interval(dCtrl.attackMonster, dCtrl.currentPlayer.equipment.Weapon.speed);
        dCtrl.monsterAttack = $interval(dCtrl.attackPlayer, monsterAttackSpeed);

        // Make a room!
        dCtrl.nextRoom();
    }

    // This function will be used quite a bit, Every time the player moves into a room, we need to create that room as well as items and a monster
    dCtrl.nextRoom = function () {
        console.log("Creating a new room!");
        var monsterMaxHp = Math.ceil(Math.random() * 100);

        // create a random monster
        var monster = new DungeonFactory.Monster({
            type: DungeonFactory.monsterTypes[Math.floor(Math.random() * DungeonFactory.monsterTypes.length)],
            maxhp: monsterMaxHp,
            hp: monsterMaxHp,
        });

        // determine room items
        var roomItems = [];
        var maxItems = Math.floor(Math.random() * 5) + 1;
        console.log("Max number of items in room: " + maxItems);
        for (let i = 0; i < maxItems; i++) {
            // generate new items
            // choose a random item type (consumable, weapon, or armor)
            var itemType = Math.floor(Math.random() * 100) + 1;
            console.log("Item type chosen: " + itemType);

            // consumable (50% chance)
            if (itemType < 50) {
                // randomly generate consumable
                var itemName = DungeonFactory.consumableItems[Math.floor(Math.random() * DungeonFactory.consumableItems.length)];

                // add consumable to room
                roomItems.push(new DungeonFactory.Item({ name: itemName, type: "Consumable" }));
            }
            // weapon (25% chance)
            else if (itemType < 75) {
                // randomly generate weapon name, damage, and speed
                var weaponName = DungeonFactory.weaponNames[Math.floor(Math.random() * DungeonFactory.weaponNames.length)];
                var dmg = Math.floor(Math.random() * 25) + 1; // damage ranges from 1 to 25
                var sp = Math.floor(Math.random() * 2800) + 200; // speed ranges from 200ms to 3sec

                // add weapon to room
                roomItems.push(new DungeonFactory.Weapon({ name: weaponName, type: "Weapon", damage: dmg, speed: sp }));
            }
            // armor (25% chance)
            else if (itemType <= 100) {
                // randomly generate armor name, slot, and ac
                var randomArmorNum = Math.floor(Math.random() * DungeonFactory.armorNames.length);
                var armorName = DungeonFactory.armorNames[randomArmorNum];
                var armorSlot = DungeonFactory.armorSlots[randomArmorNum];
                var ac = Math.floor(Math.random() * 10) + 1; // armor class ranges from 1 to 10

                // and reduce chance to be hit by monster based on armor class
                roomItems.push(new DungeonFactory.Armor({ name: armorName, type: "Armor", armorClass: ac, slot: armorSlot }));
            }

            // prevent duplicates
            // if(roomItems.indexOf(DungeonFactory.itemList[newItemNum]) == -1)
            // {
            //     console.log("Added item num " + newItemNum);
            //     roomItems.push(DungeonFactory.itemList[newItemNum]);
            // }
            // else
            // {
            //     console.log("Duplicate item! Nothing added!");
            // }

            //roomItems.push(DungeonFactory.itemList[newItemNum]);
        }

        // determine room description
        var roomDesc = DungeonFactory.roomDescriptions[Math.floor(Math.random() * DungeonFactory.roomDescriptions.length)];

        // construct new room
        var room = new DungeonFactory.Room({
            description: roomDesc,
            items: roomItems,
            monster: monster,
            player: dCtrl.currentPlayer,
        });

        dCtrl.currentRoom = room;

    };

    // player attacks monster
    dCtrl.attackMonster = function () {
        //console.log("Attacking monster!");

        // hit (base 10% chance to miss)
        if (Math.random() > 0.1) {
            var dmg = Math.floor(Math.random() * dCtrl.currentPlayer.equipment.Weapon.damage) + 1;
            console.log(dCtrl.currentPlayer.name + " attacked for " + dmg + " damage!");

            // check to see if we need to use a potion (if player's health is 20% of max health or less)
            if (dCtrl.currentPlayer.hp <= (0.2 * dCtrl.currentPlayer.maxhp)) {
                // we have potions available, so use one
                if (dCtrl.currentPlayer.inv.Potion > 0) {
                    // decremement number of potions
                    dCtrl.currentPlayer.inv.Potion--;

                    // increase health by 25
                    dCtrl.currentPlayer.hp += 25;
                }
            }

            // check if hit will kill monster
            if (dCtrl.currentRoom.monster.hp - dmg <= 0) {
                dCtrl.currentRoom.monster.hp = 0;

                // player leveled up
                if (dCtrl.currentPlayer.exp + dCtrl.currentRoom.monster.maxhp >= 100) {
                    // increment player level
                    dCtrl.currentPlayer.level++;
                    //dCtrl.currentPlayer.exp = 0; reset exp to 0

                    // add leftover exp to next level
                    var leftoverExp = (dCtrl.currentPlayer.exp + dCtrl.currentRoom.monster.maxhp) - 100;
                    dCtrl.currentPlayer.exp = leftoverExp;
                }
                // player did not level up
                else {
                    // increase player exp
                    dCtrl.currentPlayer.exp += dCtrl.currentRoom.monster.maxhp;
                }

                // update player inventory with new items gained
                dCtrl.currentRoom.items.forEach(function (item, index) {
                    //console.log("This is the item: ", item);

                    // item is a consumable - so it needs to be added to the inventory
                    if (item.type == "Consumable") {
                        dCtrl.currentPlayer.inv[item.name] ? dCtrl.currentPlayer.inv[item.name]++ : dCtrl.currentPlayer.inv[item.name] = 1;
                    }
                    // item is a weapon, so check if it is an upgrade and equip it if so
                    else if (item.type == "Weapon") {
                        var newDps = item.damage / item.speed;
                        //var oldDps = dungeonController.currentPlayer.equipment.weapon

                        // check if dps upgrade
                        if (newDps > dCtrl.currentPlayer.dps) {
                            // equip new weapon
                            dCtrl.currentPlayer.equipment.Weapon = item;

                            // update dps
                            dCtrl.currentPlayer.dps = newDps;

                            // update attack speed interval (cancel old one, and restart with new weapon speed)
                            $interval.cancel(dCtrl.playerAttack);
                            dCtrl.playerAttack = $interval(dCtrl.attackMonster, dCtrl.currentPlayer.equipment.Weapon.speed);
                        }
                    }
                    // item is a piece of armor, so check if it is an upgrade and equip it if so
                    else if (item.type == "Armor") {
                        // get new item's armor slot
                        var as = item.slot;

                        // check if armor upgrade
                        if (item.armorClass > dCtrl.currentPlayer.equipment[as].armorClass) {
                            // update new total AC
                            // subtract old AC
                            dCtrl.currentPlayer.ac -= dCtrl.currentPlayer.equipment[as].armorClass;

                            // add new AC
                            dCtrl.currentPlayer.ac += item.armorClass;

                            // equip new armor
                            dCtrl.currentPlayer.equipment[as] = item;
                        }
                    }


                    // if(dCtrl.currentPlayer.inv[item])
                    // {
                    //     console.log("Item exists!");
                    //     dCtrl.currentPlayer.inv[item]++; 
                    // }
                    // else
                    // {
                    //     console.log("Item does not exist!");
                    //     dCtrl.currentPlayer.inv[item] = 1;
                    // }
                });

                // improper way to loop through arrays
                // meant for iterating through object properties
                // for (item in dCtrl.currentRoom.items)
                // {
                //     console.log("This is the item: ", dCtrl.currentRoom.items[item]);
                //   
                // }

                // print current player's inventory
                console.log("Current inventory:");
                for (let item in dCtrl.currentPlayer.inv) {
                    console.log(item + ": " + dCtrl.currentPlayer.inv[item]);
                }

                // monster died - move to next room
                dCtrl.nextRoom();

            }
            else {
                // decremement monster hp
                dCtrl.currentRoom.monster.hp -= dmg;
            }


        }
        // miss
        else {
            console.log(dCtrl.currentPlayer.name + " missed!");
        }
    }

    // monster attacks player
    dCtrl.attackPlayer = function () {
        //console.log("Attacking player!");

        // hit - based on player's total AC
        // base AC is 10 which is a 10% chance for the monster to miss (or player dodge)
        if (Math.random() > (dCtrl.currentPlayer.ac / 100)) // if roll is higher than chance to miss, it's a hit
        {
            var dmg = Math.floor(Math.random() * 5) + 1;
            console.log(dCtrl.currentRoom.monster.type + " attacked for " + dmg + " damage!");

            // decrememnt monster hp
            //dCtrl.currentPlayer.hp -= dmg;

            // check if hit will kill player
            if (dCtrl.currentPlayer.hp - dmg <= 0) {
                dCtrl.currentPlayer.hp = 0;

                // player died
                $interval.cancel(dCtrl.playerAttack);
                $interval.cancel(dCtrl.monsterAttack);

                // display retry button
            }
            else {
                // decremement player hp
                dCtrl.currentPlayer.hp -= dmg;
            }
        }
        // miss
        else {
            console.log(dCtrl.currentRoom.monster.type + " missed!");
        }
    }

    function romanize(num) {
        var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
        for (i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }

    dCtrl.upgradeHealth = function () {
        console.log("Health upgraded!");

        if(dCtrl.currentPlayer.inv['Gold'] >= 1)
        {
            dCtrl.currentPlayer.inv['Gold'] -= 1;
            dCtrl.currentPlayer.maxhp += 10;
        }
        else
        {
            console.log('Not enough gold!');
        }
    }

}