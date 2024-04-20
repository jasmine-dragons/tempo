"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@/components/Typography";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState<string>("");

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.svg" width={500} height={300} alt="tempo logo." />
        </div>
        <div className={styles.options}>
          <Link href="/create" className={styles.option}>
            <Typography variant="body">create a room.</Typography>
          </Link>
          <div className={styles.option}>
            <Link href={`/game/${code}`}>
              <Typography variant="body">join a room.</Typography>
            </Link>
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
