import React from 'react';
import { Game } from '../Game/Game';
import { Letter } from '../Letter/Letter';
import styles from './App.module.scss';

function App() {
    const [showMenu, setShowMenu] = React.useState<boolean>(true);
    const menuClick = () => {
        setShowMenu(false);
    };
    return (
        <div className={styles.App}>
            {/*<h1 className={styles.title}> Game</h1>*/}
            {showMenu ? <Letter onClick={() => menuClick()}/> : <Game/>}
        </div>

    );
};

export default App;
