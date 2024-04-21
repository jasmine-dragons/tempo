import { AugmentedPlayer } from "../ReviewTab";
import { useState } from "react";
import styles from "./style.module.scss";
import Typography from "../Typography";
import Loading from "../Loading";

interface SubmissionSummaryProps {
  submission: {
    user: string;
    blob: {
      type: string;
      data: ArrayBuffer;
    };
  };
  rateAudio: (p: AugmentedPlayer, url: string) => Promise<string>;
  player: AugmentedPlayer;
}

const SubmissionSummary = ({
  submission,
  rateAudio,
  player,
}: SubmissionSummaryProps) => {
  const [review, setReview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const rev = await rateAudio(player, url);
      setReview(rev);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const url = `data:audio/mp3;base64,${Buffer.from(submission.blob.data).toString("base64")}`;

  return (
    <>
      <audio controls src={url} />
      {review.length > 0 ? <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Typography variant="body" className={styles.text} bold>
        google gemini:
      </Typography>
      <Typography variant="body" className={styles.text}>
        {review}
      </Typography>
      </div> : null}
      {loading ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}><Loading /></div>
      ) : (
        <button
          type="button"
          className={styles.geminiButton}
          onClick={handleClick}
        >
          <Typography variant="body" bold>
            critique this tempo (with google gemini).
          </Typography>
        </button>
      )}
    </>
  );
};

export default SubmissionSummary;
