import styles from "./style.module.scss";
import Typography from "../Typography";

interface AudioProps {
    audio: string
  }

const ReviewTabContent = ({ audio }: AudioProps)=> {
  return (
    <div className={styles.container}>
     this is a review of {audio}. this is a review of {audio}. this is a review of {audio}. this is a review of {audio}. this is a review of {audio}. this is a review of {audio}. 
    </div>
  );
};

export default ReviewTabContent;
