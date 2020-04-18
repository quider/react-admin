import React from 'react';
import { List, Datagrid, TextField, CreateButton } from 'react-admin';

export const InvoiceList = (props) => (
    <List title="Faktury" {...props} actions={<CreateButton label="DODAJ nową fakturę"/>}>
        <Datagrid>
            <TextField source="createDate" />
            <TextField source="sellDate" />
            <TextField source="paymentDate" />
            <TextField source="currency" />
            <TextField source="number" />
            <TextField source="paymentMethod" />
            <TextField source="invoiceStatusName" />
            <TextField source="cityName" />
            <TextField source="paymentTerm" />
            {/*<TextField source="seller" />*/}
            {/*<TextField source="buyer" />*/}
            <TextField source="invoiceType" />
        </Datagrid>
    </List>
);