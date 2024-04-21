"use client";
import Studio from "@/components/Studio";
import Typography from "@/components/Typography";
import Link from "next/link";
import styles from "./page.module.scss";
import { getGame } from "@/api";
import Loading from "@/components/Loading";
import { GameSession } from "@/types";
import { initializeSocket } from "@/utils/socket";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface GamePageProps {
    params: {
      uuid: string;
    };
  }

export default function GamePage({ params: {uuid}}: GamePageProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameSession | null>(null);
    const router = useRouter()
    
    const fetchGame = () =>
      getGame(params.uuid)
        .then((g) => {
          setGame(g);
        })
        .finally(() => setLoading(false));
  
    useEffect(() => {
      const socket = initializeSocket();
  
      socket.on("users", () => fetchGame());
  
      socket.on('game start', () => router.push(`/game/${params.uuid}`))
    }, []);
  
    useEffect(() => {
      fetchGame();
    }, [params.uuid]);

    
    if (loading) {
        return (
          <main>
            <Loading />
          </main>
        );
      } else if (game === null || game === undefined) {
        return (
          <main>
            <div className={styles.notFound}>
              <Typography variant="subheader">
                game couldn&apos;t be found.
              </Typography>
              <Link href="/" className={styles.notFoundLink}>
                <Typography variant="body" bold>
                  back to home.
                </Typography>
              </Link>
            </div>
          </main>
        );
      }

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
