import React, {useEffect, useState} from 'react';
import {ThreeDEngine} from "./engine/ThreeDEngine";
import {Button, Grid, makeStyles, Paper, useMediaQuery} from "@material-ui/core";
import theme from "./theme";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {ProjectCard} from "./components/ProjectCard";
import Typography from "@material-ui/core/Typography";
import {GridGroupByTwo} from "./components/GridGroupByTwo";
import {Avatar} from "./components/Avatar";

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
        fontSize: "1rem",
        textAlign: "center",
        minHeight: "100vh",
        padding: "8rem 4rem 6rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        [theme.breakpoints.up('md')]: {
            fontSize: "2rem",
        }
    },
    avatar: {
        [theme.breakpoints.down('md')]: {
            width: "100%"
        },
    },
    hNoMargin: {
        margin: 0,
    },
    sectionTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0rem 2rem 0rem",
    },
    block1: {
        margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: "100vw",
        },
        [theme.breakpoints.up('md')]: {
            margin: "4rem 4rem 0rem 4rem",
        }
    },
    block2: {
        margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
        [theme.breakpoints.up('md')]: {
            margin: "4rem 4rem 0rem 4rem",
        }
    },
});

export const App: React.FC = () => {
    const classes = useStyles();
    const wideScreen = useMediaQuery(theme.breakpoints.up('md'));

    const [_, setEngine] = useState<ThreeDEngine | null>(null);
    const [c, setC] = useState<HTMLCanvasElement | null>(null);
    const [d, setD] = useState<HTMLDivElement | null>(null);
    const [one, setOne] = useState<HTMLDivElement | null>(null);

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

    const onOne = (e: HTMLDivElement) => {
        if (!e) {
            return;
        }
        setOne(e);
    }

    useEffect(() => {
        if (c && d) {
            setEngine(new ThreeDEngine(c, d, false));
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
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => {
                            if (!one) {
                                return;
                            }
                            one.scrollIntoView({behavior: "smooth"});
                        }}
                    >
                        <ArrowDownwardIcon/>
                    </Button>
                </Grid>
                <Grid item ref={onOne}>
                    <Paper className={classes.block1}>
                        <Grid container direction={wideScreen ? "row" : "column"} wrap="nowrap" spacing={1}>
                            <Grid item>
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed
                                    hendrerit justo.
                                    In ac orci nisl. Nulla pulvinar, est in scelerisque condimentum, felis dolor
                                    tincidunt
                                    lacus, eu blandit purus mauris quis lorem. Morbi condimentum dictum leo, id dictum
                                    ante
                                    facilisis eu. Cras facilisis mauris mi, et varius mi tempor ut. Class aptent taciti
                                    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
                                    quam
                                    nisi, viverra sit amet mauris sit amet, venenatis facilisis ante. Suspendisse ac
                                    pretium
                                    tellus. Nullam hendrerit scelerisque placerat. Maecenas quis venenatis metus. Cras
                                    pretium diam et erat imperdiet lobortis. Vestibulum id orci risus. Nam eget placerat
                                    purus. Curabitur vestibulum nibh et orci gravida, ornare ornare orci elementum.
                                    Maecenas
                                    suscipit libero et augue dignissim feugiat.
                                </Typography>
                                <br/>
                                <Typography>
                                    Nunc at quam semper, tincidunt est quis, scelerisque sapien. Praesent et mi non orci
                                    iaculis vehicula vitae sit amet ex. Nam imperdiet quis massa et dapibus. Aenean
                                    elementum urna et convallis dictum. Etiam eu pulvinar mi, fermentum pharetra justo.
                                    Maecenas facilisis aliquet nisl quis aliquam. Fusce congue feugiat nunc vel
                                    pulvinar. In
                                    aliquam suscipit velit, eget fermentum tellus rutrum eget. Aliquam vitae ipsum nisi.
                                </Typography>
                                <br/>
                                <Typography>
                                    Vivamus sed tellus bibendum, ultrices dolor id, vehicula felis. Etiam mollis aliquam
                                    lacus, ut euismod felis hendrerit quis. Nullam feugiat dapibus eros faucibus
                                    finibus.
                                    Praesent nec venenatis magna. Mauris nunc nulla, malesuada at vehicula nec, varius
                                    ut
                                    metus. Vestibulum mollis a dui mollis porttitor. Pellentesque elementum enim posuere
                                    odio lacinia, sed maximus ipsum efficitur. Etiam feugiat elit sed nisi pellentesque
                                    efficitur. Nunc lacinia elit facilisis dui posuere, quis porta nisl sagittis. Morbi
                                    sit
                                    amet nulla et nibh tempus tincidunt semper eget ante. Curabitur scelerisque urna
                                    vitae
                                    dapibus tempor. Proin mollis aliquet mi.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar src="/avatar.webp"/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.block2}>
                        <GridGroupByTwo
                            elements={[
                                <ProjectCard
                                    imageSrc="/images/newspilot.webp"
                                    title="News Pilot"
                                    contents={"Sharing trusted public service online news via public service media (PSM) " +
                                    "platforms among EBU Members would create unique value for the Members and audiences " +
                                    "across Europe. Last spring, the EBU and 14 of its Member broadcasters started to" +
                                    " pilot a collaborative way of sharing digital news content amongst themselves."}
                                    end={false}
                                    left={true}
                                />,
                                <ProjectCard
                                    imageSrc="/images/tool.webp"
                                    title="Eurovox Project - Tool"
                                    contents={"A user-facing tool for navigating, transcribing and translating multilingual " +
                                    "content. With applications for both file-based (on-demand) and streaming use cases," +
                                    " a one-time integration of the Tool provides access to a growing array of language tool " +
                                    "vendors."}
                                    end={false}
                                    left={false}
                                />,
                                <ProjectCard
                                    imageSrc="/images/EuroVOX.webp"
                                    title="Eurovox Project - API"
                                    contents={"Sharing trusted public service online news via public service media (PSM) platforms among EBU Members would create unique value for the Members and audiences across Europe. Last spring, the EBU and 14 of its Member broadcasters started to pilot a collaborative way of sharing digital news content amongst themselves."}
                                    end={true}
                                    left={true}
                                />,
                                <ProjectCard
                                    imageSrc="/images/EuroVOX.webp"
                                    title="Eurovox Project - API"
                                    contents={"Sharing trusted public service online news via public service media (PSM) platforms among EBU Members would create unique value for the Members and audiences across Europe. Last spring, the EBU and 14 of its Member broadcasters started to pilot a collaborative way of sharing digital news content amongst themselves."}
                                    end={true}
                                    left={true}
                                />
                            ]}/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );

}

export default App;
