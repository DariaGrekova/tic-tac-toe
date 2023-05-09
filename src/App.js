import React from 'react';
import { Square } from './Square';
import { useState } from 'react';

export default function Board() {
	// начальным состоянием устанавливаем массив из 9 элементов со значением null
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		// если текущий элемент не null (разрешить менять только пустые квадраты)
		if (squares[i] || calculateWinner(squares)) {
			return;
		}

		// копия массива (иммутабельность)
		const nextSquares = squares.slice();

		// начальное состояние true, по первому клику отрисовать X
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}

		//обновить состояние на новый массив состояний 
		setSquares(nextSquares);
		// заменить состояние на противоположное
		setXIsNext(!xIsNext);
	}

	// отображение победителя или чей ход
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? 'X' : 'O');
	}

	return (
		<div>
			<div className='status'>{status}</div>
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</div>
	);
}


// определние победителя
function calculateWinner(squares) {
	// комбинации для победы
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < lines.length; i++) {
		// в каждой комбинации записываем элементы массива комбинации в переменные
		const [a, b, c] = lines[i];

		// если все 3 переменные имеют одно значение, возвращаем это значение
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	// пока значение не получено возврашаем null
	return null;
}
