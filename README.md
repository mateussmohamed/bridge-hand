<h1 align='center'>Bridge Hand ♣♦♥♠</h1>

[![Author](https://img.shields.io/badge/author-mateussmohamed-EDF2F7?style=flat-square)](https://github.com/mateussmohamed)
[![Languages](https://img.shields.io/github/languages/count/mateussmohamed/bridge-hand?color=%23EDF2F7&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/mateussmohamed/bridge-hand?color=EDF2F7&style=flat-square)](https://github.com/mateussmohamed/bridge-hand/stargazers)
[![Forks](https://img.shields.io/github/forks/mateussmohamed/bridge-hand?color=%23EDF2F7&style=flat-square)](https://github.com/mateussmohamed/bridge-hand/network/members)
[![Contributors](https://img.shields.io/github/contributors/mateussmohamed/bridge-hand?color=EDF2F7&style=flat-square)](https://github.com/mateussmohamed/bridge-hand/graphs/contributors)

<p align="center">
   <a href="http://bridge-hand.vercel.app">Go check it out 🎉</a>
</p>

---

# :pushpin: Table of Contents

- [About](#question-about)
- [Features](#rocket-features)
- [Installation](#construction_worker-installation)
- [Getting Started](#runner-getting-started)
- [FAQ](#postbox-faq)

# :question: About

A hand may have 13 cards in the bridge, spread across four suits. The four suits are hearts, spades, clubs, and diamonds. The royal cards and aces are worth points during bidding. An Ace is worth four points, a King is worth three points, a Queen is worth two, and a Jack is worth one. Other cards are not worth points (but are used in real bidding to determine the contract).

# :rocket: Features

- Shuffled cards face up in four hands (West, North, East, South)
- Shuffled Deck action
- Calculate points per hand action

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/)(or other package manager) first, then in order to clone the project via HTTPS, run this command:**

`git clone https://github.com/mateussmohamed/bridge-hand.git`

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command:

`git clone git@github.com:mateussmohamed/bridge-hand.git`

`cd bridge-hand`

# :runner: Getting Started

**Install dependencies**
`pnpm install`

**Run**
`pnpm run dev`

**Other scripts**

`pnpm run build`

`pnpm run preview`

`pnpm run checktype`

`pnpm run test`

`pnpm run coverage`

# :postbox: Faq

#### Question

What are the technologies used in this project?

#### Answer

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [Vitest](https://vitest.dev)
- [pnpm](https://pnpm.io)
- [zustand](https://github.com/pmndrs/zustand)
- [lodash.range](https://lodash.com/docs/4.17.15#range)
- [lodash.shuffle](https://lodash.com/docs/4.17.15#shuffle)

#### Question

What are the types of cards?

#### Answer

Cards are sorted by suit (Spade, Heart, Diamond, Club), then by number, (Ace, King, Queen, Jack, 10, 9...2).

#### Question

How many cards per hand?

#### Answer

13 cards per hand, 52 in the deck.

#### Question

What are the points per card?

#### Answer

- Ace: 4
- King: 3
- Queen: 2
- Jack: 1
- Others: 0
