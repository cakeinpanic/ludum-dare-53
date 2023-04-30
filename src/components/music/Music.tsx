import { useEffect, useState } from "react";
import useSound from "use-sound";
import { RoomName } from "../../rooms/rooms";
import AmbienceKitchenMusic from "./ld_53_amb_dining.mp3";
import AmbienceGardenMusic from "./ld_53_amb_garden.mp3";
import AmbienceLivingMusic from "./ld_53_amb_living.mp3";

import firstActMainMusic from "./ld_53_main_1.mp3";
import styles from "./Music.module.scss";

const VOLUME = 0.3;
const FADE_DURATION = 800;
const params = { loop: true, soundEnabled: true, volume: VOLUME };

function muteSound(howlerObject: any, isAllMuted: boolean) {
  if (!howlerObject) {
    return;
  }

  if (isAllMuted) {
    howlerObject.fade(howlerObject.volume(), 0, FADE_DURATION);
  } else {
    howlerObject.fade(howlerObject.volume(), VOLUME, FADE_DURATION);
  }
}

export function Music({
  gameStarted,
  room,
  act,
}: {
  gameStarted: boolean;
  room: RoomName;
  act: number;
}) {
  const [isAllMuted, setIsAllMuted] = useState(true);
  const [, { sound: firstActSound }] = useSound(firstActMainMusic, {
    ...params,
    id: "act1",
  });
  const [, { sound: ambientGardenSound }] = useSound(AmbienceGardenMusic, {
    ...params,
    id: "garden",
  });
  const [, { sound: ambientLivingSound }] = useSound(AmbienceLivingMusic, {
    ...params,
    id: "living",
  });
  const [, { sound: ambientKitchenMusic }] = useSound(AmbienceKitchenMusic, {
    ...params,
    id: "kitchen",
  });

  const [currentActSound, setCurrentActSound] = useState<Howl | null>(null);
  const [currentRoomSound, setCurrentRoomSound] = useState<Howl | null>(null);

  useEffect(() => {
    ambientGardenSound?.stop();
    ambientLivingSound?.stop();
    ambientKitchenMusic?.stop();
    currentRoomSound?.play();
    return () => {
      ambientGardenSound?.stop();
      ambientLivingSound?.stop();
      ambientKitchenMusic?.stop();
    };
  }, [
    currentRoomSound,
    ambientGardenSound,
    ambientLivingSound,
    ambientKitchenMusic,
  ]);

  useEffect(() => {
    muteSound(ambientGardenSound, isAllMuted);
    muteSound(ambientKitchenMusic, isAllMuted);
    muteSound(ambientLivingSound, isAllMuted);

    muteSound(firstActSound, isAllMuted);
  }, [
    isAllMuted,
    firstActSound,
    ambientGardenSound,
    ambientLivingSound,
    ambientKitchenMusic,
  ]);

  useEffect(() => {
    firstActSound?.stop();
    switch (act) {
      case 1:
        firstActSound?.play();
        return;
      case 2:
        return;
      case 3:
        return;
      default:
    }
    return () => {
      console.log("stop act");
      firstActSound?.stop();
    };
  }, [act, firstActSound]);

  useEffect(() => {
    switch (room) {
      case RoomName.yard:
        setCurrentRoomSound(ambientGardenSound);
        return;
      case RoomName.living:
        setCurrentRoomSound(ambientLivingSound);
        return;
      case RoomName.kitchen:
        setCurrentRoomSound(ambientKitchenMusic);
        return;
      default:
        setCurrentRoomSound(null);
    }
  }, [room]);

  const muteAll = () => {
    setIsAllMuted(!isAllMuted);
    localStorage.setItem("mute", "" + !isAllMuted);
  };

  useEffect(() => {
    setIsAllMuted(localStorage.getItem("mute") === "true");
  }, []);

  return (
    <>
      <div
        className={styles.muteBtn + " " + (isAllMuted && styles.muted)}
        onClick={muteAll}
      >
        <span> {isAllMuted ? "unmute" : "mute"}</span>
      </div>
    </>
  );
}
