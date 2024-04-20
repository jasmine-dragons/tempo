import { useState } from "react"
import GenerativeAudio from "../GenerativeAudio"
import styles from './style.module.scss'
import Typography from "../Typography";

export interface AudioProps {
    prompt: string;
    loading: boolean;
    file: Blob | null;
}

const Studio = () => {
    const [stop, setStop] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>(false);

    return <div className={styles.container}>
        <GenerativeAudio stop={stop} restart={restart} />
        <GenerativeAudio stop={stop} restart={restart} />
        <GenerativeAudio stop={stop} restart={restart} />
        <GenerativeAudio stop={stop} restart={restart} />
        <div className={styles.buttons}>
        <button onClick={() => setRestart(r => !r)} className={styles.button}><Typography variant="body">
            restart all tracks.</Typography></button>
        <button onClick={() => setStop(r => !r)} className={styles.button}><Typography variant="body">
            stop all tracks.</Typography></button></div>
    </div>
}

export default Studio