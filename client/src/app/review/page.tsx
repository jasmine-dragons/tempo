"use client"
import ReviewTab from "@/components/ReviewTab";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";

export default function ReviewPage() {

    return (
      <main>
        <div className={styles.container}>
            <ReviewTab/>
        </div>
      </main>
    );
  }
  