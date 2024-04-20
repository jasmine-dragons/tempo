import styles from "./style.module.scss";
import Typography from "../Typography";

interface ReviewTabContentProps {
    player: string
  }

const ReviewTabContent = ({ player }: ReviewTabContentProps)=> {
  return (
    <div className={styles.container}>
     this is a review of {player}. this is a review of {player}. this is a review of {player}. this is a review of {player}. this is a review of {player}. 
    </div>
  );
};

export default ReviewTabContent;
