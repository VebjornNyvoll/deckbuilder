import { useState, useEffect, useRef } from "react";
import { CardService } from "../service/CardService";
import { DataView  } from "primereact/dataview";
import { ListItem, GridItem, Card, CardPopUp } from "./CardItem";


export default function CardView({ layout, field, value, gt, lt, sortBy }: { layout: "grid" | "list"; field: string; value: string; gt: number; lt: number; sortBy: string }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popCard, setPopCard] = useState<Card | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadInitialCards(50, 0, field, value, gt, lt, sortBy);
  }, [field, value, gt, lt, sortBy]);

  const loadInitialCards = (limit: number, skip: number, field: string, value: string, gt: number, lt: number, sortBy: string) => {
    if (loading) return;
    setLoading(true);

    CardService.getCards(limit, skip, field, value, gt, lt, sortBy)
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
    if (layout === "list") {
      return <ListItem card={card} onClick={handleClick} />;
    } else if (layout === "grid") {
      return <GridItem card={card} onClick={handleClick} />;
    }
  };

  return (
    <div
      className="card"
      ref={scrollContainerRef}
      style={{ overflow: "auto", height: "783px" }}
    >
      <DataView value={cards} itemTemplate={itemTemplate} layout={layout} />
      {popCard && (
        <CardPopUp card={popCard} open={isDialogOpen} onClose={closeDialog} />
      )}
    </div>
  );
}
