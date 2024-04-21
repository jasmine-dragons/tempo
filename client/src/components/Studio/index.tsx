import { useState } from "react";
import GenerativeAudio from "../GenerativeAudio";
import styles from "./style.module.scss";
import Typography from "../Typography";
import AnimatedLogo from "../AnimatedLogo";
import { mergeIntoBlob } from "@/utils/crunker";

export interface AudioProps {
  prompt: string;
  loading: boolean;
  file: Blob | null;
}

export type Blobs = {
  one?: Blob;
  two?: Blob;
  three?: Blob;
  four?: Blob;
}

const Studio = () => {
  const [stop, setStop] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [blobs, setBlobs] = useState<Blobs>({});
  const [collect, setCollect] = useState<boolean>(false);

  const addBlob = (blob: Blob, key: "one" | "two" | "three" | "four") => {
    setBlobs((blobs) => { 
      const newBlobs = {...blobs}; 
      newBlobs[key] = blob; 
      return newBlobs;
    })
  }

  const collectBlobs = () => {
    setCollect(true);
    setCollect(false);
    mergeIntoBlob([blobs.one, blobs.two, blobs.three, blobs.four].filter(i => i !== undefined) as Blob[]);
  }

  return (
    <div className={styles.container}>
      <AnimatedLogo />
      <div className={styles.music}>
        <GenerativeAudio stop={stop} restart={restart} addBlob={(b: Blob) => addBlob(b, 'one')} collect={collect}/>
        <GenerativeAudio stop={stop} restart={restart} addBlob={(b: Blob) => addBlob(b, 'two')} collect={collect} />
        <GenerativeAudio stop={stop} restart={restart} addBlob={(b: Blob) => addBlob(b, 'three')} collect={collect} />
        <GenerativeAudio stop={stop} restart={restart} addBlob={(b: Blob) => addBlob(b, 'four')} collect={collect} />
        <div className={styles.buttons}>
          <button
            onClick={() => setRestart((r) => !r)}
            className={styles.button}
          >
            <Typography variant="body" bold>
              replay all tracks.
            </Typography>
          </button>
          <button onClick={() => setStop((r) => !r)} className={styles.button}>
            <Typography variant="body" bold>
              stop all tracks.
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Studio;
