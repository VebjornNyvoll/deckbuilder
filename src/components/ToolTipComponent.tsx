
import React, { useState } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';


interface Mechanic {
    name: string;
}
interface Card {
    cardId: string;
    dbfId: number;
    name: string;
    cardSet: string;
    type: string;
    faction: string;
    rarity: string;
    cost: number;
    attack: number;
    health: number;
    text: string;
    flavor: string;
    artist: string;
    collectible: boolean;
    elite: boolean;
    playerClass: string;
    img: string;
    imgGold: string | undefined;
    locale: string;
    mechanics: Mechanic[];
}

interface ToolTipProps {
    card: Card
}

const ToolTipComponent: React.FC<ToolTipProps> = ({ card }) => {
    const whitelistedKeys = ['cardId', 'name', 'type', 'faction', 'rarity']; // Add or remove keys as needed

    return (
        <div className="card">
            <Tooltip target={"." + card.cardId} autoHide={true}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        Object.entries(card)
                            .filter(([key]) => whitelistedKeys.includes(key))
                            .map(([key, value], index) => {
                                return (
                                    <div key={index} className="flex align-items-center mb-2">
                                        <span style={{ minWidth: '5rem' }}>{key}:</span>
                                        <span style={{ minWidth: '5rem' }}>{value}</span>
                                    </div>
                                );
                            })
                    }
                </div>
            </Tooltip>
        </div>
    );
        

}

export default ToolTipComponent




        