"use client";
import Studio from "@/components/Studio";
import Typography from "@/components/Typography";
import Link from "next/link";
import styles from "./page.module.scss";
import { getGame } from "@/api";
import Loading from "@/components/Loading";
import { GameSession } from "@/types";
import { initializeSocket } from "@/utils/socket";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";

interface GamePageProps {
  params: {
    uuid: string;
  };
}

export default function GamePage({ params: { uuid } }: GamePageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [game, setGame] = useState<GameSession | null>(null);
  // The session is 300 seconds.
  const [timer, setTimer] = useState<number>(300);
  const [user, setUser] = useState<string>("");
  const socket = useRef<Socket | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchGame = () =>
    getGame(uuid)
      .then((g) => {
        setGame(g);
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    const sock = initializeSocket();
    socket.current = sock;

    setInterval(
      () =>
        setTimer((t) => {
          if (t === 0) {
            return 0;
          }
          return t - 1;
        }),
      1000,
    );

    sock.on("endGameState", () => router.push(`/review/${uuid}`));

    const name = searchParams.get("user");

    setUser(name || "");
  }, []);

  useEffect(() => {
    fetchGame();
  }, [uuid]);

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

  let formattedTimer = `${Math.floor(timer / 60)}:${timer % 60}`;
  if (timer % 60 < 10) {
    formattedTimer = `${Math.floor(timer / 60)}:0${timer % 60}`;
  }

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.header}>
          <Link href="/" style={{ width: "fit-content" }}>
            <Typography variant="body" className={styles.back} bold>
              {"go back."}
            </Typography>
          </Link>
          <Typography variant="subheader" className={styles.timer} bold>
            {formattedTimer}
          </Typography>
        </div>
        <Studio
          user={user}
          uuid={uuid}
          timer={timer}
          socket={socket.current || undefined}
        />
      </div>
    </main>
  );
}
