"use client";
import GenerativeAudio from "@/components/GenerativeAudio";
import { useState } from "react";

export default function MusicGen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = () => {};

  return (
    <main>
      <GenerativeAudio />
    </main>
  );
}
