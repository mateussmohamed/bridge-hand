import './game-play-board.css'

import { Board } from '../game-board'

import { usePlayBoard } from '../../hooks/use-play-board'

export function GamePlayBoard() {
  const deck = usePlayBoard(state => state.deck)
  const pointsByHand = usePlayBoard(state => state.pointsByHand)

  const totalPoints = Object.values(pointsByHand).reduce((acc, curr) => acc + curr, 0)

  const calculatePoints = usePlayBoard(state => state.calculatePoints)
  const shuffleCards = usePlayBoard(state => state.shuffleCards)

  return (
    <div className="game-play-board">
      <div className="game-play-board-left">
        <Board cards={deck.west} direction="west" place="down" points={pointsByHand.west} />
      </div>
      <div className="game-play-board-center">
        <Board cards={deck.north} direction="north" place="right" points={pointsByHand.north} />

        <div className="game-play-board-actions">
          <button className="game-play-board-button" type="button" onClick={calculatePoints} disabled={totalPoints > 0}>
            Calculate points
          </button>

          <button className="game-play-board-button" type="button" onClick={shuffleCards}>
            Shuffle
          </button>
        </div>
        <Board cards={deck.south} direction="south" place="right" points={pointsByHand.south} />
      </div>
      <div className="game-play-board-right">
        <Board cards={deck.east} direction="east" place="down" points={pointsByHand.east} />
      </div>
    </div>
  )
}
