import React, {useEffect, useState} from 'react';
import {ThreeDEngine} from "./engine/ThreeDEngine";
import {Button, Grid, makeStyles, Paper, useMediaQuery} from "@material-ui/core";
import theme from "./theme";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {ProjectCard} from "./components/ProjectCard";
import Typography from "@material-ui/core/Typography";
import {GridGroupByTwo} from "./components/GridGroupByTwo";
import {Avatar} from "./components/Avatar";
import moment from 'moment';
import {Section} from "./components/Section";

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
    },
    mainTitle: {
        color: "#ffffff",
        fontSize: "1rem",
        textAlign: "center",
        height: "100vh",
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
    block1: {
        maxWidth: "1000px",
        margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: "100vw",
        },
        [theme.breakpoints.up('md')]: {
            margin: "1rem 4rem 0rem 4rem",
        }
    },
    block2: {
        maxWidth: "1000px",
        margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
        [theme.breakpoints.up('md')]: {
            margin: "1rem 4rem 0rem 4rem",
        }
    },
    end: {
        marginBottom: "2rem",
    }
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
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignContent="center"
                className={classes.main}
                ref={onDiv}
            >
                <Grid item className={classes.mainTitle}>
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
                <Section text="About me" onRef={onOne}/>
                <Grid item>
                    <Paper className={classes.block1}>
                        <Grid container direction={wideScreen ? "row" : "column"} wrap="nowrap" spacing={1}>
                            <Grid item>
                                <Typography>
                                    I've always been drawn by technology, always will. I like to design apps, systems
                                    (distributed even!) and infrastructures!
                                </Typography>
                                <br/>
                                <Typography>
                                    I've started programming {moment("20130701", "YYYYMMDD").fromNow()}, and throughout
                                    this journey, I discovered
                                    more and more about it every day. To me, programming is more than a job or a hobby.
                                    It's a philosophy: Technology must be assimilated, refined and transformed into
                                    brutally efficient systems.
                                </Typography>
                                <br/>
                                <Typography>
                                    My primary language is TypeScript, and I'm comfortable in Java, Scala, and Python3.
                                    I occasionally do some C++ in my lost hours.
                                </Typography>
                                <br/>
                                <Typography>
                                    Aside from the technical aspects, I love sailing, Dungeons and Dragons, heroic
                                    fantasy and
                                    video games among other things.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar src="/avatar.webp"/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Section text="Experience"/>
                <Grid item className={classes.block2}>
                    <GridGroupByTwo
                        elements={[
                            <ProjectCard
                                imageSrc="/images/newspilot.webp"
                                title="News Pilot"
                                contents={"Sharing trusted public service online news via public service media (PSM) " +
                                "platforms among EBU Members would create unique value for the Members and audiences " +
                                "across Europe. Last spring, the EBU and 14 of its Member broadcasters started to" +
                                " pilot a collaborative way of sharing digital news content amongst themselves."}
                                url="https://www.ebu.ch/events/2021/01/european-digital-news-recommendation-service-demo"
                            />,
                            <ProjectCard
                                imageSrc="/images/tool.webp"
                                title="Eurovox Project - Tool / API"
                                contents={"A user-facing tool for navigating, transcribing and translating multilingual " +
                                "content. With applications for both file-based (on-demand) and streaming use cases," +
                                " a one-time integration of the Tool provides access to a growing array of language tool " +
                                "vendors."}
                                url="https://tech.ebu.ch/eurovox"
                            />,
                            <ProjectCard
                                imageSrc="/images/EuroVOX.webp"
                                title="Eurovox Project - API"
                                contents={"EuroVOX is a collaboration between the EBU and its members, creating an " +
                                "open toolbox for transcription and translation technologies. Being able to dynamically " +
                                "access different vendors, platforms and engines, gives EBU members the ability" +
                                " to select the right tool for the right task while minimizing complexity and development costs."}
                                url="https://docs.eurovox.io/"
                            />,
                            <ProjectCard
                                imageSrc="/images/welitics.webp"
                                title="Welitics"
                                contents={"Welitics, a startup project that aims to extend political participation " +
                                "via a social network dedicated to this topic."}
                                url="https://welitics.com/"
                            />
                        ]}/>
                </Grid>
                <Grid item>
                    <Paper className={`${classes.block2} ${classes.end}`}>
                        <Grid container justifyContent="center">
                            <Typography variant="h4"><a href="/public/cv-en.pdf" download>Download my CV</a></Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );

}

export default App;
