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



export default function Deck() {
    const {user} = useContext(AuthContext);
    const [visible, setVisible] = useState<boolean>(false);
    const [deckName, setDeckName] = useState('');

    const clearCreateDeck = () => {
      setVisible(false);
      setDeckName('');
    }

    const handleCreateDeck = () => {  
      console.log('Create deck:', deckName);
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
        items: [
          { label: "My Collection", icon: "pi pi-fw pi-home" },
          { label: "High Priest Deck", icon: "pi pi-fw pi-book" },
          { label: "Shaman Deck", icon: "pi pi-fw pi-book" },
          { label: "Summon Deck", icon: "pi pi-fw pi-book" },
          { label: "Paladin Deck", icon: "pi pi-fw pi-book" },
        ]
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
                          New deck
                      </Button>
                      
                    </div>
                  )
          }}
          ]
        }
     
    ];
    return (
      <>
      <div className="flex">
        
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
      </>
    )
}