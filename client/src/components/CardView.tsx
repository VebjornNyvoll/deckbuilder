import { useState, useEffect } from "react";
import { CardService } from "../service/CardService";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

import { ListItem, GridItem, Card, CardPopUp } from "./CardItem";

interface SortOption {
  label: string;
  value: string;
}

export default function CardView() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popCard, pressedCard] = useState<Card>();
  const [layout, setLayout] = useState<
    "grid" | "list" | (string & Record<string, unknown>)
  >("grid");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1>(0);
  const [sortField, setSortField] = useState<string>("");
  const sortOptions: SortOption[] = [
    { label: "Cost: High to Low", value: "!cost" },
    { label: "Cost: Low to High", value: "cost" },
  ];

  useEffect(() => {
    CardService.getCards().then((data) => setCards(data.slice(0, 25)));
  }, []);

  const onSortChange = (event: DropdownChangeEvent) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const openDialog = (card: Card) => {
    pressedCard(card); //Save what card is pressed
    setIsDialogOpen(true); //Set to true so it will show dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const itemTemplate = (card: Card, layout: string) => {
    const handleClick = (card: Card) => {
      //To send parameter card with the onClick, we have handleClick const that takes in card and send to open dialog. Can not do directly!
      openDialog(card);
    };

    if (!card) {
      return;
    }
    if (layout === "list") {
      return <ListItem card={card} onClick={handleClick} />;
    } //onClick is defined in CardItemProps to take in card param and return void, (to match handleClick)
    else if (layout === "grid") {
      return <GridItem card={card} onClick={handleClick} />;
    }
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <Dropdown
          options={sortOptions}
          value={sortKey}
          optionLabel="label"
          placeholder="Sort By Cost"
          onChange={onSortChange}
          className="w-full sm:w-14rem"
        />
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <DataView
        value={cards}
        itemTemplate={itemTemplate}
        sortField={sortField}
        sortOrder={sortOrder}
        layout={layout}
        header={header()}
      />
      {popCard && (
        <CardPopUp
          card={popCard}
          open={isDialogOpen}
          onClose={closeDialog}
        ></CardPopUp>
      )}
    </div>
  );
}
