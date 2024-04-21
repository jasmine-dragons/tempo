import styles from "./style.module.scss";
import Typography from "../Typography";
import Link from "next/link";
import { Player } from "@/types";

interface InfoDisplayProps {
  startGame: () => void;
  user: string,
  players: Player[]
}

const InfoDisplay = ({ startGame, user, players }: InfoDisplayProps) => {
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
      {players.some(p => p.name === user && p.isLeader) ? (
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
