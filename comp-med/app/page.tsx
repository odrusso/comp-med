'use client';

import styles from '../styles/Home.module.css'
import {Box, Button, Modal} from "@mui/material";
import {useState} from "react";
import jstat from "jstat";
import Link from "next/link";
import Wave from "react-wavify";

export default function Page() {
    const [meditating, setMeditating] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [resultTime, setResultTime] = useState<number | null>(null);
    const [resultPercentile, setResultPercentile] = useState<number | null>(null);
    const [helpOpen, setHelpOpen] = useState(false);

    const startMeditation = () => {
        setResultTime(null)
        setResultPercentile(null)
        setMeditating(true)
        setStartTime(+new Date())
    }

    const stopMeditation = () => {
        setMeditating(false)
        const endTime = +new Date()
        const timeDelta = Math.round((endTime - startTime)) / 1000
        setResultTime(timeDelta)
        setPercentile(timeDelta)
        setStartTime(0)

        addResult(timeDelta)
    }

    const setPercentile = (timeDelta: number) => {
        const timeProbability = jstat.normal(30, 4).pdf(timeDelta);
        const timePercentile = timeProbability * 100
        const timePercentileRounded = Math.round(timePercentile * 1000) / 100
        setResultPercentile(timePercentileRounded)
    }

    const addResult = (time: number) => {
        const localstorageString = window.localStorage.getItem("med-stats")
        const currentStats: number[] = localstorageString ? JSON.parse(localstorageString) : []
        currentStats.push(time)
        window.localStorage.setItem("med-stats", JSON.stringify(currentStats))
    };

    return (
        <div className={styles.container}>

            <Wave className={styles.wave} paused={!meditating} options={{height: 500, speed: 0.05, points: 3, amplitude: 200}} />

            <main className={styles.main}>
                {!meditating ?
                    <>
                        <Button
                        variant={"contained"}
                        className={styles.button_begin}
                        style={{ width: 200, height: 80 }}
                        onClick={() => startMeditation()}>Begin</Button>
                        <br />
                        <a href={"#"} onClick={() => setHelpOpen(true)} >help</a>
                    </>
                    :
                    <Button
                        variant={"contained"}
                        className={styles.button_end}
                        style={{ width: 200, height: 80 }}
                        color={"secondary"}
                        onClick={() => stopMeditation()}>Done</Button>}

                <h2 style={{marginBottom: 0}}>{resultTime != null ? resultTime + "s" : ''}</h2>
                <h3 style={{marginTop: 0}}>{resultPercentile != null ? resultPercentile + "th percentile" : ''}</h3>
                <h4><Link href={'/stats'}>{resultTime != null ? 'stats' : ''}</Link></h4>
            </main>
            <Modal
                open={helpOpen}
                onClose={() => setHelpOpen(false)}>
                <Box className={styles.modal}>
                    <p>press <small>BEGIN</small>, count to 30, hit stop.</p>
                    <small>click anywhere to dismiss.</small>
                    <br />
                    <br />
                </Box>
            </Modal>
        </div>
    )
}
