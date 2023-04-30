import { useEffect, useState } from "react";
import useSound from "use-sound";
import mute from "./mute.png";
import styles from "./Music.module.scss";

import firstActMainMusic from "./ld_53_main_1.mp3";
import AmbienceGardenMusic from "./ld_53_amb_garden.mp3";
import { RoomName } from "../../rooms/rooms";

// const minus = require("./ludum_dare_beta_minus.mp3").default;

const VOLUME = 0.3;
const FADE_DURATION = 800;
const params = { loop: true, soundEnabled: true, volume: 0 };

enum Sound {
  default = "default",
}

function doSound(howlerObject: any, isAllMuted: boolean) {
  if (!howlerObject) {
    return;
  }
  if (!isAllMuted) {
    howlerObject.fade(howlerObject.volume(), VOLUME, FADE_DURATION);
  } else {
    howlerObject.fade(howlerObject.volume(), 0, FADE_DURATION);
  }
}

export function Music({ gameStarted, room, act }: { gameStarted: boolean, room: RoomName, act: number }) {

  const [isAllMuted, setIsAllMuted] = useState(false);
  const [, { sound: actSound }] = useSound(firstActMainMusic, params);
  const [, { sound: ambientSound }] = useSound(AmbienceGardenMusic, params);

//   const [, { sound: minusJingle }] = useSound(minus, {
//     loop: false,
//     volume: VOLUME,
//   });

  const [currentSound, setCurrentSound] = useState<Sound | null>(null);

  useEffect(() => {
    if (actSound?.state() === "loaded") {
        actSound.play();
    }
    return () => actSound?.stop();
  }, [actSound]);

  useEffect(() => {
    if (!gameStarted) {
      return;
    }
    setCurrentSound(Sound.default);
  }, [gameStarted]);

  useEffect(() => {
    doSound(actSound, isAllMuted);
  }, [isAllMuted, currentSound, actSound]);

  const muteAll = () => {
    setIsAllMuted(!isAllMuted);
    localStorage.setItem("mute", "" + !isAllMuted);
  };

  useEffect(() => {
    setIsAllMuted(localStorage.getItem("mute") === "true");
  }, []);

  return (
    <>
      <img
        className={styles.muteBtn + " " + (isAllMuted && styles.muted)}
        src={mute}
        onClick={muteAll}
      />
    </>
  );
}
