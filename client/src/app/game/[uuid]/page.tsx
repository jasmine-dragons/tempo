"use client"
import { getGame } from "@/api";
import Loading from "@/components/Loading";
import { GameSession } from "@/types";
import { useState, useEffect } from "react";

interface GamePageProps {
    params: {
        uuid: string
    }
}

export default function GamePage({ params }: GamePageProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameSession | null>(null);

    useEffect(() => {
        const response = getGame(params.uuid).then((g) => { console.log(g); setGame(g)}).finally(() => setLoading(false));
    }, [params.uuid])

    if (loading) {
        return <main><Loading /></main>
    }
    
    return <main><div>My Post: {JSON.stringify(game)}</div></main>
}