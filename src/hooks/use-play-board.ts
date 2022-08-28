import create from 'zustand'
import range from 'lodash.range'
import shuffle from 'lodash.shuffle'

import type { Card, SuitSymbols } from '../@types'

const SUIT_ORDER = ['♣', '♦', '♥', '♠']

const POINTS_MAP: Record<string, number> = { J: 1, Q: 2, K: 3, A: 4 }

const CARD_TO_RANK: Record<string, number> = { J: 11, Q: 12, K: 13, A: 14 }

function generateShuffledCards() {
  return range(2, 11)
    .map(item => String(item))
    .concat(['J', 'Q', 'K', 'A'])
    .reduce<string[]>((memo, curr) => {
      memo.push(`${curr}♣`)
      memo.push(`${curr}♦`)
      memo.push(`${curr}♥`)
      memo.push(`${curr}♠`)
      return memo
    }, [])
}

function shuffledCards() {
  return shuffle(generateShuffledCards())
}

function splitRankAndSuit(suit: string): Card {
  let rank = suit.charAt(0)

  if (rank === '1') {
    rank = suit.slice(0, 2)
  }

  return { rank, suit: suit.slice(-1) as SuitSymbols }
}

function cardComparator(card1: Card, card2: Card) {
  const suit1 = SUIT_ORDER.indexOf(card1.suit)
  const suit2 = SUIT_ORDER.indexOf(card2.suit)

  const rank1 = CARD_TO_RANK[card1.rank] || Number(card1.rank)
  const rank2 = CARD_TO_RANK[card2.rank] || Number(card2.rank)

  return suit1 * 15 + rank1 - (suit2 * 15 + rank2)
}

function generateDeck() {
  let direction = 'east'

  const result = shuffledCards().reduce<DeckOfCards>(
    (memo, cardSuit) => {
      if (direction === 'north') {
        direction = 'east'
        memo.north.push(splitRankAndSuit(cardSuit))
      } else if (direction === 'east') {
        direction = 'south'
        memo.east.push(splitRankAndSuit(cardSuit))
      } else if (direction === 'south') {
        direction = 'west'
        memo.south.push(splitRankAndSuit(cardSuit))
      } else if (direction === 'west') {
        direction = 'north'
        memo.west.push(splitRankAndSuit(cardSuit))
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

const INITIAL_POINTS_BY_HAND = { north: 0, east: 0, south: 0, west: 0 }

interface DeckOfCards {
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

export const usePlayBoard = create<PlayBoardState>(set => ({
  pointsByHand: Object.assign({}, INITIAL_POINTS_BY_HAND),
  deck: generateDeck(),
  shuffleCards: () => set(() => ({ deck: generateDeck(), pointsByHand: Object.assign({}, INITIAL_POINTS_BY_HAND) })),
  calculatePoints: () => set(state => ({ pointsByHand: calculatePoints(state.deck) })),
  resetPoints: () => set(() => ({ pointsByHand: Object.assign({}, INITIAL_POINTS_BY_HAND) }))
}))
