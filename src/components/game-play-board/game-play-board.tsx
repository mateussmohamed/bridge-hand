import './game-play-board.css'

import { GameHand } from '../game-hand'

import { usePlayBoard } from '../../hooks/use-play-board'

export function GamePlayBoard() {
  const deck = usePlayBoard(state => state.deck)
  const pointsByHand = usePlayBoard(state => state.pointsByHand)
  const calculatePoints = usePlayBoard(state => state.calculatePoints)
  const shuffleDeck = usePlayBoard(state => state.shuffleDeck)

  const disableCalculatePoints = Object.values(pointsByHand).reduce((acc, curr) => acc + curr, 0) > 0

  return (
    <div className="game-play-board">
      <div className="game-play-board-left">
        <GameHand cards={deck.west} direction="west" place="down" points={pointsByHand.west} />
      </div>
      <div className="game-play-board-center">
        <GameHand cards={deck.north} direction="north" place="right" points={pointsByHand.north} />

        <div className="game-play-board-actions">
          <button
            className="game-play-board-button"
            type="button"
            onClick={calculatePoints}
            disabled={disableCalculatePoints}
          >
            Calculate Points
          </button>

          <button className="game-play-board-button" type="button" onClick={shuffleDeck}>
            Shuffle Cards
          </button>
        </div>
        <GameHand cards={deck.south} direction="south" place="right" points={pointsByHand.south} />
      </div>
      <div className="game-play-board-right">
        <GameHand cards={deck.east} direction="east" place="down" points={pointsByHand.east} />
      </div>
    </div>
  )
}
