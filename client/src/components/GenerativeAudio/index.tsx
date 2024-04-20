import { FormEvent, FormEventHandler, useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Loading from "../Loading";
import { generateMusic } from "@/api/musicGen";
import Typography from "../Typography";

type State = "blank" | "loading" | "complete";
interface ActionProps {
  state: State;
  progress: number;
  file: Blob | null;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const NewButton = ({handleSubmit}: {handleSubmit: FormEventHandler<HTMLFormElement>}) => {
    return (
        <button
          type="button"
          className={styles.button}
          onClick={(e) =>
            handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
          }
        >
          <Image
            src="/icons/plus.svg"
            width={40}
            height={40}
            alt="Add a new track"
          />
        </button>
      );
}

const PlayButton = ({file}: {file:Blob | null}) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const audio = useMemo(() => {
        if (file !== null){ 
            const url = window.URL.createObjectURL(file)
            const a = new Audio(url);
            a.onended = () => setPlaying(false);
            return a;
        }
    }, [])


    return (
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            if (playing) {
                audio?.pause();
                setPlaying(false)
            } else {
                audio?.play()
                setPlaying(true)
            }
          }}
        >
          <Image
            src={!playing || audio?.ended ? "icons/play.svg" : "/icons/pause.svg"}
            width={40}
            height={40}
            alt="Play the track"
          />
        </button>
      );
}

const ActionButton = ({ state, file, handleSubmit }: ActionProps) => {
  switch (state) {
    case "blank":
      return <NewButton handleSubmit={handleSubmit}/>
    case "loading":
      return <Loading className={styles.loading} />;
    case "complete":
      return <PlayButton file={file} />
  }
};

const GenerativeAudio = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | null>(null);
  const progress = useRef<number>(5);

  let state: State = "blank";
  if (loading) {
    state = "loading";
  } else if (file) {
    state = "complete";
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    generateMusic(() => {}, prompt, 0, 10)
      .then(setFile)
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <ActionButton
        state={state}
        handleSubmit={handleSubmit}
        progress={progress.current}
        file={file}
      />
      {state === "blank" ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.input}
            placeholder="Describe your track to MusicGen..."
          />
        </form>
      ) : (
        <Typography variant="subheader">{prompt}</Typography>
      )}
    </div>
  );
};

export default GenerativeAudio;
