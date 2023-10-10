export const HearthStoneInfo = {
    getCardsData() {
        return [
            {
                id: 1,
                image:'',
                name: 'Boulderfist Ogre',
                attack: 6,
                health: 7,
                type: 'Minion',
                rarity: 'Common',
                mana: 6,
                description: 'None'
            },
            {
                id: 2,
                image:'',
                name: 'Fireball',
                attack: 0,
                health: 0,
                type: 'Spell',
                rarity: 'Common',
                mana: 4,
                description: 'Deal 6 damage'
            },
            {
                id: 3,
                image:'',
                name: 'Flamestrike',
                attack: 0,
                health: 0,
                type: 'Spell',
                rarity: 'Common',
                mana: 7,
                description: 'Deal 4 damage to all enemy minions'
            },
            {
                id: 4,
                image:'',
                name: 'Frostbolt',
                attack: 0,
                health: 0,
                type: 'Spell',
                rarity: 'Common',
                mana: 2,
                description: 'Deal 3 damage to a character and freeze it'
            },
        ];
    },

    getCardInfoWithRating() {
        return [
            {

            }
        ];
    },

    getCards() {
        return Promise.resolve(this.getCardsData());
    },
}