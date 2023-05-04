import React from 'react';
// import { useState } from 'react';

export function Square({ value, onSquareClick }) {
	//	const [value, setValue] = useState(null);

	return (
		//	<button className="square" onClick={handleClick}>{value}</button>
		<button className="square" onClick={onSquareClick}>{value}</button>
	)
}