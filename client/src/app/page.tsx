"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@/components/Typography";
import Link from "next/link";
import { useState } from "react";
import { createGame, joinGame } from "@/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  const onCreate = async () => {
    try {
      const gameSession = await createGame('alex')
      router.push(`/game/${gameSession.sessionId}`)
    } catch (e) {
      console.error(e);
    }
  }

  const onJoin = async () => {
    try {
      const gameSession = await joinGame(code, 'alex')
      router.push(`/game/${gameSession.sessionId}`)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.svg" width={500} height={350} alt="tempo logo." />
        </div>
        <div className={styles.options}>
          <button type="button" onClick={onCreate} className={`${styles.option} ${styles.button}`}>
            <Typography variant="body">create a room.</Typography>
          </button>
          <div className={styles.option}>
            <button type="button" onClick={onJoin} className={styles.button}>
              <Typography variant="body">join a room.</Typography>
            </button>
            <label className={styles.joinLabel}>
              code:
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={styles.joinInput}
              />
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
