import allCards from "../data/allcards.json";
export const CardService = {
  getCardsData() {
    //Replace this with apollo code
    return null
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
  },
};
