import { useRef, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import {useContext} from 'react';
import { AuthContext } from '../context/authContext';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { gql } from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Toast } from 'primereact/toast';
import { GridItem, ListItem } from '../components/CardItem';

export default function Deck() {
  const {user} = useContext(AuthContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [deckName, setDeckName] = useState('');
  const [errors, setErrors] = useState([]);

  const CREATE_DECK = gql`
  mutation createDeck($deckName: String!) {
    createDeck(deckName: $deckName) {
      username
    }
  }`;

  const GET_CARDS_IN_DECK = gql`
  query Cards {
  user {
    decks {
      cards {
        id
        cardId
        dbfId
        name
        cardSet
        type
        text
        playerClass
        locale
        faction
        mechanics {
          name
        }
        cost
        attack
        health
        flavour
        artist
        elite
        rarity
        spellSchool
        race
        img
        durability
        collectible
        imgGold
        otherRaces
        howToGetSignature
        armor
        howToGet
        howToGetGold
        howToGetDiamond
        multiClassGroup
        classes
      }
    }
  }
}`;


  const GET_DECKS = gql`
    query Decks {
  user {
    decks {
      deckName
      id
    } 
  }
}`;

// All cards
const { data: cardData } = useQuery(GET_CARDS_IN_DECK);

const handleDeckSelect = (index) => {
  setCards(cardData.user.decks[index].cards);
  console.log(cardData.user.decks[index].cards);
};

const [cards, setCards] = useState([]);

const [ createDeck, { loading }] = useMutation(CREATE_DECK,{
  onError({graphQLErrors}) {
      setErrors(graphQLErrors)
  },
  variables: {deckName: deckName}
});

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

const {loadingDecks, errorDecks, data} = useQuery(GET_DECKS);
  function Decks(){
    if (data)
      return (
        data.user.decks.map(deck => ({
          label: deck.deckName,
          icon: "pi pi-book"
        })));
    else return [{label: 'No decks', icon: "pi pi-book"}];
    } 

    const clearCreateDeck = () => {
      setVisible(false);
      setDeckName('');
    }

    const handleCreateDeck = () => {  
      createDeck();
      clearCreateDeck();
      window.location.reload();
    }

    const footerContent = (
      <div>
          <Button label="Cancel" icon="pi pi-times" severity="danger" onClick={() => clearCreateDeck()} className="p-button-text" />
          <Button label="Create deck" severity="success" icon="pi pi-check" onClick={() => handleCreateDeck()} autoFocus />
      </div>
  );

    const items: MenuItem = [
      {
        label:'My decks',
        items: Decks().map((deck, index) => ({
          label: (
            
            <Button
              className="w-full p-link text-color hover:surface-200 border-noround" name={deck.label} 
              onClick={(e) => handleDeckSelect(index)}
            >
              {deck.label}
            </Button>
          ),
          icon: 'pi pi-book'
        }))
      },
        {
          label:'Options',
          items:[
            { 
              command: (e) => { setVisible(true);
              console.log(e) },
              template: (item, options) => {
                  return (
                    <div className='card flex justify-content-center'>
                      <Button icon="pi pi-plus-circle" onClick={(e) => options.onClick(e)} className={classNames(options.className, 'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround')}>
                          <p className="p-2">New deck</p>
                      </Button>
                    </div>
                  )
          }}
          ]
        }
     
    ];
    const toast = useRef<Toast>(null);
    
    return (
      <>
      {/* <p>{cards}</p> */}
      <div className="flex">
        <Toast ref={toast} />
        <Menu id="deckMenu" model={items}/>
        <Dialog header="Create new deck" footer={footerContent} modal={false} visible={visible} onHide={() => setVisible(false)} draggable={false} resizable={false} position='left'>
          <InputText
            placeholder="Deck name"
            className="w-full mb-3"
            value={deckName} // Bind the value to the deckName state variable
            onChange={(e) => setDeckName(e.target.value)} // Update the deckName state when input changes
          />
        </Dialog>

        <div className='w-12'>
          <DataView value={cards} itemTemplate={itemTemplate} />
        </div>
      </div>
      {errors.map(function(error){
                            return (
                                <>  
                                    {setErrors([...new Set(errors)])};
                                    {toast.current?.replace({ severity: 'error', summary: 'Error Message', detail: error.message ? error.message : error })};
                                    {setErrors([])};
                                </>
                            )
                        })}
      </>
);}