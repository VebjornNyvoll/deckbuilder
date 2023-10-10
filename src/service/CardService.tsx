export const CardService = {
    getCardsData() {
        return [
            {
                cardId: "EX1_116",
                dbfId: 559,
                name: "Leeroy Jenkins",
                cardSet: "Hall of Fame",
                type: "Minion",
                faction: "Alliance",
                rarity: "Legendary",
                cost: 5,
                attack: 6,
                health: 2,
                text: "<b>Charge</b>. <b>Battlecry:</b> Summon two 1/1 Whelps for your opponent.",
                flavor: "At least he has Angry Chicken.",
                artist: "Gabe from Penny Arcade",
                collectible: true,
                elite: true,
                playerClass: "Neutral",
                img: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/7740c50c88d17b12c3eccbf1c57af9163929add6c63bba7fbad663f574bc6307.png",
                imgGold: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/cf21572abd2583e7520733ac221c35fd5aeb5d700de9b43895712a74c2c68eb4.png",
                locale: "enUS",
                mechanics: [
                    {name: "Charge"},
                    {name: "Battlecry"}
                ],
            },
        ];
    },

    getCardsMini() {
        return Promise.resolve(this.getCardsData().slice(0, 5));
    },

    getCardsSmall() {
        return Promise.resolve(this.getCardsData().slice(0, 10));
    },

    getCards() {
        return Promise.resolve(this.getCardsData());
    },

    getCardsWithOrdersSmall() {
        return Promise.resolve(this.getCardsWithOrders().slice(0, 10));
    },

    getCardsWithOrders() {
        return Promise.resolve(this.getCardsWithOrders());
    }
};

