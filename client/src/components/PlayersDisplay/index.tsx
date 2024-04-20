import { Player } from "@/types";
import styles from './style.module.scss'
import Typography from "../Typography";

interface PlayersDisplayProps {
    players: Player[];
}

const PlayersDisplay = ({players}: PlayersDisplayProps) => {
    return <div className={styles.container}>
        <Typography variant="subheader" bold>{`PLAYERS (${players.length})`}</Typography>
        {players.map(player => 
            <div key={player.uuid} className={styles.player}>
                <Typography variant="subheader">{player.name}</Typography>
            </div>
        )}
    </div>
}

export default PlayersDisplay