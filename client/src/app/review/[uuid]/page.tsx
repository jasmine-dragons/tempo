"use client";
import { getGame } from "@/api";
import InfoDisplay from "@/components/InfoDisplay";
import Loading from "@/components/Loading";
import PlayersDisplay from "@/components/PlayersDisplay";
import { GameSession, Player } from "@/types";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import ReviewTab from "../../../components/ReviewTab";

interface ReviewPageProps {
  params: {
    uuid: string;
  };
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [game, setGame] = useState<GameSession | null>(null);

  useEffect(() => {
    getGame(params.uuid)
      .then((g) => {
        console.log(g);
        setGame(g);
      })
      .finally(() => setLoading(false));
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
        <ReviewTab players={players} />
      </div>
    </main>
  );
}
