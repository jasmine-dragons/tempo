import styles from "./style.module.scss";
import Typography from "../Typography";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import PlayersDisplay from "../PlayersDisplay";
import { Player } from "../../types";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";

const Prompt = (blob: Blob): Content[] => {
  return [
    {
      role: "user",
      parts: [
        {
          text: "Judge the quality of this music in 3 sentences, regardless of the length of the audio. The snippet provided is the full song. Do not base your judgement on the length of the song. Say whether it is good or bad music.",
        },
        {
          inlineData: {
            mimeType: "audio/mpeg",
            data: window.URL.createObjectURL(blob),
          },
        },
      ],
    },
  ];
};

interface ReviewTabProps {
  players: Player[];
  submissions: {
    user: string;
    blob: Blob;
  }[];
}

type AugmentedPlayer = Player & { submissions: { user: string; blob: Blob }[] };

const ReviewTab = ({ players, submissions }: ReviewTabProps) => {
  const augmentedPlayers = players.map(
    (player) =>
      ({
        ...player,
        submissions: submissions.filter((s) => s.user === player.name),
      }) as AugmentedPlayer,
  );
  const playerMap = new Map<string, AugmentedPlayer>(
    augmentedPlayers.map((p) => [p.name, p]),
  );
  // review that is currently showing up on the screen
  const [activePlayer, setActivePlayer] = useState<AugmentedPlayer>(
    augmentedPlayers[0],
  );
  const [reviews, setReviews] = useState<Map<string, string>>(new Map());

  const genAI = useMemo(
    () => new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY || ""),
    [],
  );
  const model = useMemo(
    () =>
      genAI.getGenerativeModel({
        model: "models/gemini-1.5-pro-latest",
      }),
    [],
  );

  async function rateAudio(player: AugmentedPlayer) {
    if (player.submissions.length === 0) {
      return;
    } else {
      const { response } = await model.generateContent({
        contents: Prompt(player.submissions[0].blob),
      });
      const text = response.text();
      setReviews((map) => new Map(map.set(player.name, text)));
    }
  }

  // show review associated with player
  const handlePlayerClick = (playerName: string) => {
    const player = playerMap.get(playerName);
    if (player) {
      setActivePlayer(player);
    }
  };

  return (
    <div className={styles.bigContainer}>
    <Link href="/" style={{ width: "fit-content" }}>
          <Typography variant="body" className={styles.back} bold>
            {"go back."}
          </Typography>
        </Link>
    <div className={styles.container}>
      <PlayersDisplay players={players} onPlayerClick={handlePlayerClick} />
      <div className={styles.tabContent}>
        <Typography variant="subheader" bold className={styles.subheader}>
          {activePlayer.name}'s tempo.
        </Typography>
        {activePlayer.submissions.length > 0 ? (
          <Typography variant="body" className={styles.subheader}>
          {JSON.stringify(activePlayer.submissions)}</Typography>
        ) : (
          <Typography variant="body" className={styles.subheader}>
            No submissions found for {activePlayer.name} :(
          </Typography>
        )}
      </div>
    </div></div>
  );
};

export default ReviewTab;
