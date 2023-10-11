import { useState, useEffect } from 'react';
import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import placeholder from './img/placeholder.jpg';
import { HearthStoneInfo } from './service/HearthStoneInfo';

import { Tooltip } from 'primereact/tooltip';


interface Mechanic {
    name: string;
}

interface HearthStoneCardProps {
    cardId?: string;
    dbfId?: number;
    name?: string;
    cardSet?: string;
    type?: string;
    faction?: string;
    rarity?: string;
    cost?: number;
    attack?: number;
    health?: number;
    text?: string;
    flavor?: string;
    artist?: string;
    collectible?: boolean;
    elite?: boolean;
    playerClass?: string;
    img?: string;
    imgGold?: string;
    locale?: string;
    mechanics?: Mechanic[];
    spellSchool?: string;
    race?:string;
}


const BasicDemo: React.FC<HearthStoneCardProps> =   () => {
    const [layout, setLayout] = useState('grid');
    const [cards, setCards] = useState<HearthStoneCardProps[]>();


    useEffect(() => {
        const fetchData = async () => {
            setCards(await HearthStoneInfo.getCards())
        }
        fetchData();
    }, [])

    console.log(cards);
    


    const listItem = (card: HearthStoneCardProps) => {
        return (
            <div className="col-12">
                <div className="flex flex-column rem xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={card.img} alt={card.name} />
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{card.name}</div>
                        <div className="flex align-items-center gap-3">
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{card.type}</span>
                        </span>
                            <Tag value={card.rarity}></Tag>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">Attack: {card.attack} </span>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (card: HearthStoneCardProps) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                           
                            <span className="font-semibold">{card.artist ? card.artist : "No artist"}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={card.img ? card.img : placeholder} alt={card.cardId} />
                        <div className="text-2xl font-bold">{card.name}</div>
                        
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">Attack: {card.attack}</span>

                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (card: HearthStoneCardProps, layout: string) => {
        if (!card) {
            return;
        }

        if (layout === 'list') return listItem(card);
        else if (layout === 'grid') return gridItem(card);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={cards} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
}

export default BasicDemo