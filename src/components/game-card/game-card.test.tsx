import { render, screen } from '../../test/utils'
import { SuitSymbols } from '../../@types'

import { GameCard } from './game-card'

describe('<GameCard />', () => {
  test.each([
    ['♣', '2', 'black'],
    ['♦', '3', 'red'],
    ['♥', '4', 'red'],
    ['♠', '5', 'black'],
    ['♣', 'J', 'black'],
    ['♦', 'Q', 'red'],
    ['♥', 'K', 'red'],
    ['♠', 'A', 'black']
  ])('should render the GameCard with suit: %s and rank %s at color: %s', (suit, rank, color) => {
    render(<GameCard suit={suit as SuitSymbols} place="down" rank={rank} />)

    expect(screen.getAllByText(suit)).toHaveLength(2)
    expect(screen.getByText(rank)).toBeInTheDocument()
    expect(screen.getByLabelText(`game-card-${rank}-${suit}`)).toHaveClass(`game-card--${color}`)
  })
})
