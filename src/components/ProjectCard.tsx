import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Card} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            height: 500,
        },
    },
    media: {
        height: 300,
    },
}));

interface Props {
    imageSrc: string;
    title: string;
    contents: string;
    url: string;
}

export const ProjectCard: React.FC<Props> = ({
                                                 imageSrc,
                                                 title,
                                                 contents,
                                                 url,
                                             }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={imageSrc}
                title={title}
            />
            <Typography gutterBottom variant="h5" component="h2">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {contents}
            </Typography>
            <a href={url} target="_blank" rel="noreferrer">
                <Typography variant="button">Learn More</Typography>
            </a>
        </Card>
    );
}