import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardService } from '../service/CardService';
import { Card } from './CardView';
interface Review {
    user: string;
    rating: number;
    comment: string;
}

export default function DetailedView() {
    const { cardId } = useParams();
    const [card, setCard] = useState<Card | null>(null);
    const [reviews, /*setReviews*/] = useState<Review[]>([
        { user: "John", rating: 4, comment: "Great card!" },
        { user: "Jane", rating: 3, comment: "It's alright." },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const allCards = await CardService.getCards();
            const foundCard = allCards.find((c) => c.cardId === cardId);
            if (foundCard) {
                setCard(foundCard);
            }
        };

        fetchData();
    }, [cardId]);

    if (!card) return <div>Loading...</div>;

    return (
        <div className="detailed-view">
            <h1>{card.name}</h1>

            {/* Card Information */}
            <div className="card-information">
                <img src={card.img} alt={card.name} />
                <div className="card-properties">
                    <p>Card Set: {card.cardSet}</p>
                    <p>Type: {card.type}</p>
                    <p>Faction: {card.faction}</p>
                    <p>Rarity: {card.rarity}</p>
                    <p>Cost: {card.cost ? card.cost : 'N/A'}</p>
                    <p>Attack: {card.attack ? card.attack : 'N/A'}</p>
                    <p>Health: {card.health ? card.health : 'N/A'}</p>
                </div>
            </div>

            {/* User Ratings and Reviews */}
            <div>
                <h2>Reviews:</h2>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <h3>{review.user}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
