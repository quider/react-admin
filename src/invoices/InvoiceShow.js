import {useShowController} from "react-admin";
import React from "react";


import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {TopToolbar} from "./TopToolbar";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import {linkToRecord} from 'ra-core';
import ContentCreate from '@material-ui/icons/Create';

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

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

const MyEditButton = ({
                          basePath = '',
                          label = 'ra.action.edit',
                          record,
                          icon = defaultIcon,
                          ...rest
                      }) => (
    <Button
        component={Link}
        to={linkToRecord(basePath, record && record.id)}
        label={label}
        onClick={stopPropagation}
        {...rest}
    >
        {icon}
    </Button>
);

const defaultIcon = <ContentCreate/>;

const sanitizeRestProps = ({
                               basePath,
                               className,
                               record,
                               hasEdit,
                               hasList,
                               resource,
                               ...rest
                           }) => rest;

const ShowActions = ({basePath, className, record, hasEdit, ...rest}) => (
    <TopToolbar className={className} {...sanitizeRestProps(rest)}>
        <MyEditButton basePath={basePath} record={record} label={"Edytuj"}/>
    </TopToolbar>
);

const MyShow = props => {
    const classes = useStyles();
    const {
        basePath, // deduced from the location, useful for action buttons
        defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
        loaded, // boolean that is false until the record is available
        loading, // boolean that is true on mount, and false once the record was fetched
        record, // record fetched via dataProvider.getOne() based on the id from the location
        resource, // the resource name, deduced from the location. e.g. 'posts'
        version, // integer used by the refresh feature
    } = useShowController(props);
    return (
        <div className={classes.root}>
            {loaded && <ShowActions basePath={basePath} record={record} {...props}/>}

            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={6} md={2} lg={2}>
                        {loaded && <TextField label={"Data utworzenia"} value={record.createDate}/>}
                    </Grid>
                    <Grid item xs={6} md={2} lg={2}>
                        {loaded && <TextField label={"Data sprzedaży"} value={record.sellDate}/>}
                    </Grid>
                    <Grid item xs={6} md={2} lg={2}>
                        {loaded && <TextField label={"Termin płatności"} value={record.paymentTerm}/>}
                    </Grid>
                    <Grid item xs={0} md={0} lg={4}/>
                    <Grid item xs={6} md={2} lg={2}>
                        {loaded && <TextField label={"Miasto utworzenia"} value={record.cityName}/>}
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={2} lg={2}>
                        {loaded && <TextField label={"Waluta"} value={record.currency}/>}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export const InvoiceShow = (props) => {
    return (
        <MyShow {...props} />

    )
        ;
}











