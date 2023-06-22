import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function MarketFilter() {
  return (
    <ButtonGroup
      variant="outlined"
      className="btn "
      color="warning"
      aria-label="outlined primary button group"
    >
      <Button className="btn-outlined">Filtre 1</Button>
      <Button className="btn-outlined">Filtre 2</Button>
      <Button className="btn-outlined">Filtre 3</Button>
      <Button className="btn-outlined">Filtre 4</Button>
    </ButtonGroup>
  );
}
