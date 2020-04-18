// in src/Dashboard.js
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid() {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card className={classes.paper}>xs=12</Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card className={classes.paper}>xs=12 sm=6</Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card className={classes.paper}>xs=12 sm=6</Card>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Card className={classes.paper}>xs=6 sm=3</Card>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Card className={classes.paper}>xs=6 sm=3</Card>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Card className={classes.paper}>xs=6 sm=3</Card>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Card className={classes.paper}>xs=6 sm=3</Card>
            </Grid>
        </Grid>
    );
}