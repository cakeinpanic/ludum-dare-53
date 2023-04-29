import React from 'react';
import { House } from '../House/House';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.App}>
            <h1 className={styles.title}> Game</h1>
            <House />
        </div>
    );
};

export default App;
