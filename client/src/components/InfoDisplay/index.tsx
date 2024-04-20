import styles from "./style.module.scss";
import Typography from "../Typography";
import Link from "next/link";

const InfoDisplay = () => {
  return (
      <div className={styles.container}>
        <Typography variant="subheader" bold>{`how to play.`}</Typography>
        <div className={styles.steps}>
            <Typography variant="subheader" className={styles.step}>{`write a phrase to start off your song.`}</Typography>
            <Typography variant="subheader" className={styles.step}>{`you'll receive a song someone else started; add to it using a phrase.`}</Typography>
            <Typography variant="subheader" className={styles.step}>{`keep alternating songs and adding to them.`}</Typography>
            <Typography variant="subheader" className={styles.step}>{`at the end, we'll rate your songs and declare a winner!`}</Typography>
        </div>
        <Link href="/game" className={styles.start}>
            <Typography variant="subheader" bold>let's start.</Typography>
        </Link>
    </div>
  );
};

export default InfoDisplay;
