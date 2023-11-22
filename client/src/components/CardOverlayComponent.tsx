import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';


export function CardOverlayComponent ( op, cardId: string) {
  const context = useContext(AuthContext);
  const CARD_TO_DECK =  gql`
  mutation AddCards($cardIds: [ID!]!, $deckId: ID!) {
      addCards(cardIds: $cardIds, deckId: $deckId) {
        error {
          error
          message
        }
      }
    }
  `;



  const toast = useRef<Toast>(null);
  
  const show = (error, content) => {
    if(error){
      toast.current.replace({severity:'error', summary: 'Error', detail:content, life: 3000});
    }else{
      toast.current.replace({severity:'success', summary: 'Success', detail:content, life: 3000});
    }
  }
  const handleClick = (e) => {
    e.stopPropagation();

  };


  
  // Hook to call the mutation
  const [addCardsToDeck] = useMutation(CARD_TO_DECK);

  
  const GET_DECKS = gql`
  query Decks {
  user {
  decks {
    deckName
    id
  } 
  }
  }`;
  const {loadingDecks, errorDecks, data} = useQuery(GET_DECKS);
  if (loadingDecks) return [{deckId: null, name: null}];
  if (errorDecks) return [{deckId: null, name: null}];
  // DO NOT REMOVE! The console log is needed to ensure data is loaded before the component is rendered
  console.log(context.user);
  const products = data?.user?.decks?.map((deck) => {
    return {
      deckId: deck.id,
      name: deck.deckName
    }
  });

  const onRowClick = async (e) => {
    const rowData = e.data
    try {
      // Use context if needed for the mutation, for example passing a token
      const response = await addCardsToDeck({
        variables: {
          cardIds: [cardId], // Replace with the actual card ID you want to add
          deckId: rowData.deckId
        },
        context: {
          headers: {
            Authorization: `${context}`, // Assuming your context has a token
          },
        },
      });
      
      if (response.data.addCards.error.error) {
        show(true, `Could not add card to ${rowData.name}`);
      } else {
        show(false, `Added card to ${rowData.name}`);
      }
    } catch (error) {
      // Handle the error case by showing a message
      show(true, `An error occurred: ${error.message}`);
    }
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span style={{ cursor: 'pointer' }}>
          {rowData.name}
        </span>
      </>
    );
  };

  return (
    <>    
    <div onClick={handleClick} className="card flex flex-column align-items-center gap-3"  style={{ width: '100%', maxWidth: '30rem' }}>
      <Toast ref={toast} />
      <DataTable  value={products} 
          paginator
          rows={10}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rowsPerPageOptions={[10,20,50]}
          onRowClick={(e) => onRowClick(e)} tableStyle={{ width: '100%', maxWidth: '30rem' }}>
        <Column field="name" header="Add this card to the following deck" body={nameBodyTemplate}></Column>
      </DataTable>
    </div>
    </>
  );
}