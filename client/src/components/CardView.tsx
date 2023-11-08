import { useState, useEffect, useRef } from 'react';
import { CardService } from '../service/CardService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

import { ListItem, GridItem, Card, CardPopUp } from "./CardItem";
import FilterComponent from "./FilterComponent";

interface SortOption {
  label: string;
  value: string;
}

export default function CardView() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popCard, setPopCard] = useState<Card | undefined>();
  const [layout, setLayout] = useState<'grid' | 'list' | (string & Record<string, unknown>)>('grid');
  const [sortKey, setSortKey] = useState<string>('cost');
  const [, setSortOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sortOptions: SortOption[] = [
    { label: 'Cost: High to Low', value: '!cost' },
    { label: 'Cost: Low to High', value: 'cost' },
  ];

  useEffect(() => {
    // Initialize with limit and skip set to 25 and 0, respectively
    loadInitialCards(50, 0);
  }, []);

  const loadInitialCards = (limit: number, skip: number) => {
    if (loading) return;
    setLoading(true);

    CardService.getCards(limit, skip)
        .then((data) => {
          console.log("Fetched cards data:", data);
          if (data.cards && data.hasNextPage) {
            setCards(data.cards);
            setHasMore(true);
          } else {
            setCards([]);
            setHasMore(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
          setCards([]);
          setHasMore(false);
          setLoading(false);
        });
  };

  const loadMoreCards = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const startIndex = cards.length;

    CardService.getCards(25, startIndex)
        .then((data) => {
          console.log("Fetched more cards data:", data);
          if (data.cards && data.hasNextPage) {
            setCards([...cards, ...data.cards]);
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching more cards:", error);
          setHasMore(false);
          setLoading(false);
        });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (loading || !hasMore) return;

    const scrollY = scrollContainerRef.current.scrollTop;
    const windowHeight = scrollContainerRef.current.clientHeight;
    const contentHeight = scrollContainerRef.current.scrollHeight;

    if (contentHeight - (scrollY + windowHeight) < 500) {
      loadMoreCards();
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
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

  

  const onSortChange = (event: DropdownChangeEvent) => {
    const value = event.value;
    setSortKey(value);
    setSortOrder(1);
    setCards([]);
    setHasMore(true);
    loadInitialCards(25, 0);
  };

  return (
    <div className="card">
      <DataView
        value={cards}
        itemTemplate={itemTemplate}
        layout={layout}
        header={FilterComponent()}
      />
      {popCard && (
        <CardPopUp
          card={popCard}
          open={isDialogOpen}
          onClose={closeDialog}
        ></CardPopUp>
      )}
    </div>
  );
}
