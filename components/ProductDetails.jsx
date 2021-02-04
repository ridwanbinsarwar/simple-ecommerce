import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 250,
    },
});

export default function ProductDetails({ product, quantity }) {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {product.about}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Quantity:  {quantity}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Price:  {product.price}  $
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}