// material ui css
import './square.scss';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 165,
    margin: 5
  },
  title: {
    fontSize: "5rem",
    textAlign: "center",
    marginBottom: 0
  }
});

function Square(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => props.onClick()}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom>
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Square;
