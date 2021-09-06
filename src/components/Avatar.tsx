import React from "react";
import {makeStyles} from "@material-ui/core";
import theme from "../theme";

interface Props {
    src: string;
}

const useStyles = makeStyles({
    avatar: {
        [theme.breakpoints.down('md')]: {
            width: "100%"
        },
    },
});

export const Avatar: React.FC<Props> = ({src}) => {
    const classes = useStyles();
  return (
      <img src={src} alt="That's me!" className={classes.avatar}/>
  );
}