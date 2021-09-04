import React, {useEffect, useState} from 'react';
import {ThreeDEngine} from "./engine/3dEngine";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import theme from "./theme";

const useStyles = makeStyles({
    canvas: {
        position: "fixed",
        top: 0,
        left: 0,
    },
    main: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        overflow: "auto",
    },
    title: {
        color: "#ffffff",
        fontSize: "2rem",
        transition: "opacity 1s ease, transform 1s ease",
        textAlign: "center",
        minHeight: "100vh",
        padding: "8rem 4rem 6rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    hNoMargin: {
        margin: 0,
    },
    block1: {
        margin: "8rem 4rem 6rem 4rem",
        padding: theme.spacing(1)
    }
});

export const App: React.FC = () => {
    const classes = useStyles();
    const [_, setEngine] = useState<ThreeDEngine | null>(null);
    const [c, setC] = useState<HTMLCanvasElement | null>(null);
    const [d, setD] = useState<HTMLDivElement | null>(null);

    const onCanvas = (e: HTMLCanvasElement) => {
        if (!e) {
            return;
        }
        setC(e);
    }

    const onDiv = (e: HTMLDivElement) => {
        if (!e) {
            return;
        }
        setD(e);
    }

    useEffect(() => {
        if (c && d) {
            setEngine(new ThreeDEngine(c, d));
        }
    }, [c, d])

    return (
        <>
            <canvas className={classes.canvas} ref={onCanvas}/>
            <Grid container justifyContent="center" className={classes.main} ref={onDiv}>
                <Grid item className={classes.title}>
                    <h1 className={classes.hNoMargin}>
                        Ioannis Noukakis
                    </h1>
                    <h2 className={classes.hNoMargin}>
                        Fullstack Software Engineer
                    </h2>
                </Grid>
                <Grid>
                    <Paper className={classes.block1}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Paper>
                </Grid>
            </Grid>
        </>
    );

}

export default App;
