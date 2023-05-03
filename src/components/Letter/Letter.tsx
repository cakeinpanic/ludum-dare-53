import React, { useEffect } from "react";

import styles from "./Letter.module.scss";

export function Letter({
  onExit,
  skipTitle,
  isAllMuted,
  setIsAllMuted,
  ...rest
}) {
  const [showPreText, setShowPreText] = React.useState<boolean>(false);
  const [showTitle, setShowTitle] = React.useState<boolean>(true);
  const [showLetter, setShowLetter] = React.useState<boolean>(false);

  useEffect(() => {
    if (skipTitle) {
      setShowTitle(false);
      setShowPreText(true);
    }
  }, [skipTitle]);
  return (
    <div className={styles.letter} {...rest}>
      {!skipTitle && showTitle && (
        <div>
          <div className={styles.title}>Return to sender</div>
          <span
            className={styles.subsubtitle}
            target="_blank"
            href="https://ldjam.com/events/ludum-dare/53/"
          >
            <span style={{ fontSize: "1.3em" }}>
              Game about mysterious de-livery
            </span>{" "}
            <br />
            <span style={{ display: "none", opacity: ".8", marginTop: "10px" }}>
              {" "}
              Please{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  setIsAllMuted(false);
                }}
              >
                unmute music
              </span>{" "}
              in top right corner, this is game-changing experience{" "}
            </span>
            <br />
            <span
              className={styles.start}
              onClick={() => {
                setShowTitle(false);
                setShowPreText(true);
              }}
            >
              Start
            </span>
          </span>
          <a
            className={styles.sublink}
            target="_blank"
            href="https://ldjam.com/events/ludum-dare/53/"
          >
            ldjam 53 game
          </a>
        </div>
      )}
      {showPreText && (
        <div
          onClick={() => {
            setShowPreText(false);
            setShowLetter(true);
          }}
        >
          <div className={styles.subtitle}>
            Yesterday you were delivered a very strange letter in your mailbox,
            you don't know who sent it, and it does not contain a lot of
            information neither...
          </div>
        </div>
      )}
      {showLetter && (
        <div className={styles.container} onClick={() => onExit()}>
          <div className={styles.bg}></div>
          <span className={styles.text}>
            Hi! <br />
            <span>
              Writing you in a rush – there's something weird going in your
              parents house, please come and check it out ASAP.
            </span>
            <br />
            <span className={styles.signature}>Love, J</span>
          </span>
        </div>
      )}
    </div>
  );
}
