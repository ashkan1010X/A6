import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { ListGroup, Button, Card } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  if (!searchHistory) return null;

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    // stop the event from trigging other events
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return parsedHistory.length === 0 ? (
    <Card>
      <Card.Body>
        <Card.Title>Nothing Here</Card.Title>
        <Card.Text>Try searching for some artwork.</Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <ListGroup>
    {parsedHistory?.map((historyItem, index) => (
      <ListGroup.Item
        key={index}
        onClick={(e) => historyClicked(e, index)}
      >
        {Object.keys(historyItem).map((key) => (
          <>
            {key}: <strong>{historyItem[key]}</strong>&nbsp;
          </>
        ))}
        <Button
          className="float-end"
          variant="danger"
          size="sm"
          onClick={(e) => removeHistoryClicked(e, index)}
        >
          &times;
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
  );
}
