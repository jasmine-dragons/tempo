import PlayersDisplay from "@/components/PlayersDisplay";
import styles from "./page.module.scss";
import { Player } from "@/types";
import { io } from "socket.io-client";

const port = process.env.PORT || 8000;
const socket = io("ws://localhost:8000");

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
  {
    name: "nishant",
    uuid: "nish",
    isLeader: false,
  },
];
socket.on("connection", () => {});
socket.emit("howdy", "server!");
console.log("hi");

export default function Game() {
  return (
    <main>
      <div className={styles.container}>
        <PlayersDisplay players={PLAYERS} />
      </div>
    </main>
  );
}
