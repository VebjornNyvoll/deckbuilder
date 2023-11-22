import { useRef, useState, useEffect } from "react";
import { DataView } from "primereact/dataview";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { GridItem, ListItem } from "../components/CardItem";
import { DeckService } from "../service/DeckService";


export default function Deck() {
  const [visible, setVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState([]);
  const [deckName, setDeckName] = useState("value");
  
  interface IDeck {
    id: string;
    deckName: string;
  }
  
  const [deckData, setData] = useState(Array<IDeck>);

  const handleDeckSelect = (id) => {
    DeckService.getCardsInDeck(id).then((result) => {
      setCards(result);
    });
  };

  const [cards, setCards] = useState([]);

  const itemTemplate = (card: Card, layout: string) => {
    const handleClick = (card: Card) => {
      openDialog(card);
    };

    if (!card) {
      return;
    }
    if (layout === "list") {
      return <ListItem card={card} onClick={handleClick} />;
    } else if (layout === "grid") {
      return <GridItem card={card} onClick={handleClick} />;
    }
  };

  const clearCreateDeck = () => {
    setVisible(false);
    setDeckName("");
  };

  const handleCreateDeck = async () => {
    await DeckService.createDeck(deckName);
    clearCreateDeck();
  };

  const deleteDeck = async (id: string) => {
    const deckData = await DeckService.deleteDeck(id);
    console.log(deckData, "deletion");

    setData(deckData);
  };

  useEffect(() => {
    DeckService.getDecks().then((decks) => {
      console.log(decks, "Useeffect");
      setData(decks);
    });
  });

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="danger"
        onClick={() => clearCreateDeck()}
        className="p-button-text"
      />
      <Button
        label="Create deck"
        severity="success"
        icon="pi pi-check"
        onClick={() => handleCreateDeck()}
        autoFocus
      />
    </div>
  );

  const items = [
    {
      label: "My decks",
      items: deckData.map((deck) => ({
        template: (item, options) => {
          return (
            <div className="card flex justify-content-center">
              <Button
                label={deck.deckName}
                onClick={(e) => handleDeckSelect(deck.id)}
                className={classNames(
                  options.className,
                  "w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
                )}
              ></Button>
              <i
                className="flex p-2 pl-4 text-color hover:surface-200 border-noround pi pi-trash"
                onClick={() => deleteDeck(deck.id)}
              ></i>
            </div>
          );
        },
        icon: (
          <div
            className="pi pi-trash"
            style={{ padding: "5px" }}
            onClick={() => deleteDeck(deck.id)}
          >
            Delete deck
          </div>
        ),
        command: () => handleDeckSelect(deck.id),
      })),
    },
    {
      label: "Options",
      items: [
        {
          command: (e) => {
            setVisible(true);
          },
          template: (item, options) => {
            return (
              <div className="card flex justify-content-center">
                <Button
                  icon="pi pi-plus-circle"
                  onClick={(e) => options.onClick(e)}
                  className={classNames(
                    options.className,
                    "w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
                  )}
                >
                  <p className="p-2">New deck</p>
                </Button>
              </div>
            );
          },
        },
      ],
    },
  ];
  const toast = useRef<Toast>(null);

  return (
    <>
      {/* <p>{cards}</p> */}
      <div className="flex">
        <Toast ref={toast} />
        <Menu id="deckMenu" model={items} />
        <Dialog
          header="Create new deck"
          footer={footerContent}
          modal={false}
          visible={visible}
          onHide={() => setVisible(false)}
          draggable={false}
          resizable={false}
          position="left"
        >
          <InputText
            placeholder="Deck name"
            className="w-full mb-3"
            onChange={(e) => (setDeckName(e.target.value))}
          />
        </Dialog>

        <div className="w-12">
          <DataView value={cards} itemTemplate={itemTemplate} />
        </div>
      </div>
      {errors.map(function (error) {
        return (
          <>
            {setErrors([...new Set(errors)])};
            {toast.current?.replace({
              severity: "error",
              summary: "Error Message",
              detail: error.message ? error.message : error,
            })}
            ;{setErrors([])};
          </>
        );
      })}
    </>
  );
}
