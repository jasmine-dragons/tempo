import styles from "./style.module.scss";
import Typography from "../Typography";
import GenerativeAudio from "../GenerativeAudio";

interface ReviewTabContentProps {
    player: string
  }

const ReviewTabContent = ({ player }: ReviewTabContentProps)=> {
  return (
    <div className={styles.container}>
      <p>insert audio thing</p>
      <Typography variant="body">this is a review of {player}. this is a review of {player}. this is a review of {player}. this is a review of {player}. this is a review of {player}</Typography>
    </div>
  );
};

export default ReviewTabContent;
