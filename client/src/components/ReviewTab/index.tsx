import styles from "./style.module.scss";
import Typography from "../Typography";

interface AudioProps {
    audio: string
  }

const ReviewTab = ({ audio }: AudioProps)=> {
  return (
    <div className={styles.container}>
     {audio}
    </div>
  );
};

export default ReviewTab;
