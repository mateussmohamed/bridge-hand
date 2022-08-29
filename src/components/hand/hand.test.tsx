import { Card } from '../../@types'
import { render, screen } from '../../test/utils'

import { Hand } from './hand'

const CARDS_MOCK = [
  {
    rank: 'K',
    suit: '♠'
  },
  {
    rank: 'J',
    suit: '♠'
  },
  {
    rank: '10',
    suit: '♠'
  },
  {
    rank: '9',
    suit: '♠'
  },
  {
    rank: 'A',
    suit: '♥'
  },
  {
    rank: '9',
    suit: '♥'
  },
  {
    rank: '10',
    suit: '♦'
  },
  {
    rank: '9',
    suit: '♦'
  },
  {
    rank: '4',
    suit: '♦'
  },
  {
    rank: '3',
    suit: '♦'
  },
  {
    rank: '2',
    suit: '♦'
  },
  {
    rank: 'A',
    suit: '♣'
  },
  {
    rank: 'Q',
    suit: '♣'
  }
] as Card[]

describe('<Hand />', () => {
  test.each([
    ['west', 4, 'hand-container-vertical', 'down'],
    ['north', 8, 'hand-container-horizontal', 'right'],
    ['east', 12, 'hand-container-vertical', 'right'],
    ['south', 16, 'hand-container-horizontal', 'down']
  ])('should render a Hand at %s with %s points', (hand, points, classname, place) => {
    render(<Hand cards={CARDS_MOCK} place={place as never} direction={hand as never} points={points} />)

    expect(screen.getByTestId(`hand-${hand}`)).toHaveClass(`hand-${hand}`)
    expect(screen.getByTestId(`hand-${hand}`)).toHaveClass(classname)
    expect(screen.getByRole('heading', { name: /points:/i })).toHaveTextContent(`Points: ${points}`)
  })
})
