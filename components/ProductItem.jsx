import Link from 'next/link'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
        maxWidth: 245,
    },
    media: {
        height: 150,
    },
});

export default function ProductItem({ product }) {
    const classes = useStyles();
    return (
        <Link href={`/product/${product.id}`} >
            <a style={{ textDecoration: "none", padding: 10 }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={product.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {product.description}
                            </Typography>
                            <Typography variant="body2" component="p">
                                price:  {product.price}  $
                    </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
        </Link>
    )
}