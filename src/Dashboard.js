// in src/Dashboard.js
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Area from "./charts/area";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TodayIcon from '@material-ui/icons/Today';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Pie from "./charts/pie";
import DashboardCustomerList from "./dashboard/customerList";

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
            <Grid item lg={6} container spacing={3}>
                <Grid item xs={4}>
                    <Card className={classes.paper}>
                    <span style={{display: "block"}}>
                    <AssignmentIndIcon style={{fontSize: 50}}/>
                    </span>
                        <span style={{display: "block"}}>W sumie klientów</span><br/>
                        <span style={{fontSize: 50, display: "block"}}>51</span>
                    </Card>
                </Grid>
                <Grid item xs={2} sm={4}>
                    <Card className={classes.paper}>
                    <span style={{display: "block"}}>
                    <ReceiptIcon style={{fontSize: 50}}/>
                    </span>
                        <span style={{display: "block"}}>Wystawionych faktur</span><br/>
                        <span style={{fontSize: 50, display: "block"}}>51</span>
                    </Card>
                </Grid>
                <Grid item xs={2} sm={4}>
                    <Card className={classes.paper}>
                    <span style={{display: "block"}}>
                    <ClearAllIcon style={{fontSize: 50}}/>
                    </span>
                        <span style={{display: "block"}}>Pozycji na fakturach</span><br/>
                        <span style={{fontSize: 50, display: "block"}}>51</span>
                    </Card>
                </Grid>
                <Grid item lg={12}>
                    <Area style={{width: "100%"}} title={"Przychód"}/>
                </Grid>
                <Grid item lg={12}>
                    <DashboardCustomerList/>
                </Grid>
            </Grid>
            <Grid item lg={6} container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Card><Pie title={"tytuł wykresu"}/></Card>
                </Grid>
                <Grid item xs={6}>
                    <Card style={{maxHeight: "145px"}} className={classes.paper}>
                    <span style={{display: "block"}}>
                    <FavoriteBorderIcon style={{fontSize: 50}}/>
                    </span>
                        <span style={{display: "block"}}>Najlepszy klient</span><br/>
                        <span style={{fontSize: 30, display: "block"}}>Paweł Jakiśtam fuh sp zoo</span>
                    </Card>
                </Grid>
                <Grid item xs={2} sm={6}>
                    <Card className={classes.paper}>
                    <span style={{display: "block"}}>
                    <TodayIcon style={{fontSize: 50}}/>
                    </span>
                        <span style={{display: "block"}}>Ostatnia faktura</span><br/>
                        <span style={{fontSize: 40, display: "block"}}>22-04-2020</span>
                    </Card>
                </Grid>
                <Grid item lg={12}>
                    <DashboardCustomerList/>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
}