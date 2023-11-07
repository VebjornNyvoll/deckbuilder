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
  const [sortKey, setSortKey] = useState<string>('');
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const sortOptions: SortOption[] = [
    { label: 'Cost: High to Low', value: '!cost' },
    { label: 'Cost: Low to High', value: 'cost' },
  ];

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadInitialCards();

    // Add an event listener to the window for scrolling.
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const loadInitialCards = () => {
    CardService.getCards().then((data) => setCards(data.slice(0, 99)));
  };

  const loadMoreCards = () => {
    if (loading) return;
    setLoading(true);
    const startIndex = cards.length;
    const numberOfCardsToLoad = 200;

    CardService.getCards().then((data) => {
      const newCards = data.slice(startIndex, startIndex + numberOfCardsToLoad);
      setCards([...cards, ...newCards]);
      setLoading(false);
    });
  };

  const handleScroll = () => {
    if (loading) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;
    const distanceFromBottom = contentHeight - (scrollY + windowHeight);

    if (distanceFromBottom < 1000) {
      loadMoreCards();
    }
  };


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
          <DataViewLayoutOptions
              layout={layout}
              onChange={(e) => setLayout(e.value)}
          />
        </div>
    );
  };

  const onSortChange = (event: DropdownChangeEvent) => {
    const value = event.value;
    setSortField(value);
    setSortKey(value);
  };

  return (
      <div className="card" ref={scrollContainerRef} style={{ overflow: 'auto' }}>
        <DataView
            value={cards}
            itemTemplate={itemTemplate}
            sortField={sortField}
            sortOrder={sortOrder}
            layout={layout}
            header={header()}
        />
        {popCard && (
            <CardPopUp card={popCard} open={isDialogOpen} onClose={closeDialog} />
        )}
      </div>
  );
}
