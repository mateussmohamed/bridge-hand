import './game-card.css'

enum COLOR_MAP {
  '♣' = 'game-card--black',
  '♦' = 'game-card--red',
  '♥' = 'game-card--red',
  '♠' = 'game-card--black'
}

type SuitSymbols = '♣' | '♦' | '♥' | '♠'

interface CardProps {
  suit: SuitSymbols
  rank: string
  place: 'down' | 'right'
}

function suitToColor(suit: SuitSymbols) {
  return COLOR_MAP[suit] || 'game-card--black'
}

export function GameCard({ rank, suit, place = 'down' }: CardProps) {
  const placeClass = place === 'right' ? 'game-card-place-right' : 'game-card-place-down'

  return (
    <div className={`game-card ${suitToColor(suit)} ${placeClass}`}>
      <div className="game-card-left">
        <div className="game-card-rank">{rank}</div>
        <div className="game-card-large-suit">{suit}</div>
      </div>

      <div className="game-card-right">
        <div className="game-card-small-suit">{suit}</div>
      </div>
    </div>
  )
}
