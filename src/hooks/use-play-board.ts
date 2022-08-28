import create from 'zustand'
import { Card } from '../@types'
import { shuffledCards, splitRankAndSuit, cardComparator, POINTS_MAP } from '../helpers'

type DeckOfCards = {
  north: Card[]
  east: Card[]
  south: Card[]
  west: Card[]
}

interface PlayBoardState {
  deck: DeckOfCards
  pointsByHand: {
    north: number
    east: number
    south: number
    west: number
  }
  calculatePoints: () => void
  shuffleCards: () => void
}

function getDeal() {
  let direction = 'east'

  const result = shuffledCards().reduce(
    (memo, card) => {
      if (direction === 'north') {
        direction = 'east'
        memo.north.push(splitRankAndSuit(card))
      } else if (direction === 'east') {
        direction = 'south'
        memo.east.push(splitRankAndSuit(card))
      } else if (direction === 'south') {
        direction = 'west'
        memo.south.push(splitRankAndSuit(card))
      } else if (direction === 'west') {
        direction = 'north'
        memo.west.push(splitRankAndSuit(card))
      }
      return memo
    },
    {
      north: [],
      east: [],
      south: [],
      west: []
    }
  )

  result.north.sort((a, b) => -cardComparator(a, b))
  result.east.sort((a, b) => -cardComparator(a, b))
  result.south.sort((a, b) => -cardComparator(a, b))
  result.west.sort((a, b) => -cardComparator(a, b))

  return result
}

function calculatePoints(deck: DeckOfCards) {
  const result = {
    north: deck.north.reduce((acc, curr) => acc + (POINTS_MAP[curr.rank] || 0), 0),
    east: deck.east.reduce((acc, curr) => acc + (POINTS_MAP[curr.rank] || 0), 0),
    south: deck.south.reduce((acc, curr) => acc + (POINTS_MAP[curr.rank] || 0), 0),
    west: deck.west.reduce((acc, curr) => acc + (POINTS_MAP[curr.rank] || 0), 0)
  }

  return result
}

export const usePlayBoard = create<PlayBoardState>(set => ({
  pointsByHand: {
    north: 0,
    east: 0,
    south: 0,
    west: 0
  },
  deck: getDeal(),
  shuffleCards: () => set(state => ({ ...state, deck: getDeal() })),
  calculatePoints: () =>
    set(state => ({
      pointsByHand: calculatePoints(state.deck)
    })),
  resetPoints: () =>
    set(() => ({
      pointsByHand: {
        north: 0,
        east: 0,
        south: 0,
        west: 0
      }
    }))
}))
