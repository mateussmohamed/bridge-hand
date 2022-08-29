import { render, screen, userEvent, within } from '../../test/utils'

import { GamePlayBoard } from './game-play-board'

function shuffleTestHelper() {
  return ['west', 'north', 'east', 'south']
    .map(direction => {
      const hand = screen.getByTestId(`hand-${direction}`)
      const handCards = within(hand).getAllByTestId('game-card')

      return handCards.map(westCard => westCard.getAttribute('aria-label')).join(',')
    })
    .join(',')
}

describe('<GamePlayBoard />', () => {
  beforeEach(() => {
    render(<GamePlayBoard />)
  })

  test.each([['west', 'north', 'east', 'south']])('should render %s hand at GamePlayBoard with 13 cards', direction => {
    const hand = screen.getByTestId(`hand-${direction}`)

    expect(hand).toBeInTheDocument()
    expect(within(hand).getAllByTestId('game-card')).toHaveLength(13)
    expect(within(hand).getByText('Points: 0'))
  })

  test('should render 4 boards', () => {
    expect(screen.getAllByText('Points: 0')).toHaveLength(4)
  })

  test('should render 52 cards', () => {
    expect(screen.getAllByTestId('game-card')).toHaveLength(52)
  })

  test('should click on the call to actions buttons', () => {
    expect(screen.getByRole('button', { name: /calculate points/i })).not.toBeDisabled()
    expect(screen.getByText(/shuffle cards/i)).not.toBeDisabled()
  })

  test('should disable calculate points button after the user click', async () => {
    const button = screen.getByRole('button', { name: /calculate points/i })

    expect(button).not.toBeDisabled()

    await userEvent.click(button)

    expect(await screen.findByRole('button', { name: /calculate points/i })).toBeDisabled()
  })

  test('should shuffle the deck of cards', async () => {
    const handCardsPoints = shuffleTestHelper()

    await userEvent.click(screen.getByRole('button', { name: /shuffle cards/i }))

    const afterHandCardsPoints = shuffleTestHelper()

    expect(handCardsPoints).not.toEqual(afterHandCardsPoints)
  })

  test('should reset the points after shuffle the deck of cards', async () => {
    expect(screen.getAllByText('Points: 0')).toHaveLength(4)

    await userEvent.click(screen.getByRole('button', { name: /calculate points/i }))

    expect((await screen.findByTestId('hand-west-points')).textContent).not.toBe('Points: 0')
    expect((await screen.findByTestId('hand-north-points')).textContent).not.toBe('Points: 0')
    expect((await screen.findByTestId('hand-east-points')).textContent).not.toBe('Points: 0')
    expect((await screen.findByTestId('hand-south-points')).textContent).not.toBe('Points: 0')

    expect(await screen.findByRole('button', { name: /calculate points/i })).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: /shuffle cards/i }))

    expect(screen.getAllByText('Points: 0')).toHaveLength(4)
  })
})
