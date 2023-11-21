import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const CardOverlayComponent = ({ op, cardId }) => {
  const context = useContext(AuthContext);

  const CARD_TO_DECK = gql`
  mutation AddCards($cardIds: [ID!]!, $deckId: ID!) {
    addCards(cardIds: $cardIds, deckId: $deckId) {
      error {
        error
        message
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

  const { loading, error, data } = useQuery(GET_DECKS);
  const decks = data?.user?.decks?.map(deck => ({ deckId: deck.id, name: deck.deckName })) || [];

  const toast = useRef(null);
  
  const showMessage = (isError, content) => {
    toast.current.replace({
      severity: isError ? 'error' : 'success',
      summary: isError ? 'Error' : 'Success',
      detail: content,
      life: 3000
    });
  };

  const [addCardsToDeck] = useMutation(CARD_TO_DECK);

  const onRowClick = async (rowData) => {
    try {
      const response = await addCardsToDeck({
        variables: {
          cardIds: [cardId],
          deckId: rowData.deckId
        },
        context: {
          headers: {
            Authorization: `${context?.token}` // Adjust as per your auth context structure
          },
        },
      });

      if (response?.data?.addCards?.error?.error) {
        showMessage(true, `Could not add card to ${rowData.name}`);
      } else {
        showMessage(false, `Added card to ${rowData.name}`);
      }
    } catch (error) {
      showMessage(true, `An error occurred: ${error.message}`);
    }
  };

  if (loading) return <p>Loading decks...</p>;
  if (error) return <p>Could not load decks</p>;

  const nameBodyTemplate = (rowData) => (
    <span style={{ cursor: 'pointer' }}>{rowData.name}</span>
  );

  return (
    <div onClick={(e) => e.stopPropagation()} className="card flex flex-column align-items-center gap-3" style={{ width: '100%', maxWidth: '30rem' }}>
      <Toast ref={toast} />
      <DataTable value={decks} onRowClick={onRowClick} tableStyle={{ width: '100%', maxWidth: '30rem' }}>
        <Column field="name" header="Add this card to the following deck" body={nameBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};
