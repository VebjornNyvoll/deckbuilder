import { useState, useEffect, useRef } from 'react';
import { DataView } from 'primereact/dataview';
import { ListItem, GridItem, Card, CardPopUp } from './CardItem';
import { RemoveScroll } from 'react-remove-scroll';
import { ScrollTop } from 'primereact/scrolltop';
import { useAppDispatch, useAppSelector } from '../service/hooks';
import { setCards, addCards } from '../service/cards/cardsSlice';
import { CardService } from '../service/CardService';

export default function CardView() {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const sort = useAppSelector((state) => state.sort);
  const cards = useAppSelector((state) => state.cards.cards);
  const layout = useAppSelector((state) => state.layout.layout);

  // CardpopUp is a dialog that shows the card details
  type DialogState = {
    isOpen: boolean;
    id: null | string;
  };
  const [dialogState, setDialogState] = useState<DialogState>({ isOpen: false, id: null });

  const options = {
    limit: 20,
    skip: 0,
    sortBy: sort,
  };

  useEffect(() => {
    options.limit = 20;
    options.skip = 0;
    options.sortBy = sort;
    loadInitialCards();
  }, [filters, sort]);

  useEffect(() => {
    loadInitialCards();
  }, []);

  // Fetches the initial cards for frontpage
  const loadInitialCards = () => {
    if (loading) return;
    setLoading(true);

    CardService.getFilteredCards(filters, options)
      .then((data) => {
        if (data.cards) {
          dispatch(setCards(data.cards));
          setHasMore(true);
        } else {
          dispatch(setCards([]));
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
        dispatch(setCards([]));
        setHasMore(false);
        setLoading(false);
      });
  };

  // Fetches more cards when the user scrolls down
  const loadMoreCards = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    options.skip = cards.length;

    CardService.getFilteredCards(filters, options)
      .then((data) => {
        if (data.cards && data.hasNextPage) {
          dispatch(addCards(data.cards)); // Dispatch the action to add more cards
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching more cards:', error);
        setHasMore(false);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;

    if (scrollContainerRef.current) {
      const scrollY = scrollContainerRef.current.scrollTop;
      const windowHeight = scrollContainerRef.current.clientHeight;
      const contentHeight = scrollContainerRef.current.scrollHeight;
      if (contentHeight - (scrollY + windowHeight) < 500) {
        loadMoreCards();
      }
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }
    const copyScrollContainerRef = scrollContainerRef;

    return () => {
      if (copyScrollContainerRef.current) {
        copyScrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, scrollContainerRef]);

  const openDialog = (card: Card) => {
    setDialogState({ isOpen: true, id: card.id });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, id: null });
  };

  //Getting list or grid cardItems with the ability to be pressed
  const itemTemplate = (card: Card, layout: string) => {
    if (!card) {
      return null;
    }
    if (layout === 'list') {
      return <ListItem card={card} onClick={() => openDialog(card)} />;
    } else if (layout === 'grid') {
      return <GridItem card={card} onClick={() => openDialog(card)} />;
    }
  };

  return (
    // RemoveScroll is used to prevent the whole page from scrolling when the user scrolls through the cards
    <RemoveScroll>
      <div className="card" ref={scrollContainerRef} style={{ height: 'calc(100vh - 62px)', overflow: 'auto' }}>
        <DataView value={cards} itemTemplate={itemTemplate} layout={layout} />
        {dialogState.id && <CardPopUp cardId={dialogState.id} open={dialogState.isOpen} onClose={closeDialog} />}
        {/* A button that scrolls to the top of the page */}
        <ScrollTop
          target="parent"
          threshold={1000}
          className="w-3rem h-3rem border-round bg-gray-400"
          icon="pi pi-angle-double-up text-base text-green-700"
        />
      </div>
    </RemoveScroll>
  );
}
