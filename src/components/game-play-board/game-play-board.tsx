import './game-play-board.css'

import { Board } from '../game-board'

import { usePlayBoard } from '../../hooks/use-play-board'

export function GamePlayBoard() {
  const deck = usePlayBoard(state => state.deck)
  const pointsByHand = usePlayBoard(state => state.pointsByHand)

  const calculatePoints = usePlayBoard(state => state.calculatePoints)
  const shuffleCards = usePlayBoard(state => state.shuffleCards)

  return (
    <div className="game-play-board">
      <div className="game-play-board-left">
        <Board cards={deck.west} direction="west" place="down" />
      </div>
      <div className="game-play-board-center">
        <Board cards={deck.north} direction="north" place="right" />

        <div className="game-play-board-actions">
          <button className="game-play-board-button" type="button" onClick={calculatePoints}>
            Calculate points
          </button>

          <button className="game-play-board-button" type="button" onClick={shuffleCards}>
            Shuffle
          </button>

          {JSON.stringify(pointsByHand)}
        </div>
        <Board cards={deck.south} direction="south" place="right" />
      </div>
      <div className="game-play-board-right">
        <Board cards={deck.east} direction="east" place="down" />
      </div>
    </div>
  )
}
