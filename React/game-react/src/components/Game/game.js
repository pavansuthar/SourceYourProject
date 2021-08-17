// core
import React from "react";
// css material ui
import "./game.scss";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
// component
import Board from "./../Board/board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: new Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || this.calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? "🌜" : "🌚";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      xIsNext: (step % 2) === 0,
      stepNumber: step,      
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move} made` : `Lets start`;
      return (
        <>
          <ListItem key={desc} button>
            <ListItemText key={desc} primary={desc} onClick={() => this.jumpTo(move)}/>
            <Divider />
          </ListItem>
          <Divider />
        </>
      );
    });

    let status;
    status = winner
      ? `Winner: ${winner}`
      : `Next player ${this.state.xIsNext ? "🌜" : "🌚"}`;

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xl={3}>
            <h1>{status}</h1>
            <List component="nav" aria-label="moves">
              {moves}
            </List>
          </Grid>
          <Grid item xl={6}>
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Game;
