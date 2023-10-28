import { IMechanics } from "./mechanics"
interface ICard {
    cardId: String
    dbfId: Number
    name: String
    cardSet: String
    type: String
    text: String
    playerClass: String
    locale: String
    faction: String
    mechanics: IMechanics[]
    cost: Number
    attack: Number
    health: Number
    flavour: String
    artist: String
    elite: Boolean
    rarity: String
    spellSchool: String
    race: String
    img: String
    durability: Number
    collectible: String
    imgGold: String
    otherRaces: String
    howToGetSignature: String
    armor: String
    howToGet: String
    howToGetGold: String
    howToGetDiamond: String
    multiClassGroup: String
    classes: [String]
}
export {ICard}