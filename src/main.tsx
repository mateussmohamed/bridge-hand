import React from 'react'
import ReactDOM from 'react-dom/client'
import { GamePlayBoard } from './components/game-play-board'

import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GamePlayBoard />
  </React.StrictMode>
)
