import './game-hand.css'

import type { Card } from '../../@types'

import { GameCard } from '../game-card/game-card'

interface HandProps {
  cards: Card[]
  place: 'down' | 'right'
  direction: 'north' | 'east' | 'south' | 'west'
  points: number
}

export function GameHand({ cards, place, direction, points }: HandProps) {
  const containerClass = ['north', 'south'].includes(direction)
    ? 'hand-container-horizontal'
    : 'hand-container-vertical'

  return (
    <div className={`hand-container ${containerClass} hand-${direction}`} data-testid={`hand-${direction}`}>
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

      <h3 className="hand-point" data-testid={`hand-${direction}-points`}>
        Points: {points}
      </h3>
    </div>
  )
}
