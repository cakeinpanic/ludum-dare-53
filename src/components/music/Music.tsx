import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import mute from './mute.png';
import styles from './Music.module.scss';
import neutral from './ludum_dare_beta_0.mp3';

const minus = require('./ludum_dare_beta_minus.mp3').default;

const VOLUME = .3;
const FADE_DURATION = 800;
const params = { loop: true, soundEnabled: true, volume: 0 };

enum Sound {
    default = 'default'
}

function doSound(currentSound: Sound | null, soundState: Sound, howlerObject: any, isAllMuted: boolean) {
    if (!howlerObject) {
        return;
    }
    if (currentSound === soundState && !isAllMuted) {
        howlerObject.fade(howlerObject.volume(), VOLUME, FADE_DURATION);
    } else {
        howlerObject.fade(howlerObject.volume(), 0, FADE_DURATION);
    }
}

export function Music({ gameStarted }: { gameStarted: boolean }) {
    const [isAllMuted, setIsAllMuted] = useState(false);
    const [, { sound: neutralSound }] = useSound(neutral, params);

    const [, { sound: minusJingle }] = useSound(minus, { loop: false, volume: VOLUME });

    const [currentSound, setCurrentSound] = useState<Sound | null>(null);

    useEffect(() => {
        if (neutralSound?.state() === 'loaded') {
            neutralSound.play();
        }
        return () => neutralSound.stop();

    }, [neutralSound]);

    useEffect(() => {
            if (!gameStarted) {
                return;
            }
            setCurrentSound(Sound.default);
        },
        [gameStarted]
    );

    useEffect(() => {
        doSound(currentSound, Sound.default, neutralSound, isAllMuted);
    }, [isAllMuted, currentSound, neutralSound]);

    const muteAll = () => {
        setIsAllMuted(!isAllMuted);
        localStorage.setItem('mute', '' + !isAllMuted);
    };

    useEffect(() => {
        setIsAllMuted(localStorage.getItem('mute') === 'true');
    }, []);

    return (
        <>
            <img className={styles.muteBtn + ' ' + (isAllMuted && styles.muted)} src={mute} onClick={muteAll}/>
        </>
    );
}
