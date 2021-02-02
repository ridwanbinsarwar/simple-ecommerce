import Link from 'next/link'
import productStyles from '../styles/Product.module.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// export default function ProductItem ({ product }){
//   return (
//     <Link href={`/product/${product.id}`} >
//       <a className={productStyles.card}>
//         <img src="https://en.wikipedia.org/wiki/Instagram_egg#/media/File:Instagram_egg.jpg" alt=""/>
//         <h3>{product.id}</h3>
//         <p>{product.id}</p>
//       </a>
//     </Link>
//   )
// }

const useStyles = makeStyles({
    root: {
      maxWidth: 245,
    },
    media: {
      height: 150,
    },  
});
  
export default function ProductItem ({ product }) {
    const classes = useStyles();
    return (
        <Link href={`/product/${product.id}`} >
        <a  style={{textDecoration: "none", padding: 10}}>
            <Card className={classes.root}>
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://www.w3schools.com/images/w3schools_green.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </a>
        </Link>
    )
}