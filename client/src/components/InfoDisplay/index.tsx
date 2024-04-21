import styles from "./style.module.scss";
import Typography from "../Typography";
import Link from "next/link";

interface InfoDisplayProps {
  startGame: () => void;
}

const InfoDisplay = ({ startGame }: InfoDisplayProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="subheader" bold>{`how to play.`}</Typography>
      <div className={styles.steps}>
        <Typography
          variant="subheader"
          className={styles.step}
        >{`write a phrase to start off your song.`}</Typography>
        <Typography
          variant="subheader"
          className={styles.step}
        >{`you'll have 5 minutes to generate music.`}</Typography>
        <Typography
          variant="subheader"
          className={styles.step}
        >{`keep iterating on it, and unleash your creativity.`}</Typography>
        <Typography
          variant="subheader"
          className={styles.step}
        >{`at the end, we'll rate your songs and declare a winner!`}</Typography>
      </div>
      {localStorage.getItem("tempo-name") ==
      localStorage.getItem("tempo-leader") ? (
        <button type="button" onClick={startGame} className={styles.start}>
          <Typography variant="subheader" bold>
            let&apos;s start.
          </Typography>
        </button>
      ) : (
        <Typography variant="subheader" bold>
          waiting for leader...
        </Typography>
      )}
    </div>
  );
};

export default InfoDisplay;
