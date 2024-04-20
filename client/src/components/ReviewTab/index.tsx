import styles from "./style.module.scss";
import Typography from "../Typography";
import { useState, useEffect } from "react";
import ReviewTabContent from "../ReviewTabContent";

const ReviewTab = () => {

  const audios = ["test", "test1", "test2", "test3"];
  const [active, setActive] = useState<string>(audios[0]);

  return (
    <div className={styles.container}>
      <div className={styles.tabNav}>
        {audios.map((audio) => (
        <div
            className={styles.audio}
            onClick={() => setActive(audio)}
            key={audio}
        >
            {audio}
        </div>
        ))}
      </div>
      <div className={styles.tabContent}>
        <ReviewTabContent audio={active}/>
      </div>
    </div>
  );
};

export default ReviewTab;
