import range from 'lodash.range'
import shuffle from 'lodash.shuffle'
import { Card } from '../@types'

export const SUIT_MAP = {
  club: '♣',
  diamond: '♦',
  heart: '♥',
  spade: '♠'
}

export const COLOR_MAP = {
  '♣': 'black',
  '♦': 'red',
  '♥': 'red',
  '♠': 'black'
}

export const SUIT_ORDER = ['♣', '♦', '♥', '♠']

export const HAND_ORDER = ['♣', '♦', '♠', '♥']

export const POINTS_MAP = {
  J: 1,
  Q: 4,
  K: 3,
  A: 4
}

export function allCards() {
  return range(2, 11)
    .concat(['J', 'Q', 'K', 'A'])
    .reduce((memo, curr) => {
      memo.push(`${curr}♣`)
      memo.push(`${curr}♦`)
      memo.push(`${curr}♥`)
      memo.push(`${curr}♠`)
      return memo
    }, [])
}

export function shuffledCards() {
  return shuffle(allCards())
}

export function splitRankAndSuit(card: string) {
  let rank = card.charAt(0)

  if (rank === '1') {
    rank = card.slice(0, 2)
  }

  return {
    rank,
    suit: card.slice(-1)
  }
}

const CARD_TO_RANK: Record<string, number> = {
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

export function cardComparator(card1: Card, card2: Card) {
  const suit1 = SUIT_ORDER.indexOf(card1.suit)
  const suit2 = SUIT_ORDER.indexOf(card2.suit)

  const rank1 = CARD_TO_RANK[card1.rank] || Number(card1.rank)
  const rank2 = CARD_TO_RANK[card2.rank] || Number(card2.rank)

  return suit1 * 15 + rank1 - (suit2 * 15 + rank2)
}
