'use client';

import styles from '../../styles/Home.module.css'
import {useCallback, useEffect, useState} from "react";
import {Button} from "@mui/material";
import Link from "next/link";

export default function Page() {
    const [stats, setStats] = useState<number[] | null>(null);

    useEffect(() =>{
        const localstorageString = window.localStorage.getItem("med-stats")
        setStats(localstorageString ? JSON.parse(localstorageString) : [])
    }, []);

    const getMean = (array: number[]) => {
        return array.reduce((partialSum, a) => partialSum + a, 0) / array.length;
    }

    const getStandardDeviation = (array: number[]) => {
        const mean = getMean(array)
        return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / array.length);
    };

    const round4sf = (highPrecision: number) => {
        return Math.round(highPrecision * 10000) / 10000
    }

    const clearAllTimes = useCallback(() => {
        window.localStorage.removeItem("med-stats")
        setStats([])
    }, []);

    if (!stats || stats.length === 0) return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Link href={"/"}>back</Link>
                <br />
                <p>No stats yet!</p>
            </main>
        </div> )

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Link href={"/"}>back</Link>
                <table>
                    <thead>
                    <tr>
                        <th>Total attempts</th>
                        <th>Average time</th>
                        <th>Standard deviation</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><h2>{stats.length}</h2></td>
                        <td><h2>{round4sf(getMean(stats))}</h2></td>
                        <td><h2>{round4sf(getStandardDeviation(stats))}</h2></td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <h2>Previous times:</h2>
                {stats.map(stat =>
                    <p key={stat} style={{marginBottom: '0px'}}>{stat}</p>
                )}
                <br/><br/>
                <Button variant={"outlined"} color={"warning"} onClick={clearAllTimes}>reset all stats</Button>
            </main>
        </div>
    )
}
