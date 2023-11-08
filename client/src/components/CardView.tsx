import { useState, useEffect, useRef } from "react";
import { CardService } from "../service/CardService";
import { DataView  } from "primereact/dataview";
import { ListItem, GridItem, Card, CardPopUp } from "./CardItem";


export default function CardView({ layout, filter }: { layout: "grid" | "list"; filter: string }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popCard, setPopCard] = useState<Card | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize with limit and skip
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

  // Remember to fix this issue in navbar.tsx!
  document.body.style.overflow = "hidden";

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
