import React from "react";
import {Grid, GridSize, useMediaQuery, useTheme} from "@material-ui/core";

interface Props {
    elements: JSX.Element[]
}

export const GridGroupByTwo: React.FC<Props> = ({elements}) => {
    const theme = useTheme();
    const wideScreen = useMediaQuery(theme.breakpoints.up('md'));
    const sizeofElems = wideScreen ? 2 : 1;

    const groupedElements = elements.reduce((acc, e, index, arr) => {
        if (index % sizeofElems === 0) {
            acc.push(arr.slice(index, index + sizeofElems));
        }
        return acc;
    }, [] as Array<Array<JSX.Element>>)

    return (
        <Grid container>
            {groupedElements.map((group) => {
                const gridSize = Math.floor(12 / sizeofElems) as GridSize;
                return (
                    <Grid item>
                        <Grid container alignItems="stretch" justifyContent="center" wrap="nowrap" spacing={wideScreen ? 0 : 1}>
                            {group.map((element) => <Grid item xs={gridSize}>
                                {element}
                            </Grid>)}
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
}