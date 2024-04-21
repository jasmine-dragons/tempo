import { Player } from "@/types";
import styles from "./style.module.scss";
import Typography from "../Typography";
import Image from "next/image";

interface PlayersDisplayProps {
  players: Player[];
  waiting?: boolean;
  onPlayerClick: (playerName: string) => void;
}

const PlayersDisplay = ({
  players,
  waiting,
  onPlayerClick,
}: PlayersDisplayProps) => {
  return (
    <div className={styles.container}>
      <Typography
        variant="subheader"
        className={styles.header}
        bold
      >{`players.`}</Typography>
      {players.map((player, i) => (
        <div
          key={player.uuid}
          className={styles.playerCard}
          onClick={() => onPlayerClick(player.name)}
        >
          <div className={styles.playerInfo}>
            <Image
              src={`/players/${i}.svg`}
              width={75}
              height={75}
              alt={`${player.name}'s avatar'`}
            />
            <Typography variant="subheader">{player.name}</Typography>
          </div>
          {player.isLeader ? (
            <Image src="/icons/crown.svg" width={40} height={40} alt="crown" />
          ) : null}
        </div>
      ))}
      {waiting && players.length < 4
        ? Array(4 - players.length).fill(
            <div
              key={`Empty`}
              className={`${styles.playerCard} ${styles.empty}`}
            >
              <div className={styles.playerInfo}>
                <Image
                  src="/players/empty.svg"
                  width={75}
                  height={75}
                  alt={"Space available."}
                />
                <Typography variant="subheader">available.</Typography>
              </div>
            </div>,
          )
        : null}
    </div>
  );
};

export default PlayersDisplay;
