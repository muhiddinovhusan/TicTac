import './TicTacToe.css';
import cross from '../../assets/close.png';
import circle from '../../assets/letter-o.png';
import { useRef, useState } from 'react';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef();

    const toggle = (e, num) => {
        if (lock || data[num]) return; // Kilitlenmişse veya kutu doluysa işlem yapma
        const symbol = count % 2 === 0 ? 'x' : 'o';
        e.target.innerHTML = `<img src="${symbol === 'x' ? cross : circle}" >`;
        data[num] = symbol;
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                won(data[a]);
                return;
            }
        }
        if (count === 9) { 
            won(null);
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner) {
            titleRef.current.innerHTML = `Congratulations: <img src=${winner === 'x' ? cross : circle} > winner`;
        } else {
            titleRef.current.innerHTML = 'Draw!';
        }
    };

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.innerHTML = '';
        });
        titleRef.current.innerHTML = 'Tic Tac Toe Game';
        setCount(0);
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game</h1>
            <div className='board'>
                <div className="row1">
                    <div className="boxes" onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            <button onClick={reset} className='reset'>Reset</button>
        </div>
    );
};

export default TicTacToe;
