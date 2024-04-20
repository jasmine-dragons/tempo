"use client"
import ReviewTab from "@/components/ReviewTab";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";

export default function ReviewPage() {
    
    const audios = ["test", "test1", "test2", "test3"];
    const [active, setActive] = useState<string>(audios[0]);

    return (
      <main>
        <div className={styles.container}>
            <div className={styles.tabNav}>
              {audios.map((audio) => (
                <div
                  onClick={() => setActive(audio)}
                  key={audio}
                >
                  {audio}
                </div>
              ))}
            </div>
            <div className={styles.tabContent}>
              <ReviewTab audio={active}/>
            </div>
        </div>
      </main>
    );
  }
  