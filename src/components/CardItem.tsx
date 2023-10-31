import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import CardTooltip from './CardTooltip';
import { Dialog } from 'primereact/dialog';
import CardView from './CardView';
import DetailedView from './DetailedView';

interface CardItemProps {
  card: Card;
  onClick?: (card: Card) => void;
}
interface Mechanic {
  name: string;
}
export interface Card {
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
      case 'Neutral':
          return 'info';
      default:
          return null;
  }
};



export function CardPopUp(props: {card: Card; open: any; onClose: any;}) {
  const { open, onClose, card } = props
  const footerContent = (
    <div>
        <Button label="Yes" icon="pi pi-check" onClick={onClose} autoFocus />
    </div>
  );

  return (
    <Dialog open ={open} onClose={onClose} header="Header" visible={open} style={{ width: '50vw' }} onHide={onClose} footer={footerContent}>
    <p>{card.name}</p>
    </Dialog>
  )
}

function addCardToDeck(event){
  event.stopPropagation();
}


export const ListItem: React.FC<CardItemProps>  = ({card, onClick}) => {
  const handleItemClick = () => {
    if (onClick) {
      onClick(card);
    }
  };
  return (
    <div className="col-12" onClick={handleItemClick}>
        <div className="flex rem flex-row xl:align-items-start p-4 gap-4" >
            <img className="w-10rem shadow-2 block xl:block mx-auto border-round align-items-center" src={card.img} alt={card.name} />
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                <div className="text-2xl font-bold text-900">{card.name}</div>
                  {/* <Rating stars={card.attack} value={card.attack} readOnly cancel={false}></Rating> */}
                  <div className="flex align-items-center gap-3">
                    <span className="flex align-items-center gap-2">
                      <i className="pi pi-book"></i>
                      <span className="font-semibold">{card.cardSet}</span>
                    </span>
                    <Tag value={card.faction ? card.faction.toString() : "None"} severity={getSeverity(card)}></Tag>
                  </div>
                  <div>
                    <p className='p-0 m-0'>
                      {card.attack ? "Attack: " + card.attack.toString() : "No attack"}</p>
                    <p>{card.health ? "Health: " + card.health.toString() : "No health"}</p>
                  </div>
                </div>
              <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                  <span className="text-2xl font-semibold">{card.cost ? "Cost: " + card.cost.toString() : "No cost"}</span>
                  <Button icon="pi pi-plus" className="p-button-rounded" onClick={addCardToDeck} disabled={card.faction === 'OUTOFSTOCK'}></Button>
              </div>
            </div>  
          </div> 
        </div>
  );
};

export const GridItem: React.FC<CardItemProps>  = ({card, onClick}) => {
  const handleItemClick = () => {
    if (onClick) {
      onClick(card);
    }
  };
  return (
      <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2" onClick={handleItemClick}>
          <div className="p-4 border-1 surface-border surface-card border-round">
              <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                  <div className="flex align-items-center gap-2">
                      <i className="pi pi-book"></i> <span className="font-semibold">{card.cardSet}</span>
                  </div>
                  <Tag value={card.faction ? card.faction.toString() : "None"} severity={getSeverity(card)}></Tag>
              </div>
              <div className="flex flex-column align-items-center gap-3 py-5">
                  <img className={"w-9 shadow-2 border-round" + " " + card.cardId} src={card.img} alt={card.name} />
                  <div className="text-xl font-bold">{card.name}</div>
                  {/* <Rating stars={card.attack} value={card.attack} readOnly cancel={false}></Rating> */}
                  <div>
                      <CardTooltip card={card}></CardTooltip>
                      <p className='p-0 m-0 align-items-center'>{card.attack ? "Attack: " + card.attack.toString() : "No attack"}</p>
                      <p>{card.health ? "Health: " + card.health.toString() : "No health"}</p>
                  </div>
              </div>
              <div className="flex align-items-center justify-content-between">
                  <span className="text-2xl font-semibold">{card.cost ? "Cost: " + card.cost.toString() : "No cost"}</span>
                  <Button icon="pi pi-plus" className="p-button-rounded" onClick={addCardToDeck} disabled={card.faction === 'OUTOFSTOCK'}></Button>
              </div>
          </div>
      </div>
  );
};

