import * as React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Grid, Paper } from '@mui/material';





export default function FeedPage() {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid style={{marginTop:'40px',marginLeft:'50px'}} item xs={3}>
      <Card sx={{ maxWidth: '80%' }}>
            <CardMedia
              sx={{ height: 340 }}
              image={"https://images.pexels.com/photos/5324309/pexels-photo-5324309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              title={"green iguana"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions style={{ paddingLeft: '13px' }}>
              <FavoriteBorderIcon />
              <CommentIcon />
            </CardActions>
          </Card> 
      </Grid>

      

      

      
    </Grid>


  );
}

