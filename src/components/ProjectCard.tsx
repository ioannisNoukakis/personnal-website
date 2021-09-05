import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        height: 500,
        // display: "flex"
    },
    media: {
        height: 300,
    },
});

interface Props {
    imageSrc: string;
    title: string;
    contents: string;
}

export const ProjectCard: React.FC<Props> = ({
                                                 imageSrc,
                                                 title,
                                                 contents,
                                             }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={imageSrc}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {contents}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}