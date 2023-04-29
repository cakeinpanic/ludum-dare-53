import React from 'react';
import { Game } from '../Game/Game';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.App}>
            <h1 className={styles.title}> Game</h1>
            <Game/>
        </div>

    );
};

export default App;
