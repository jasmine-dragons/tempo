import { GameSession } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getGame(uuid: string): Promise<GameSession> {
  const response = await fetch(`${API_URL}/game/${uuid}`, { method: "GET" });
  const { game } = await response.json();
  return game as GameSession;
}

export async function joinGame(
  uuid: string,
  user: string,
): Promise<GameSession> {
  const response = await fetch(`${API_URL}/game/${uuid}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  const { game } = await response.json();
  return game as GameSession;
}

export async function createGame(user: string): Promise<GameSession> {
  console.log(user);
  const response = await fetch(`${API_URL}/game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ user }),
  });
  const { game } = await response.json();
  return game as GameSession;
}

export async function submitGame(user: string, uuid: string, submission: Blob) {
  const response = await fetch(`${API_URL}/game/${uuid}/submit?${new URLSearchParams({user}).toString()}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: submission
  })

  console.log(response);
}