"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const GEMINI_KEY: any = process.env.NEXT_PUBLIC_GEMINI_KEY;

export default function Gemini() {
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);

  //   async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat();

  const msg = "How many paws are in my house?";
  //   }
  const handleSubmit = async (e: any) => {
    const chat = model.startChat();
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  };

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData]: any = useState([]);
  const [inputs, setName] = useState("");
  //   const [gender, setGender] = useState("");
  //   const [age, setAge] = useState("");
  //   const [country, setCountry] = useState("");
  //   const [hobbies, setHobbies] = useState("");
  // const genAI1 = new GoogleGenerativeAI(GEMINI_KEY);
  //   const fetchData = async () => {
  //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  //     const prompt = `${inputs}`;
  //     const result = await model.generateContent(prompt);
  //     const response = await result.response;
  //     const text = response.text();
  //     setApiData(text);
  //     setLoading(false);
  //   };
  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     console.log(inputs);
  //     fetchData();
  //   };
  return (
    <div className="container">
      <h1>Google Gemini Test</h1>
      <div className="mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-end">
            <div className="col-lg-2">
              <label htmlFor="name" className="form-label">
                Input
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={inputs}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <button type="submit" className="btn btn-primary mt-3 col-lg-12">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        {!loading && <p className="text-align-left">{apiData}</p>}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
