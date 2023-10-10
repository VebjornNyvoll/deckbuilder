import React, { useState, useEffect } from 'react';
import { CardService } from '../service/CardService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import placeholder from '../img/placeholder.jpg';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface SortOption {
    label: string;
    value: string;
}

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

export default function CardView() {
    const [cards, setCards] = useState<Card[]>([]);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<number>(0);
    const [sortField, setSortField] = useState<string>('');
    const sortOptions: SortOption[] = [
        { label: 'Cost: High to Low', value: '!cost' },
        { label: 'Cost: Low to High', value: 'cost' }
    ];

    useEffect(() => {
        CardService.getCards().then((data) => setCards(data.slice(0, 12)));
    }, []);

    const getSeverity = (card: Card) => {
        switch (card.faction) {
            case 'Alliance':
                return 'success';
            case 'Scourge':
                return 'success';
            case 'Explorer':
                return 'warning';
            case 'Legion':
                return 'warning';
            case 'Horde':
                return 'danger';
            case 'Empire':
                 return 'danger';
            case 'Pirate':
                return 'danger';
            default:
                return null;
        }
    };

    const onSortChange = (event: DropdownChangeEvent) => {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          setSortOrder(-1);
          setSortField(value.substring(1, value.length));
          setSortKey(value);
      } else {
          setSortOrder(1);
          setSortField(value);
          setSortKey(value);
      }
  };


    const listItem = (card: Card) => {
        return (
            <div className="col-12">
                <div className="flex rem flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-10rem shadow-2 block xl:block mx-auto border-round" src={placeholder} alt={card.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{card.name}</div>
                            {/* <Rating stars={card.attack} value={card.attack} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-book"></i>
                                    <span className="font-semibold">{card.cardSet}</span>
                                </span>
                                <Tag value={card.faction} severity={getSeverity(card)}></Tag>
                            </div>
                            <div>
                                <p className='p-0 m-0'>Attack: {card.attack}</p>
                                <p>Health: {card.health}</p>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">Cost: {card.cost}</span>
                            <Button icon="pi pi-plus" className="p-button-rounded" disabled={card.faction === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (card: Card) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-book"></i>
                            <span className="font-semibold">{card.cardSet}</span>
                        </div>
                        <Tag value={card.faction} severity={getSeverity(card)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={placeholder} alt={card.name} />
                        <div className="text-2xl font-bold">{card.name}</div>
                        {/* <Rating stars={card.attack} value={card.attack} readOnly cancel={false}></Rating> */}
                        <div>
                            <p className='p-0 m-0'>Attack: {card.attack}</p>
                            <p>Health: {card.health}</p>
                            <p>{card.flavor}</p>
                        </div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">Cost: {card.cost}</span>
                        <Button icon="pi pi-plus" className="p-button-rounded" disabled={card.faction === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (card: Card, layout: string) => {
        if (!card) {
            return;
        }
        if (layout === 'list') return listItem(card);
        else if (layout === 'grid') return gridItem(card);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Cost" onChange={onSortChange} className="w-full sm:w-14rem" />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };


    return (
        <div className="card">
            <DataView value={cards} itemTemplate={itemTemplate} sortField={sortField} sortOrder={sortOrder} layout={layout} header={header()} />
        </div>
    )
}