import { useRef, useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Menu } from 'primereact/menu';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { GridItem, ListItem, CardPopUp, Card } from '../components/CardItem';
import { DeckService } from '../service/DeckService';
import { useAppSelector, useAppDispatch } from '../service/hooks';
import { showDecks } from '../service/navbar/deckSlice';
import { Sidebar } from 'primereact/sidebar';

export default function Deck() {
  const [visible, setVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState([]);
  const layout = useAppSelector((state) => state.layout.layout);
  const [dialogState, setDialogState] = useState({ isOpen: false, id: '' });
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);

  interface IDeck {
    id: string;
    deckName: string;
  }

  const dispatch = useAppDispatch();
  const showExtraNavItem = useAppSelector((state) => state.deck.triggerShowDeckEvent);
  useEffect(() => {
    if (showExtraNavItem) {
      setSidebarVisible(true);
    }
  }, [showExtraNavItem, dispatch]);

  const [deckData, setData] = useState(Array<IDeck>);

  const handleDeckSelect = (id: string) => {
    DeckService.getCardsInDeck(id).then((result) => {
      setCards(result);
    });
  };

  const [cards, setCards] = useState([]);
  const openDialog = (card: Card) => {
    setDialogState({ isOpen: true, id: card.id });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, id: undefined });
  };

  const itemTemplate = (card: Card, layout: string) => {
    if (!card) {
      return;
    }
    if (layout === 'list') {
      return <ListItem card={card} onClick={() => openDialog(card)} />;
    } else if (layout === 'grid') {
      return <GridItem card={card} onClick={() => openDialog(card)} />;
    }
  };

  const clearCreateDeck = () => {
    setVisible(false);
    document.getElementById('deckName')?.setAttribute('value', '');
  };

  const handleCreateDeck = async () => {
    const deckName = (document.getElementById('deckName') as HTMLInputElement).value;
    await DeckService.createDeck(deckName);
    clearCreateDeck();
  };

  const deleteDeck = async (id: string) => {
    const deckData = await DeckService.deleteDeck(id);

    if (deckData.decks != null) {
      setData(deckData.decks);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    DeckService.getDecks().then((decks) => {
      setData(decks);
    });
  });

  // footer for creating a new deck
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
        data-testid="createDeckButton"
      />
    </div>
  );

  const items = [
    //Show all decks available
    {
      label: 'My decks',
      items: deckData.map((deck) => ({
        template: (item, options) => {
          return (
            <div className="card flex justify-content-center">
              <Button
                label={deck.deckName}
                onClick={() => handleDeckSelect(deck.id)}
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
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
          <div className="pi pi-trash" style={{ padding: '5px' }} onClick={() => deleteDeck(deck.id)}>
            Delete deck
          </div>
        ),
        command: () => handleDeckSelect(deck.id),
      })),
    },
    {
      label: 'Options',
      items: [
        {
          command: () => {
            setVisible(true);
          },
          template: (item, options) => {
            return (
              <div className="card flex justify-content-center">
                <Button
                  icon="pi pi-plus-circle"
                  onClick={(e) => options.onClick(e)}
                  data-testid="newDeckButton"
                  className={classNames(
                    options.className,
                    'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
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
      <div className="flex">
        <Toast ref={toast} />
        <Sidebar
          visible={sidebarVisible}
          onHide={() => {
            setSidebarVisible(false);
            dispatch(showDecks(false));
          }}
        >
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
            <InputText placeholder="Deck name" className="w-full mb-3" id="deckName" />
          </Dialog>
        </Sidebar>
        <div className="w-12">
          <DataView
            value={cards}
            emptyMessage="Please select a deck from the sidebar."
            itemTemplate={itemTemplate}
            layout={layout}
          />
          {dialogState.id && <CardPopUp cardId={dialogState.id} open={dialogState.isOpen} onClose={closeDialog} />}
        </div>
      </div>
      {errors.map(function (error) {
        return (
          <>
            {setErrors([...new Set(errors)])};
            {toast.current?.replace({
              severity: 'error',
              summary: 'Error Message',
              detail: error.message ? error.message : error,
            })}
            ;{setErrors([])};
          </>
        );
      })}
    </>
  );
}
