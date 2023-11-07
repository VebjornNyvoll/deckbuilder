import { useState, useEffect, useRef } from 'react';
import { CardService } from '../service/CardService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

import { ListItem, GridItem, Card, CardPopUp } from './CardItem';

interface SortOption {
  label: string;
  value: string;
}

export default function CardView() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popCard, setPopCard] = useState<Card | undefined>();
  const [layout, setLayout] = useState<'grid' | 'list' | (string & Record<string, unknown>)>('grid');
  const [sortKey, setSortKey] = useState<string>('cost'); // Set the initial sort key
  const [, setSortOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more cards to load
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sortOptions: SortOption[] = [
    { label: 'Cost: High to Low', value: '!cost' },
    { label: 'Cost: Low to High', value: 'cost' },
  ];

  useEffect(() => {
    loadInitialCards();
  }, []); // Removed the event listener for window scroll

  const loadInitialCards = () => {
    if (!hasMore || loading) return; // Don't load more if no more cards or already loading
    setLoading(true);
    const startIndex = cards.length;

    // You need to send additional parameters to your backend for pagination, e.g., skip and limit.
    CardService.getCards()
        .then((data) => {
          console.log("Fetched cards data:", data); // Log the fetched data
          if (data) {
            const newCards = data.slice(startIndex, startIndex + 99);
            setCards((prevCards) => [...prevCards, ...newCards]);
          } else {
            setCards([]); // Set an empty array or handle the error appropriately
          }
          setHasMore(data.length > startIndex + 99);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
          setCards([]); // Set an empty array or handle the error appropriately
          setLoading(false);
        });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (loading || !hasMore) return;

    const scrollY = scrollContainerRef.current.scrollTop;
    const windowHeight = scrollContainerRef.current.clientHeight;
    const contentHeight = scrollContainerRef.current.scrollHeight;

    if (contentHeight - (scrollY + windowHeight) < 1000) {
      loadMoreCards();
    }
  };

  useEffect(() => {
    // Add an event listener to the scroll container (ref) instead of the window.
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      // Remove the event listener when the component unmounts.
      if (scrollContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, scrollContainerRef]);

  const openDialog = (card: Card) => {
    setPopCard(card);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const itemTemplate = (card: Card, layout: string) => {
    const handleClick = () => {
      openDialog(card);
    };

    if (!card) {
      return null;
    }
    if (layout === 'list') {
      return <ListItem card={card} onClick={handleClick} />;
    } else if (layout === 'grid') {
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
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );
  };

  const onSortChange = (event: DropdownChangeEvent) => {
    const value = event.value;
    setSortKey(value);
    setSortOrder(1); // Reset the sort order to ascending (1) when changing the sort key
    // You can also load the cards here with the new sort key
    setCards([]); // Clear the existing cards
    setHasMore(true); // Reset the hasMore flag
    loadInitialCards();
  };

  return (
      <div className="card" ref={scrollContainerRef} style={{ overflow: 'auto', height: '500px' }}>
        <DataView value={cards} itemTemplate={itemTemplate} layout={layout} header={header()} />
        {popCard && <CardPopUp card={popCard} open={isDialogOpen} onClose={closeDialog} />}
      </div>
  );
}
