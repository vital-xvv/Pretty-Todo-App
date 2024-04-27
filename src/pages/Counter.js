import React, { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import {Box, Stack, Typography} from "@mui/material";

const MS_SECOND = 1000;
const MS_MINUTE = MS_SECOND * 60;
const MS_HOUR = MS_MINUTE * 60;
const MS_DAY = MS_HOUR * 24;

const styles = {
    time_cont: {
        padding : 4,
        background: "#324158",
        border: "4px solid #A0A0A0",
        borderRadius: "20px"
    },
    main_container: {
    },
    box: {
        textAlign: "center"
    }
}

const defineUpcomingDate = () => {
    const date = new Date();
    const curr_day = date.getDay();

    date.setDate(date.getDate() + (6-curr_day));

    if(curr_day === 6 && date.getHours() >= 12){
        date.setDate(date.getDate() + 6);
    }

    date.setHours(12, 0,0);
    return date;
}

const Counter = () => {

    const [seconds, setSeconds] = useState('--');
    const [minutes, setMinutes] = useState('--');
    const [hours, setHours] = useState('--');
    const [days, setDays] = useState('--');
    const [upcomingDate, setUpcomingDate] = useState(defineUpcomingDate());

    const updateCountdown = () => {
        // отримати поточну дату в мілісекундах
        const currentTime = Date.now();
        const diff = upcomingDate.getTime() - currentTime;

        // різницю конвертувати в дні, години, хвилини, ...
        setDays(Math.floor(diff / MS_DAY));
        setHours(Math.floor((diff % MS_DAY) / MS_HOUR))
        setMinutes(Math.floor((diff % MS_HOUR) / MS_MINUTE))
        setSeconds(Math.floor((diff % MS_MINUTE) / MS_SECOND))
    }

    useEffect(() => {
        const id = setInterval(updateCountdown, 1000)
        const id2 = setInterval(() => {
            const date = defineUpcomingDate();
            setUpcomingDate(date);
        }, 1000)
        return () => {clearInterval(id); clearInterval(id2);}
    }, [])

    return (
        <Container sx={styles.main_container}>
            <Typography align="center" variant="h2" fontWeight={600}>IT Club starts in</Typography>
            <Stack direction="row" gap={3} sx={{marginTop: 3}}>
                <Container sx={styles.time_cont}>
                    <Typography variant="h3" color="primary" fontWeight={700} align="center">{days}</Typography>
                    <Typography variant="h4" color="secondary" align="center">Days</Typography>
                </Container>
                <Container sx={styles.time_cont}>
                    <Typography variant="h3" color="primary" fontWeight={700} align="center">{hours}</Typography>
                    <Typography variant="h4" color="secondary" align="center">Hours</Typography>
                </Container>
                <Container sx={styles.time_cont}>
                    <Typography variant="h3" color="primary" fontWeight={700} align="center">{minutes}</Typography>
                    <Typography variant="h4" color="secondary" align="center">Minutes</Typography>
                </Container>
                <Container sx={styles.time_cont}>
                    <Typography variant="h3" color="primary" fontWeight={700} align="center">{seconds}</Typography>
                    <Typography variant="h4" color="secondary" align="center">Seconds</Typography>
                </Container>
            </Stack>
        </Container>
    )
}

export default Counter;