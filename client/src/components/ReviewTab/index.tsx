import styles from "./style.module.scss";
import Typography from "../Typography";
import { useState, useEffect } from "react";
import ReviewTabContent from "../ReviewTabContent";
import Link from "next/link";
import PlayersDisplay from "../PlayersDisplay";
import { Player } from "../../types";

interface ReviewTabProps {
  players: Player[];
}

const ReviewTab = ({ players }: ReviewTabProps) => {

  const [review, setReview] = useState<string>(`this is the review for ${players[0].name}. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test.`);

  const handlePlayerClick = (playerName: string) => {
    setReview(`this is the review for ${playerName}. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test. this is a test.`);
    console.log("hi " + playerName);
  }

  return (
    <div className={styles.container}>
      <PlayersDisplay players={players} onPlayerClick={handlePlayerClick} />
      <div className={styles.tabContent}>
        <p>insert audio thing</p>
        <Typography variant="body">
          {review}
        </Typography>
        <Link href="/">
          <Typography variant="body" className={styles.playAgain} bold>
            play again.
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default ReviewTab;
