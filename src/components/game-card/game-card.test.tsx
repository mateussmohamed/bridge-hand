import { render, screen } from '../../test/utils'
import { SuitSymbols } from '../../@types'

import { GameCard } from './game-card'

describe('GameCard', () => {
  test.each([
    ['♣', '2', 'game-card--black'],
    ['♦', '3', 'game-card--red'],
    ['♥', '4', 'game-card--red'],
    ['♠', '5', 'game-card--black'],
    ['♣', 'J', 'game-card--black'],
    ['♦', 'Q', 'game-card--red'],
    ['♥', 'K', 'game-card--red'],
    ['♠', 'A', 'game-card--black']
  ])('GameCard with suit: %s and rank %s', (suit, rank, expected) => {
    render(<GameCard suit={suit as SuitSymbols} place="down" rank={rank} />)

    expect(screen.getAllByText(suit)).toHaveLength(2)
    expect(screen.getByText(rank)).toBeInTheDocument()
    expect(screen.getByTestId(`game-card-${rank}-${suit}`)).toHaveClass(expected)
  })
})
