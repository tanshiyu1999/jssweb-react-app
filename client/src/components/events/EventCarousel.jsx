import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Paper, Button} from '@mui/material'

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>
  )
}

function EventCarousel(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
    }, {
      name: "Random Name #2",
      description: "Hello World!"
    }
  ]

  const output = items.map((item, i) => {
    return <Item key={i} item={item}/>
  })

  return (
    <Carousel
      sx={{
        width: '600px',
      }}
    > {output} </Carousel>
  )
}


export default EventCarousel;
