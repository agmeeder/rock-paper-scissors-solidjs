import type { Component } from "solid-js"
import { createEffect } from "solid-js"
import { choices, wins, setWins, losses, setLosses, userChoice, setUserChoice, computerChoice, setComputerChoice, gameState, setGameState } from "./store/gameStore"

import './App.css'

const App: Component = () => {
  createEffect(() => {
    restartGame()
  })  

  const restartGame = () => {
    setGameState(null)
    setUserChoice(null)

    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  const handleUserChoice = (choiceId: number) => {
    const chosenChoice = choices.find(c => c.id === choiceId)
    setUserChoice(chosenChoice!)

    if (chosenChoice?.losesTo === computerChoice()?.id) {
      setLosses((losses) => losses + 1)
      setGameState('lose')
    } else if (computerChoice()?.losesTo === chosenChoice?.id) {
      setWins((wins) => wins + 1)
      setGameState('win')
    } else if (computerChoice()?.id === chosenChoice?.id) {
      setGameState('draw')
    }
  }

  return (
    <div class="app">
      <div class="info">
        <h2>Rock. Paper. Scissors</h2>

        <div class="wins-losses">
          <div class="wins">
            <span class="number">{wins()}</span>
            <span class="text">{wins() === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div class="losses">
            <span class="number">{losses()}</span>
            <span class="text">{losses() === 1 ? 'Loss' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {gameState() && (
        <div class={`game-state ${gameState}`} onClick={restartGame}>
          <div>
            <div class="game-state-content">
              <p>{userChoice()?.component}</p>
              {gameState() === 'win' && <p>Congrats! You won!</p>}
              {gameState() === 'lose' && <p>Sorry! You lost!</p>}
              {gameState() === 'draw' && <p>You drew!</p>}
              <p>{computerChoice()?.component}</p>
            </div>

            <button>Play Again</button>
          </div>
        </div>
      )}

      <div class="choices">
        <div>You</div>
        <div />
        <div>Computer</div>

        <div>
          <button class="rock" onClick={() => handleUserChoice(1)}>{choices[0].component}</button>
          <button class="paper" onClick={() => handleUserChoice(2)}>{choices[1].component}</button>
          <button class="scissors" onClick={() => handleUserChoice(3)}>{choices[2].component}</button>
        </div>

        <div class="vs">vs</div>

        <div>
          <button class="computer-choice">?</button>
        </div>
      </div>
    </div>
  )
}

export default App;