import React from 'react';
import { Board } from './Board';
import { useState } from 'react';

export default function Game() {
	// по умолчанию игрок = true
	const [xIsNext, setXIsNext] = useState(true);
	// массив, внутри коорого массив из 9 null
	const [history, setHistory] = useState([Array(9).fill(null)]);
	// какой шаг пользователь просматривает в данный момент
	const [currentMove, setCurrentMove] = useState(0);
	// текущий ход - последний массив из history
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		// хранить историю только до выбранного хода
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1)
		setXIsNext(!xIsNext);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
		// установить значение true, если число, на которое меняется currentMove, четное
		setXIsNext(nextMove % 2 === 0)
	}

	const moves = history.map((squares, move) => {
		let description;

		if (move > 0) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		)
	})

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	)
}


