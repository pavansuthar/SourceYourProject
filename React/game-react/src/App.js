// core
import React from "react";
// material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
// components
import Header from "./components/Header/header";
import Game from "./components/Game/game";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Header />
        <Game />
      </Container>
    </React.Fragment>
  );
}

export default App;
