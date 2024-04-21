"use client";
import { getGame } from "@/api";
import InfoDisplay from "@/components/InfoDisplay";
import Loading from "@/components/Loading";
import PlayersDisplay from "@/components/PlayersDisplay";
import { GameSession, Player } from "@/types";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.scss";
import Typography from "@/components/Typography";
import Link from "next/link";
import { initializeSocket } from "@/utils/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { Socket } from "socket.io-client";

interface WaitingRoomPageProps {
  params: {
    uuid: string;
  };
}

export default function WaitingRoomPage({ params }: WaitingRoomPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [game, setGame] = useState<GameSession | null>(null);
  const socket = useRef<Socket | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchGame = () =>
    getGame(params.uuid)
      .then((g) => {
        setGame(g);
      })
      .finally(() => setLoading(false));

  const startGame = () => {
    if (socket.current !== null) {
      socket.current.emit("game start");
    }
  };

  useEffect(() => {
    const sock = initializeSocket();
    const user = searchParams.get("user");
    let query = "";
    if (user) {
      query = `?${new URLSearchParams({ user }).toString()}`;
    }
    sock.on("users", () => fetchGame());
    sock.on("startGameState", () =>
      router.push(`/game/${params.uuid}${query}`),
    );
    socket.current = sock;
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
          <InfoDisplay startGame={startGame} />
        </div>
      </div>
    </main>
  );
}
