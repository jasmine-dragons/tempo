import { Player } from "@/types";
import styles from './style.module.scss'
import Typography from "../Typography";
import Image from "next/image";

interface PlayersDisplayProps {
    players: Player[];
}

const PlayersDisplay = ({players}: PlayersDisplayProps) => {
    return <div className={styles.container}>
        <Typography variant="subheader" bold>{`players.`}</Typography>
        {players.map((player, i) => 
            <div key={player.uuid} className={styles.playerCard}>
                <Image src={`/players/${i}.svg`} width={75} height={75} alt={`${player.name}'s avatar'`} />
                <Typography variant="subheader">{player.name}</Typography>
                {player.isLeader ? <Image src="/icons/crown.svg" width={40} height={40} alt="crown" />: null}
            </div>
        )}
    </div>
}

export default PlayersDisplay