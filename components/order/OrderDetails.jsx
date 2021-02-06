import OrderItem from '../cart/CartItem'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
  }
}));

export default function CartList({ order }) {
  const classes = useStyles();
  return (
    <>
      {order.products.map((item) => (
        <OrderItem key={item.id} item={item} order={true} />
      ))}

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="body1">
                  Address: {order.address}
                </Typography>
              </Grid>

              <Grid item xs>
                <Typography gutterBottom variant="body1">
                  Name: {order.name}
                </Typography>
              </Grid>

              <Grid item xs>
                <Typography gutterBottom variant="body1">
                  Phone: {order.phone}
                </Typography>
              </Grid>

            </Grid>
            <Grid item>
              <Typography variant="body1">Total Price: {order.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      
    </>

  );
}