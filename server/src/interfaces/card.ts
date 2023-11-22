import { IMechanics } from './mechanics';
interface ICard {
  cardId: string;
  dbfId: number;
  name: string;
  cardSet: string;
  type: string;
  text: string;
  playerClass: string;
  locale: string;
  faction: string;
  mechanics: IMechanics[];
  cost: number;
  attack: number;
  health: number;
  flavour: string;
  artist: string;
  elite: boolean;
  rarity: string;
  spellSchool: string;
  race: string;
  img: string;
  durability: number;
  collectible: string;
  imgGold: string;
  otherRaces: string;
  howToGetSignature: string;
  armor: string;
  howToGet: string;
  howToGetGold: string;
  howToGetDiamond: string;
  multiClassGroup: string;
  classes: [string];
}

export { ICard };
