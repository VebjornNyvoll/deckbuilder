import React, { useRef, useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import CardTooltip from "./CardTooltip";
import { Dialog } from "primereact/dialog";
import parse from "html-react-parser";
import {CardOverlayComponent} from "./CardOverlayComponent";
import { OverlayPanel } from "primereact/overlaypanel";
import { useAppSelector, useAppDispatch } from "../service/hooks";

interface CardItemProps {
  card: Card;
  onClick?: (card: Card) => void;
}
interface Mechanic {
  name: string;
}
export interface Card {
  id: string;
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
    case "Alliance":
      return "success";
    case "Scourge":
      return "success";
    case "Explorer":
      return "warning";
    case "Legion":
      return "warning";
    case "Horde":
      return "danger";
    case "Empire":
      return "danger";
    case "Pirate":
      return "danger";
    case "Neutral":
      return "info";
    default:
      return null;
  }
};

export function CardPopUp(props: { card: Card; open: any; onClose: any }) {
  const { open, onClose, card } = props;
  
  
  
  const footerContent = (
    <div>
      <Button
        icon="pi pi-plus"
        style={{ padding: "15px" }}
        className="p-button-rounded"
        onClick={addCardToDeck}
        autoFocus
      ></Button>
    </div>
  );
  const headerContent = <div style={{ textAlign: "center" }}>{card.name}</div>;

  return (
    <Dialog
      headerStyle={{ height: "70px" }}
      header={headerContent}
      visible={open}
      style={{ width: "60vw", maxWidth: "400px" }}
      onHide={onClose}
      footer={footerContent}
    >
      <div
        style={{
          justifyContent: "center",
          alignContent: "center",
          marginTop: "0px",
        }}
      >
        <p>Rarity: {card.rarity ? card.rarity : "no rarity"}</p>
        <p>
          Text: {parse(card.text ? card.text.replace("[x]", "") : "no text")}
        </p>
        <p>Flavor: {card.flavor ? card.flavor : "no flavor"}</p>
      </div>
    </Dialog>
  );
}


function addCardToDeck() {
  
  
}

export const ListItem: React.FC<CardItemProps> = ({ card, onClick }) => {

  const dataSaver = useAppSelector((state) => state.datasaver.datasaver);
  const op = useRef(null); 
  const showOverlayPanel = (event) => {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();
    if (op.current && op.current.toggle) {
      op.current.toggle(event);
    }
  };
  //The onClick as defined in Props must take in a argument card
  const handleItemClick = () => {
    if (onClick) {
      onClick(card);
    }
  };
  return (
    //Needs to send to const to do the onClick that has been sent.
    

    <div className="col-12" onClick={handleItemClick}>
      <div className="flex rem flex-row xl:align-items-start p-4 gap-4">
        {!dataSaver && (
          <img
            className="w-10rem shadow-2 block xl:block mx-auto border-round align-items-center"
            src={card.img}
            alt={card.name}
          />
        )}
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-2xl font-bold text-900">{card.name}</div>
            {/* Additional card details */}
            <div className="flex align-items-center gap-3">
              <span className="flex align-items-center gap-2">
                <i className="pi pi-book"></i>
                <span className="font-semibold">{card.cardSet}</span>
              </span>
              <Tag
                value={card.faction ? card.faction.toString() : "None"}
                severity={getSeverity(card)}
              ></Tag>
            </div>
            <div>
              <p className="p-0 m-0">
                {card.attack ? "Attack: " + card.attack.toString() : "No attack"}
              </p>
              <p>
                {card.health ? "Health: " + card.health.toString() : "No health"}
              </p>
            </div>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <span className="text-2xl font-semibold">
              {card.cost ? "Cost: " + card.cost.toString() : "No cost"}
            </span>
            <OverlayPanel ref={op} dismissable>
              <CardOverlayComponent op={op} cardId={card.id} />
            </OverlayPanel>
            <Button
              icon="pi pi-plus"
              className="p-button-rounded"
              onClick={showOverlayPanel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export const GridItem: React.FC<CardItemProps> = ({ card, onClick }) => {

  const dataSaver = useAppSelector((state) => state.datasaver.datasaver);
  const op = useRef(null); 
  const showOverlayPanel = (event) => {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation();
    if (op.current && op.current.toggle) {
      op.current.toggle(event);
    }
  };
  
  
  const handleItemClick = () => {
    if (onClick) {
      onClick(card);
    }
  };
  return (
    <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
    <div className="p-4 border-1 surface-border surface-card border-round">
      <div onClick={handleItemClick}>
        {/* Card details */}
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-book"></i>
            <span className="font-semibold text-xs">{card.cardSet}</span>
          </div>
          <Tag
            value={card.faction ? card.faction.toString() : "None"}
            severity={getSeverity(card)}
          ></Tag>
        </div>

        {/* Image and properties */}
        <div className="flex flex-column align-items-center gap-3 py-5">
          {!dataSaver && (
            <img
              className={"w-9 shadow-2 border-round" + " " + card.cardId}
              src={card.img}
              alt={card.name}
            />
          )}
          {dataSaver && (
            <>
              <div className="text-xl font-bold">{card.name}</div>
              <CardTooltip card={card}></CardTooltip>
              <p className="p-0 m-0 align-items-center">
                {card.attack ? "Attack: " + card.attack.toString() : "No attack"}
              </p>
              <p>
                {card.health ? "Health: " + card.health.toString() : "No health"}
              </p>
            </>
          )}
        </div>

        {/* Cost */}
        <div className="flex align-items-center justify-content-between">
          <span className="text-2xl font-semibold">
            {card.cost ? "Cost: " + card.cost.toString() : "No cost"}
          </span>
          <Button
        icon="pi pi-plus"
        className="p-button-rounded"
        onClick={showOverlayPanel}
      />
        </div>

        {/* Overlay Panel */}
        <OverlayPanel ref={op} dismissable>
          <CardOverlayComponent op={op} cardId={card.id} />
        </OverlayPanel>
      </div>
      
      {/* Button */}
      
    </div>
  </div>
  );
};
