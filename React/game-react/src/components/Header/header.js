// core
import React from "react";
// material ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// css
import useStyles from "./../../utils/Themes/themes";
// icons
import { MdGames } from 'react-icons/md';

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <MdGames/> Game React
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
