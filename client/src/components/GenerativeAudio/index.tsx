import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Loading from "../Loading";
import { generateMusic } from "@/api/musicGen";
import Typography from "../Typography";
import VolumeIcon from "../VolumeIcon";

type State = "blank" | "loading" | "complete";

interface NewRowProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  prompt: string;
  setPrompt: (p: string) => void;
}

const NewRow = ({ handleSubmit, prompt, setPrompt }: NewRowProps) => {
  return (
    <>
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={styles.input}
          placeholder="describe your track to musicgen."
        />
      </form>
    </>
  );
};

const LoadingRow = ({ prompt }: { prompt: string }) => {
  return (
    <>
      <Loading className={styles.loading} />
      <Typography variant="subheader" className={styles.prompt}>
        {prompt}
      </Typography>
    </>
  );
};

interface PlayRowProps {
  file: Blob | null;
  stop: boolean;
  restart: boolean;
  prompt: string;
  clearTrack: () => void;
  addBlob: (b: Blob) => void;
  collect: boolean
}

const PlayRow = ({
  file,
  stop,
  restart,
  prompt,
  clearTrack,
  addBlob,
  collect
}: PlayRowProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const stopMount = useRef<boolean>(false);
  const restartMount = useRef<boolean>(false);

  const audio = useMemo(() => {
    if (file !== null) {
      const url = window.URL.createObjectURL(file);
      const a = new Audio(url);
      a.onended = () => setPlaying(false);
      return a;
    }
  }, []);

  useEffect(() => {
    if (stopMount.current) {
      audio?.pause();
      setPlaying(false);
    } else {
      stopMount.current = true;
    }
  }, [stop]);

  useEffect(() => {
    if (audio && restartMount.current) {
      audio.currentTime = 0;
      audio.play();
      setPlaying(true);
    } else {
      restartMount.current = true;
    }
  }, [restart]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (collect && file !== null) {
      addBlob(file)
    }
  }, [collect])

  return (
    <div className={styles.playRow}>
      <div className={styles.playRowLeft}>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            if (playing) {
              audio?.pause();
              setPlaying(false);
            } else {
              audio?.play();
              setPlaying(true);
            }
          }}
        >
          <Image
            src={
              !playing || audio?.ended ? "icons/play.svg" : "/icons/pause.svg"
            }
            width={40}
            height={40}
            alt="Play the track"
          />
        </button>
        <Typography variant="subheader" className={styles.prompt}>
          {prompt}
        </Typography>
      </div>
      <div className={styles.options}>
        <button type="button" onClick={clearTrack} className={styles.button}>
          <Image
            src="/icons/trash.svg"
            height={40}
            width={40}
            alt="Delete track"
          />
        </button>
        <div className={styles.volume}>
          <VolumeIcon volume={volume} />
          <div className={styles.volumeSlider}>
            <div className={styles.volumeOutline}>
              <input
                type="range"
                min={0}
                max={100}
                onChange={(e) => setVolume(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GenerativeAudioProps {
  stop: boolean;
  restart: boolean;
  addBlob: (b: Blob) => void;
  collect: boolean;
}

const GenerativeAudio = ({ stop, restart, addBlob, collect }: GenerativeAudioProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | null>(null);

  let state: State = "blank";
  if (loading) {
    state = "loading";
  } else if (file !== null) {
    state = "complete";
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    generateMusic(() => {}, prompt, 0, 10)
      .then(setFile)
      .finally(() => setLoading(false));
  };

  const clearTrack = () => {
    setPrompt("");
    setFile(null);
    setLoading(false);
  };

  switch (state) {
    case "blank":
      return (
        <div className={styles.container}>
          <NewRow
            handleSubmit={handleSubmit}
            prompt={prompt}
            setPrompt={setPrompt}
          />
        </div>
      );
    case "loading":
      return (
        <div className={styles.container}>
          <LoadingRow prompt={prompt} />
        </div>
      );
    case "complete":
      return (
        <div className={styles.container}>
          <PlayRow
            file={file}
            stop={stop}
            restart={restart}
            prompt={prompt}
            clearTrack={clearTrack}
            addBlob={addBlob}
            collect={collect}
          />
        </div>
      );
  }
};

export default GenerativeAudio;
