import styles from "./style.module.scss";
import Typography from "../Typography";
import { useState, useEffect } from "react";
import ReviewTabContent from "../ReviewTabContent";
import Link from "next/link";

const ReviewTab = () => {

  const players = ["test", "test1", "test2", "test3"];
  const [active, setActive] = useState<string>(players[0]);

  return (
    <div className={styles.container}>
      <div className={styles.tabNav}>
        {players.map((player) => (
        <div
            className={styles.audio}
            onClick={() => setActive(player)}
            key={player}
        >
            {player}
        </div>
        ))}
      </div>
      <div className={styles.tabContent}>
        <ReviewTabContent player={active}/>
        <Link href="/" className={styles.start}>
        <Typography variant="body" className={styles.playAgain} bold>
          play again.
        </Typography>
      </Link>
      </div>
    </div>
  );
};

export default ReviewTab;
