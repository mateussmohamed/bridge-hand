import type { Card } from '../../@types'

import { GameCard } from '../game-card/game-card'

import './game-board.css'

interface BoardProps {
  cards: Card[]
  place: 'down' | 'right'
  direction: 'north' | 'east' | 'south' | 'west'
  points: number
}

export function Board({ cards, place, direction, points }: BoardProps) {
  const containerClass = ['north', 'south'].includes(direction)
    ? 'hand-container-horizontal'
    : 'hand-container-vertical'

  return (
    <div className={`hand-container ${containerClass} hand-${direction}`}>
      <h1 className="hand-title">{direction}</h1>

      <div className="hand-cards">
        {cards.map(({ rank, suit }, index) => {
          let className = ''
          if (index !== 0) {
            className = place
          }

          return <GameCard key={`${direction}:${index}`} rank={rank} suit={suit} place={place} />
        })}
      </div>

      <h1 className="hand-point">Points: {points}</h1>
    </div>
  )
}
