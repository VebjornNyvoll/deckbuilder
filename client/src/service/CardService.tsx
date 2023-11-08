import allCards from "../data/allcards.json";
export const CardService = {
  getCardsData() {
    // const mergedCards = Object.values(allCards as any).reduce(
    //   (acc: any[], currentArray: any[]) => {
    //     const filteredCards = currentArray.filter((card: any) => "img" in card);
    //     console.log(filteredCards);
    //     return acc.concat(filteredCards);
    //   },
    //   [],
    // );
    return null;
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
