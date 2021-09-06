import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: "solid 2px #eeeeee",
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
    left: boolean;
    end: boolean;
}

export const ProjectCard: React.FC<Props> = ({
                                                 imageSrc,
                                                 title,
                                                 contents,
                                                 left,
                                                 end
                                             }) => {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{
            borderBottom: end ? "solid 2px #eeeeee" : undefined,
            borderRight: left ? "solid 2px #eeeeee" : undefined
        }}>
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
            <Button size="small" color="primary">
                Learn More
            </Button>
        </div>
    );
}