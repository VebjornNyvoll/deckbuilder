import { useState, useEffect, useRef } from "react";
import { DataView } from "primereact/dataview";
import { ListItem, GridItem, Card, CardPopUp } from "./CardItem";
import { RemoveScroll } from "react-remove-scroll";
import { ScrollTop } from "primereact/scrolltop";
import { useAppDispatch, useAppSelector } from "../service/hooks";
import { setCards, addCards } from "../service/cards/cardsSlice";
import { CardService } from "../service/CardService";
import { useLocation } from "react-router-dom";

export default function CardView() {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const sort = useAppSelector((state) => state.sort);
  const cards = useAppSelector((state) => state.cards.cards); // Access cards from Redux state
  const layout = useAppSelector((state) => state.layout.layout);
  const location = useLocation();
  const [dialogState, setDialogState] = useState({ isOpen: false, id: undefined });

  const options = {
    limit: 20,
    skip: 0,
    sortBy: sort,
  };

  useEffect(() => {
    options.limit = 20; // Reset limit when filters change
    options.skip = 0; // Reset skip when filters change
    options.sortBy = sort; // Keep the sort options when filters change
    loadInitialCards();
  }, [filters, sort]);

  useEffect(() => {
    loadInitialCards();
  }, []);

  const loadInitialCards = () => {
    if (loading) return;
    setLoading(true);

    CardService.getFilteredCards(filters, options)
      .then((data) => {
        if (data.cards) {
          dispatch(setCards(data.cards)); // Dispatch the action to set initial cards
          setHasMore(true);
        } else {
          dispatch(setCards([])); // Dispatch the action to set an empty array
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        dispatch(setCards([])); // Dispatch the action to set an empty array on error
        setHasMore(false);
        setLoading(false);
      });
  };

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
        console.error("Error fetching more cards:", error);
        setHasMore(false);
        setLoading(false);
      });
  };

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
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, scrollContainerRef]);

  
  const openDialog = (card) => {
    

    setDialogState({ isOpen: true, id: card.id });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, id: null });
  };

  const itemTemplate = (card: Card, layout: string) => {

    if (!card) {
      return null;
    }
    if (layout === "list") {
      return <ListItem card={card} onClick={() => openDialog(card)} />;
    } else if (layout === "grid") {
      return <GridItem card={card} onClick={() => openDialog(card)} />;
    }
  };
  
  return (
    <RemoveScroll>
      <div
        className="card"
        ref={scrollContainerRef}
        style={{ height: "calc(100vh - 62px)", overflow: "auto" }}
      >
        <DataView value={cards} itemTemplate={itemTemplate} layout={layout} />
        {dialogState.id && (
                  <CardPopUp 
                  cardId={dialogState.id} 
                  open={dialogState.isOpen} 
                  onClose={closeDialog} 
                />
        )}
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
