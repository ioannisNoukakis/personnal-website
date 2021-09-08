import {Grid, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import theme from "../theme";


const useStyles = makeStyles({
    blockTitle: {
        maxWidth: "1000px",
        margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
        [theme.breakpoints.up('md')]: {
            margin: "4rem 4rem 0rem 4rem",
        }
    },
});

interface Props {
    text: string;
    onRef?: (e: HTMLDivElement) => void;
}

export const Section: React.FC<Props> = ({
                                             text,
                                             onRef
                                         }) => {
    const classes = useStyles();
    return (
        <Grid item ref={onRef}>
            <Paper className={classes.blockTitle}>
                <Grid container justifyContent="center">
                    <Typography variant="h4">{text}</Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}