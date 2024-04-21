"use client";
import Studio from "@/components/Studio";
import Typography from "@/components/Typography";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Playground() {
  return (
    <main>
      <div className={styles.page}>
        <Link href="/" style={{ width: "fit-content" }}>
          <Typography variant="body" className={styles.back} bold>
            {"go back."}
          </Typography>
        </Link>
        <Studio />
      </div>
    </main>
  );
}
