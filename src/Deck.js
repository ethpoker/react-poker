import React, { PureComponent, Component } from 'react'
import R from 'rambda'
import './Deck.css'
import CardContainer from './CardContainer'
import { List, fromJS } from 'immutable'

import Perf from 'react-addons-perf'; // ES6


const spreadShuffle = i => ({ 
  x: Math.cos(i) * Math.floor((Math.random() * 200) + 1),
  y: Math.sin(i) * Math.floor((Math.random() * 200) + 1), 
  z : 0
})

const spread = i => ({ 
  x: (i * 12) - 100,
  y: 50, 
  z : 0
})

const fan = i => ({ 
  x: Math.cos(i) * 95 + 400,
  y: Math.sin(i) * 95, 
  z : i
})

const stack = i => ({
  x: 0.1 * i,
  y: 0.1 * i, 
  z : i
})


function convertSuit (suit) {
  switch (suit) {
    case 1:
      return 'h'
    case 2:
      return 'd'
    case 3:
      return 's'
    case 4:
      return 'c'
  }
}

function convertRank (rank) {
  if (rank === 1) return 'A'
  if (rank < 11) return rank

  switch (rank) {
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
  }
}

const getSuit = i => convertSuit(i / 13 | 0)

const getRank = i => convertRank(i % 13 + 1)

const getCard = i => ({
  suit: getSuit(i),
  rank: getRank(i)
})


class Deck extends PureComponent {
  constructor(props){
    super(props)
    // probs shouldnt be in state maybe use props
    this.state = { board: [] }
  }
  
  componentDidMount(){
    setTimeout(() => this.setState({board: ['Ah', 'Ac', 'Ad'] }), 900)
    setTimeout(() => this.setState({board: ['Ah', 'Ac', 'Ad','2d'] }), 2200)
    setTimeout(() => this.setState({board: ['Ah', 'Ac', 'Ad','2d', '9d'] }), 3200)
    setTimeout(() => this.setState({board: [] }), 5200)  
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      this.setState({ board: nextProps.board })
    }
  }

  render() {
    console.log('rerender')
   const cardsArr = List(R.range(13, 65))
   const size = 100
   const { board } = this.state

    return (
      <div>
      {cardsArr.map(i => 
        <CardContainer
          index={i}
          key={i}
          board={board}
          card={getCard(i)}
          doubleBacked={true}
          faceDown={true}
          size={100}
          mapXYZ={stack}
        />
      )}
      </div>
    )
  }
}


Deck.propTypes = {
  // faceDown bool
  // doubleBacked  bool
  
  ///mapXYZ  - func - takes an i and returns {x, y}
}

export default Deck
