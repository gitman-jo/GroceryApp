import "./App.css";
import { Container, Typography } from "@material-ui/core";
import Order from "./Components/Order/index";

function App() {
  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h2" align="center">
        Grocery Shop
      </Typography>
      <Order />
    </Container>
  );
}

export default App;
