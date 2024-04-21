"use client";
import { getGame } from "@/api";
import InfoDisplay from "@/components/InfoDisplay";
import Loading from "@/components/Loading";
import PlayersDisplay from "@/components/PlayersDisplay";
import { GameSession, Player } from "@/types";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Typography from "@/components/Typography";
import Link from "next/link";
import { initializeSocket } from "@/utils/socket";
import { useRouter } from "next/navigation";

interface WaitingRoomPageProps {
  params: {
    uuid: string;
  };
}

export default function WaitingRoomPage({ params }: WaitingRoomPageProps) {
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

  const players: Player[] = game.users.map((user) => ({
    name: user,
    uuid: user,
    isLeader: user === game.gameLeader,
  }));

  return (
    <main>
      <div className={styles.page}>
        <Link href="/" style={{ width: "fit-content" }}>
          <Typography variant="body" className={styles.back} bold>
            {"go back."}
          </Typography>
        </Link>
        <div className={styles.container}>
          <PlayersDisplay players={players} waiting onPlayerClick={() => {}} />
          <InfoDisplay />
        </div>
      </div>
    </main>
  );
}
