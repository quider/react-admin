import React from 'react';
import {Datagrid, FunctionField, List, ReferenceField, TextField, useTranslate} from 'react-admin';


export const InvoiceList = (props) => {
const translate = useTranslate();
    return (
        <List title="Faktury" {...props}>
            <Datagrid rowClick={"show"}>
                <TextField label="Data utworzenia" source="createDate"/>
                <TextField label="Data sprzedaży" source="sellDate"/>
                <TextField label="Waluta" source="currency"/>
                <TextField label="Numer" source="number"/>
                <FunctionField label="Płatność" render={record => `${translate(record.paymentMethod)}`}/>
                <TextField label="Termin" source="paymentTerm"/>
                <ReferenceField label="Kupujący" source="buyerId" reference="api/contact">
                    <TextField source="name"/>
                </ReferenceField>
                <FunctionField label="Rodzaj faktury" render={record => `${translate(record.invoiceType)}`}/>
            </Datagrid>
        </List>
    );
}