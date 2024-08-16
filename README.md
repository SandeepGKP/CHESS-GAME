# Real-Time Multiplayer Chess Game

This project is a real-time multiplayer chess game built with Node.js, Socket.IO, and Chess.js. The game allows two players to connect and play against each other, with additional support for spectators to watch the game in progress.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Gameplay Instructions](#gameplay-instructions)


## Features

- **Real-Time Multiplayer**: Play chess with another player in real-time using WebSockets.
- **Spectator Mode**: Additional connections can watch the ongoing game as spectators.
- **Interactive Chessboard**: Drag-and-drop interface for moving pieces on the board.
- **Legal Move Validation**: The backend validates moves to ensure they follow the rules of chess.
- **Player Role Assignment**: Automatic assignment of player roles (white/black) based on connection order.
- **Automatic Board Flipping**: The board orientation flips automatically for the black player.

## Installation

### Prerequisites

- Node.js installed on your system.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/chess-game.git
Navigate to the project directory:
    cd chess-game

Install the required dependencies:
    npm install
    
Start the server:
    npm start

Access the game:
    Open your web browser and navigate to http://localhost:3000.

Usage
Player Roles:

    The first connected user will be assigned the white pieces (playerRole: "w").
    The second connected user will be assigned the black pieces (playerRole: "b").
    Any additional connections will be spectators.
Moving Pieces:

    Drag and drop the pieces to move them.
    The game validates each move and updates the board state in real-time for all connected clients.
Disconnects:
    If a player disconnects, their role will be freed for a new connection.

Gameplay Instructions
Chess Rules:
    The game follows standard chess rules, including special moves like castling, en passant, and pawn promotion.
    The backend ensures that only legal moves are accepted.

Handling Turns:
    The game enforces turn-based play, with white moving first.
    Players can only move their own pieces; attempts to move the opponent's pieces will be ignored.