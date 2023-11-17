import { useState, useEffect, useRef } from "react";
import { CardService } from "../service/CardService";
import { DataView  } from "primereact/dataview";
import { ListItem, GridItem, Card, CardPopUp } from "./CardItem";
import { RemoveScroll } from "react-remove-scroll";
import { ScrollTop} from "primereact/scrolltop";


export default function CardView({ layout, filter }: { layout: "grid" | "list"; filter: string }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popCard, setPopCard] = useState<Card | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  var field  = filter.split(":")[0];

  type Params = {limit?: number, skip: number, value?: string , sortBy?: number}
  var params: Params = {limit: 10, skip: 0}

  if (isNaN(parseInt(filter.split(":")[1]))){
    params.value = filter.split(":")[1];
  } else {
    params.sortBy = parseInt(filter.split(":")[1]);
  }

  useEffect(() => {
    loadInitialCards()
  },[filter]);

  const loadInitialCards = () => {
    if (loading) return;
    setLoading(true);

    CardService.getFilteredCards(field, params)
        .then((data) => {
          console.log("Fetched cards data:", data);     
          if (data.cards) {
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
    params.skip = cards.length;
    console.log(params)

    CardService.getFilteredCards(field, params)
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
      <RemoveScroll>
    <div
      className="card"
      ref={scrollContainerRef}
        style={{ height: "calc(100vh - 62px)", overflow: "auto" }}
    >
      <DataView value={cards} itemTemplate={itemTemplate} layout={layout} />
      {popCard && (
        <CardPopUp card={popCard} open={isDialogOpen} onClose={closeDialog} />
      )}
      <ScrollTop target="parent" threshold={1000} className="w-3rem h-3rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
    </div>
      </RemoveScroll>
  );
}
