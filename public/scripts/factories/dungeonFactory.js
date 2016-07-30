angular.module('SpoopyDungeon')
    .factory('DungeonFactory', [
        '$http',
        dungeonFactory
    ]);

// Dungeon Factory
function dungeonFactory($http) {

    // Define my constructors and data arrays
    var rooms = [];
    var players = [];
    var monsters = [];

    class Player {
        constructor(playerInfo) {
            this.name = playerInfo.name;
            // this.class = playerInfo.class;
            this.maxhp = playerInfo.maxhp;
            this.hp = playerInfo.hp;
            this.level = 1;
            this.exp = 0;
            this.inv = {};
            this.equipment = {
                Head: { name: 'None', type: 'Armor', armorClass: 0, slot: 'Head' },
                Chest: { name: 'None', type: 'Armor', armorClass: 0, slot: 'Chest' },
                Hands: { name: 'None', type: 'Armor', armorClass: 0, slot: 'Hands' },
                Legs: { name: 'None', type: 'Armor', armorClass: 0, slot: 'Legs' },
                Feet: { name: 'None', type: 'Armor', armorClass: 0, slot: 'Feet' },
                Weapon: { name: 'Fists', type: 'Weapon', damage: 5, speed: 1000 }, // unarmed damage and speed
            };
            this.dps = 0;
            this.ac = 10; // starting ac is 10 (base 10% chance to dodge)
            players.push(this);
        }
        save(){
            if(this._id){
                $http.post(`/api/chars/${this._id}`)
                    .then(function(){
                        console.log('DONE update');    
                });
            }
            else{
                $http.post('/api/chars', this)
                    .then(function(){
                        console.log('DONE Save');    
                });
                
            }
        }
    }
    class Monster {
        constructor(monsterInfo) {
            this.type = monsterInfo.type;
            this.maxhp = monsterInfo.maxhp;
            this.hp = monsterInfo.hp;
            monsters.push(this);
        }
    }

    // ES6 Syntax
    class Room {
        constructor(roomInfo) {
            this.description = roomInfo.description;
            this.items = roomInfo.items;
            this.monster = roomInfo.monster;
            this.player = roomInfo.player
            rooms.push(this);
        }
    }

    // Items
    class Item {
        constructor(itemInfo) {
            this.name = itemInfo.name;
            this.type = itemInfo.type;
        }
    }

    class Weapon extends Item {
        constructor(weaponInfo) {
            super(weaponInfo);
            this.damage = weaponInfo.damage;
            this.speed = weaponInfo.speed;
        }
    }

    class Armor extends Item {
        constructor(armorInfo) {
            super(armorInfo);
            this.armorClass = armorInfo.armorClass;
            this.slot = armorInfo.slot;
        }
    }

    var consumableItems = [
        'Gold',
        'Potion',
        'Key',
        'Food',
        'Water',
        'Lockpick',
        'Porkyball',
    ]

    var weaponNames = [
        'Sword',
        'Axe',
        'Dagger',
        'Staff',
        'Mace',
    ];

    var armorSlots = [
        'Head',
        'Chest',
        'Hands',
        'Legs',
        'Feet',
    ];

    var armorNames = [
        'Helmet',
        'Chestplate',
        'Gauntlets',
        'Greaves',
        'Boots',
    ];

    var equipmentSlots = [
        'Head',
        'Chest',
        'Hands',
        'Legs',
        'Feet',
        'Weapon',
    ];

    // You Could Optionally Generate Seed Data!
    // new Monster()

    // Could hold banks of data for random choosings
    var monsterTypes = [
        'Kobold',
        'Beholder',
        'Skeltals',
        'Spoopy Skeltals',
        'Snerks',
        'Undead Telemarketers',
        'Mr. Skeltal',
        'Gnoll',
        'Goblin',
        'Troll',
        'Zombie',
        'Porkyman',
    ]

    var roomDescriptions = [
        'This room sucks! It smells bad and everything!',
        'This room is awesome! Phat l00tz galore!',
        'This room is pretty terrible!',
        'This room seems familiar for some reason!',
        'This room reminds you of a big pile of crap!',
    ];

    return {
        // Constructors
        Player: Player,
        Monster: Monster,
        Room: Room,
        Item: Item,
        Weapon: Weapon,
        Armor: Armor,

        // Arrays
        rooms: rooms,
        players: players,
        monsters: monsters,

        monsterTypes: monsterTypes,
        roomDescriptions: roomDescriptions,

        consumableItems: consumableItems,
        weaponNames: weaponNames,
        armorSlots: armorSlots,
        armorNames: armorNames,
        equipmentSlots: equipmentSlots,
    }
}


