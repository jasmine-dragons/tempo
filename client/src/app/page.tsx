"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@/components/Typography";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createGame, joinGame } from "@/api";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import { io } from "socket.io-client";
import showToast from "@/components/showToast";
import { initializeSocket } from "@/utils/socket";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const router = useRouter();

  const queryParam = new URLSearchParams({ user }).toString();

  useEffect(() => {
    const name = localStorage.getItem("tempo-name");
    if (name !== null) {
      setUser(name);
    }
  }, []);

  useEffect(() => {
    if (user !== "") {
      localStorage.setItem("tempo-name", user);
    }
  }, [user]);

  const onCreate = async () => {
    if (user === "") {
      showToast("set a user name first.");
      return;
    }
    try {
      const socket = initializeSocket();
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("notification", (notification) => {
        showToast(notification.description);
        console.log(notification);
      });
      localStorage.setItem("tempo-leader", user);
      const gameSession = await createGame(user);
      socket.emit("player join", { name: user, room: gameSession.sessionId });
      router.push(`/room/${gameSession.sessionId}?${queryParam}`);
    } catch (e) {
      showToast("Error creating room", (e as Error).message);
    }
  };

  const onJoin = async () => {
    if (user === "") {
      showToast("set a user name first.");
      return;
    }

    if (code === "") {
      showToast("fill out the room code first.");
      return;
    }
    try {
      const socket = initializeSocket();
      const gameSession = await joinGame(code, user);
      socket.emit("player join", { name: user, room: gameSession.sessionId });
      socket.on("notification", (notification) => {
        showToast(notification.description);
        console.log(notification);
      });
      socket.on("users", (users) => {
        console.log(users);
      });
      router.push(`/room/${gameSession.sessionId}?${queryParam}`);
    } catch (e) {
      showToast("Error joining room", (e as Error).message);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Hero user={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div className={styles.options}>
          <button
            type="button"
            onClick={onCreate}
            className={`${styles.option} ${styles.button}`}
          >
            <Typography variant="body">create a room.</Typography>
          </button>
          <div className={styles.option}>
            <button type="button" onClick={onJoin} className={styles.button}>
              <Typography variant="body">join a room.</Typography>
            </button>
            <label className={styles.joinLabel}>
              code:
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={styles.joinInput}
              />
            </label>
          </div>
          <Link
            href="/playground"
            className={`${styles.option} ${styles.button}`}
          >
            <Typography variant="body">play solo.</Typography>
          </Link>
        </div>
      </div>
    </main>
  );
}
