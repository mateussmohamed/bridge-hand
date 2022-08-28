import type { Card } from '../@types'
import { GameCard } from '../ui/game-card/game-card'

interface BoardProps {
  cards: Card[]
  place: 'down' | 'right'
  direction: 'north' | 'east' | 'south' | 'west'
}

export function Board({ cards, place, direction }: BoardProps) {
  const containerClass = ['north', 'south'].includes(direction)
    ? 'hand-container-horizontal'
    : 'hand-container-vertical'

  return (
    <div className={`hand-container ${containerClass} hand-${direction}`}>
      <div className="hand-cards">
        {cards.map(({ rank, suit }, index) => {
          let className = ''
          if (index !== 0) {
            className = place
          }

          return <GameCard key={`${direction}:${index}`} rank={rank} suit={suit} place={place} />
        })}
      </div>

      <h1 className="hand-title">{direction}</h1>
    </div>
  )
}
