import { createSignal, JSX } from "solid-js"

import Rock from '../icons/Rock'
import Paper from '../icons/Paper'
import Scissors from '../icons/Scissors'

export interface Choice {
  id: number,
  name: string,
  component: JSX.Element,
  losesTo: number
}

export const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 }
]

export const [wins, setWins] = createSignal(0)
export const [losses, setLosses] = createSignal(0)
export const [userChoice, setUserChoice] = createSignal<Choice | null>(null)
export const [computerChoice, setComputerChoice] = createSignal<Choice | null>(null)
export const [gameState, setGameState] = createSignal<string | null>('')