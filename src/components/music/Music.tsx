import { useEffect, useState } from "react";
import useSound from "use-sound";
import { RoomName } from "../../rooms/rooms";

import AmbienceKitchenMusic from "./ld_53_amb_dining.mp3";
import AmbienceGardenMusic from "./ld_53_amb_garden.mp3";
import AmbienceLivingMusic from "./ld_53_amb_living.mp3";
import AmbienceAtticMusic from "./ld_53_amb_attic.mp3";
import AmbienceBasementMusic from "./ld_53_amb_basement.mp3";

import firstActMainMusic from "./ld_53_main_1.mp3";
import secondActMainMusic from "./ld_53_main_2.mp3";
import thirdActMainMusic from "./ld_53_main_3.mp3";
import styles from "./Music.module.scss";
import React from "react";

const VOLUME = 0.3;
const FADE_DURATION = 800;
const params = { loop: true, soundEnabled: true, volume: 0 };

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
  isAllMuted,
  setIsAllMuted,
}: {
  gameStarted: boolean;
  room: RoomName;
  act: number;
  isAllMuted: boolean;
  setIsAllMuted: Function;
}) {
  const [, { sound: firstActSound }] = useSound(firstActMainMusic, {
    ...params,
    id: "act1",
  });
  const [, { sound: secondActSound }] = useSound(secondActMainMusic, {
    ...params,
    id: "act2",
  });
  const [, { sound: thirdActSound }] = useSound(thirdActMainMusic, {
    ...params,
    id: "act2",
  });
  const [, { sound: ambientGardenSound }] = useSound(AmbienceGardenMusic, {
    ...params,
    id: "garden",
  });
  const [, { sound: ambientLivingSound }] = useSound(AmbienceLivingMusic, {
    ...params,
    id: "living",
  });
  const [, { sound: ambientKitchenSound }] = useSound(AmbienceKitchenMusic, {
    ...params,
    id: "kitchen",
  });
  const [, { sound: ambientAtticSound }] = useSound(AmbienceAtticMusic, {
    ...params,
    id: "attic",
  });
  const [, { sound: ambientBasementSound }] = useSound(AmbienceBasementMusic, {
    ...params,
    id: "basement",
  });

  const [currentActSound, setCurrentActSound] = useState<Howl | null>(null);
  const [currentRoomSound, setCurrentRoomSound] = useState<Howl | null>(null);

  useEffect(() => {
    currentRoomSound?.play();
    return () => {
      currentRoomSound?.stop();
    };
  }, [currentRoomSound]);

  useEffect(() => {
    currentActSound?.play();
    return () => {
      currentActSound?.stop();
    };
  }, [currentActSound]);

  useEffect(() => {
    console.log({ isAllMuted });
    muteSound(currentActSound, isAllMuted);
    muteSound(currentRoomSound, isAllMuted);
  }, [currentActSound, currentRoomSound, isAllMuted]);

  useEffect(() => {
    switch (act) {
      case 1:
        setCurrentActSound(firstActSound);
        return;
      case 2:
        setCurrentActSound(secondActSound);
        return;
      case 3:
        setCurrentActSound(thirdActSound);
        return;
      default:
    }
  }, [act, firstActSound, secondActSound, setCurrentActSound, thirdActSound]);

  useEffect(() => {
    switch (room) {
      case RoomName.yard:
        setCurrentRoomSound(ambientGardenSound);
        return;
      case RoomName.living:
        setCurrentRoomSound(ambientLivingSound);
        return;
      case RoomName.kitchen:
        setCurrentRoomSound(ambientKitchenSound);
        return;
      case RoomName.attick:
        setCurrentRoomSound(ambientAtticSound);
        return;
      case RoomName.basement:
        setCurrentRoomSound(ambientBasementSound);
        return;
      default:
        setCurrentRoomSound(null);
    }
  }, [
    ambientGardenSound,
    ambientLivingSound,
    room,
    ambientKitchenSound,
    ambientAtticSound,
    ambientBasementSound,
  ]);

  const muteAll = () => {
    setIsAllMuted(!isAllMuted);
    localStorage.setItem("mute", "" + !isAllMuted);
  };

  useEffect(() => {
    if (localStorage.getItem("mute") === null) {
      setIsAllMuted(true);
      return;
    }
    setIsAllMuted(localStorage.getItem("mute") === "true");
  }, []);

  return (
    <div
      className={styles.muteBtn + " " + (isAllMuted && styles.muted)}
      onClick={muteAll}
    >
      <span> {isAllMuted ? "unmute" : "mute"}</span>
    </div>
  );
}
