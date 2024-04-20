"use client";
import { client } from "@gradio/client";
import { useState } from "react";

export default function MusicGen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e: any) => {
    const app = await client("https://facebook-musicgen.hf.space/", {});
    const result: any = await app.predict(0, [
      "Howdy!", // string  in 'Describe your music' Textbox component
    ]);
    console.log(result.data);
    setOutput(result.data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Generate</button>
      </form>
      <div>{output}</div>
    </div>
  );
}
