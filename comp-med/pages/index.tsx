import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button, Typography} from "@mui/material";
import {useState} from "react";

export default function Home() {

    const [meditating, setMeditating] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [resultTime, setResultTime] = useState<number | null>(null);

    const startMeditation = () => {
        setResultTime(null)
        setMeditating(true)
        setStartTime(+new Date())
    }

    const stopMeditation = () => {
        setMeditating(false)
        const endTime = +new Date()
        const timeDelta = Math.round((endTime - startTime) / 100) / 10
        setResultTime(timeDelta)
        console.log("time delta", timeDelta)
        setStartTime(0)
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Competitive Meditation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={styles.main}>
            { !meditating ?
            <Button
                variant={"outlined"}
                size={"large"}
                onClick={() => startMeditation()}>Begin</Button>
            :
            <Button
                variant={"outlined"}
                size={"large"}
                color={"secondary"}
                onClick={() => stopMeditation()}>Done</Button>}

            <h2>{resultTime ?? ''}</h2>
        </main>
    </div>
  )
}
