import React from 'react';
import { Game } from '../Game/Game';
import { Letter } from '../Letter/Letter';
import { Music } from '../music/Music';
import styles from './App.module.scss';

function App() {
    const [showMenu, setShowMenu] = React.useState<boolean>(true);
    const menuClick = () => {
        setShowMenu(false);
    };
    return (
        <div className={styles.App}>
            {showMenu ? <Letter onClick={() => menuClick()}/> : <Game/>}
            <Music gameStarted={!showMenu}/>
        </div>

    );
};

export default App;
