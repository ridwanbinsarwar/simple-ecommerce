import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.title}
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
        </Card>
    )
}