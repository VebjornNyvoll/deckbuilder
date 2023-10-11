import allCards from "../data/allcards.json";


export const HearthStoneInfo = {
    getCardsData() {
        const data =(allCards as any).Classic.filter((card: any) => 'img' in card).slice(0, 20) 
        return data;
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