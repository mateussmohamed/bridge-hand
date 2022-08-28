import './app.css'

import { Board } from './components/board'

import { usePlayBoard } from './hooks/use-play-board'

export function App() {
  const deck = usePlayBoard(state => state.deck)
  const pointsByHand = usePlayBoard(state => state.pointsByHand)

  const calculatePoints = usePlayBoard(state => state.calculatePoints)
  const shuffleCards = usePlayBoard(state => state.shuffleCards)

  return (
    <div className="container">
      <div className="left">
        <Board cards={deck.west} direction="west" place="down" />
      </div>
      <div className="center">
        <Board cards={deck.north} direction="north" place="right" />

        <div className="container-call-to-actions">
          <button className="button-calculate-points" type="button" onClick={calculatePoints}>
            Calculate points
          </button>

          <button className="button-calculate-points" type="button" onClick={shuffleCards}>
            Shuffle
          </button>

          {JSON.stringify(pointsByHand)}
        </div>
        <Board cards={deck.south} direction="south" place="right" />
      </div>
      <div className="right">
        <Board cards={deck.east} direction="east" place="down" />
      </div>
    </div>
  )
}
