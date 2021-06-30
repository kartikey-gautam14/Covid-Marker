import React from "react";
import { Card, CardContent,Typography } from "@material-ui/core";
import './Box.css';

function Box({title,cases,total}){
    return (
        
        <Card>
            <CardContent>
                <Typography color="textPrimary">
                    {title};
                </Typography>
                <Typography color="textPrimary">
                    {cases};
                </Typography>
                <Typography color="textPrimary">
                    {total} Total;
                </Typography>
            </CardContent>
        </Card>

    );
}

export default Box;