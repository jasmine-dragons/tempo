"use client";
import { getGame, submitGame } from "@/api";
import Loading from "@/components/Loading";
import { GameSession, Player } from "@/types";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import ReviewTab from "@/components/ReviewTab";
import { initializeSocket } from "@/utils/socket";

interface ReviewPageProps {
  params: {
    uuid: string;
  };
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [game, setGame] = useState<GameSession | null>(null);
  console.log(game);

  const fetchGame = () =>
    getGame(params.uuid)
      .then((g) => {
        console.log(g);
        setGame(g);
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    const socket = initializeSocket();
    socket.on("endGameState", fetchGame);
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
  } else if (game === null) {
    return <main>game couldn&apos;t be found.</main>;
  }

  const players: Player[] = game.users.map((user) => ({
    name: user,
    uuid: user,
    isLeader: user === game.gameLeader,
  }));

  return (
    <main>
      <div className={styles.container}>
        <ReviewTab players={players} submissions={game.submissions} />
      </div>
    </main>
  );
}
