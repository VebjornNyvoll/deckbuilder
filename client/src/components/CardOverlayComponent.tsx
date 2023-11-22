import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const CardOverlayComponent = ({ cardId }) => {
  const context = useContext(AuthContext);

  const CARD_TO_DECK = gql`
    mutation AddCards($cardIds: [ID!]!, $deckId: ID!) {
      addCards(cardIds: $cardIds, deckId: $deckId) {
        error {
          error
          message
        }
      }
    }
  `;

  const GET_DECKS = gql`
    query Decks {
      user {
        decks {
          deckName
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DECKS);
  const decks =
    data?.user?.decks?.map((deck) => ({
      deckId: deck.id,
      name: deck.deckName,
    })) || [];

  const toast = useRef(null);

  const showMessage = (isError, content) => {
    toast.current.replace({
      severity: isError ? 'error' : 'success',
      summary: isError ? 'Error' : 'Success',
      detail: content,
      life: 3000,
    });
  };

  const [addCardsToDeck] = useMutation(CARD_TO_DECK);

  const addButtonTemplate = (rowData) => (
    <Button label="Add" className="p-button-sm" onClick={(e) => handleAddButtonClick(e, rowData)} />
  );

  const handleAddButtonClick = async (e, rowData) => {
    e.stopPropagation();
    try {
      const response = await addCardsToDeck({
        variables: {
          cardIds: [cardId],
          deckId: rowData.deckId,
        },
        context: {
          headers: {
            Authorization: `${context?.token}`,
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

  if (loading) return <p data-testid={cardId}>Loading decks...</p>;
  if (error) return <p>Error loading decks</p>;

  const nameBodyTemplate = (rowData) => <span style={{ cursor: 'pointer' }}>{rowData.name}</span>;

  return (
    <div
      className="card flex flex-column align-items-center gap-3"
      style={{
        width: '100%',
        maxWidth: '30rem',
        overflowY: 'auto',
        maxHeight: '400px',
      }}
    >
      <Toast ref={toast} />
      <DataTable sortOrder={-1} sortField={'name'} value={decks} tableStyle={{ width: '100%', maxWidth: '30rem' }}>
        <Column sortable field="name" header="Deck" body={nameBodyTemplate}></Column>
        <Column body={addButtonTemplate}></Column>
      </DataTable>
    </div>
  );
};
