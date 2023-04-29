import React from 'react';
import { Hero } from '../Hero/Hero';
import { House } from '../House/House';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.App}>
            <h1 className={styles.title}> Game</h1>
            {/*<House />*/}
            <Hero/>
        </div>

    );
};

export default App;
