import { useRef, useState } from 'react';
import CardView from '../components/CardView';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import {useContext} from 'react';
import { AuthContext } from '../context/authContext';
import { Dialog } from 'primereact/dialog';
import { Form } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { gql } from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Toast } from 'primereact/toast';



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

  const GET_DECKS = gql`
    query getDecks {
    user {
      decks {
        id
        deckName
      }
    }
}`;

const [ createDeck, { loading }] = useMutation(CREATE_DECK,{
  onError({graphQLErrors}) {
      setErrors(graphQLErrors)
  },
  variables: {deckName: deckName}
});
  function Decks(){
    const [loading, error, decks] = useQuery(GET_DECKS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    return decks.map(({ id, deckName }) => (
      <div key={id}>
        <p>
          {deckName}: {id}
        </p>
      </div>
    ));
  }
  
    

    const clearCreateDeck = () => {
      setVisible(false);
      setDeckName('');
    }

    const handleCreateDeck = () => {  
      createDeck();
      clearCreateDeck();
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
        items: [{label: "hello", icon: "pi pi-book"}]
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
      <div className="flex">
        {Decks()}
        <Toast ref={toast} />
        <Menu model={items}/>
        <Dialog header="Create new deck" footer={footerContent} modal={false} visible={visible} onHide={() => setVisible(false)} draggable={false} resizable={false} position='left'>
          <InputText
            placeholder="Deck name"
            className="w-full mb-3"
            value={deckName} // Bind the value to the deckName state variable
            onChange={(e) => setDeckName(e.target.value)} // Update the deckName state when input changes
          />
        </Dialog>

        <div className='w-12'>
          <CardView/>
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
    )
}