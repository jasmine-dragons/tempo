import PlayersDisplay from "@/components/PlayersDisplay";
import styles from "./page.module.scss";
import { Player } from "@/types";

const PLAYERS: Player[] = [
  {
    name: "alex",
    uuid: "aaa",
    isLeader: true,
  },
  {
    name: "jenny",
    uuid: "jjj",
    isLeader: false,
  },
  {
    name: "nikhil",
    uuid: "nok",
    isLeader: false,
  },
];

export default function Game() {
  return (
    <main>
      <div className={styles.container}>
        <PlayersDisplay players={PLAYERS} waiting />
      </div>
    </main>
  );
}
