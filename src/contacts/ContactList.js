import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const ContactList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField sortable={false} label="Nazwa" source="name" />
            <TextField sortable={false} label="Ulica" source="mainAddressStreetName" />
            <TextField sortable={false} label="Miasto" source="mainAddressCity" />
            <TextField sortable={false} label="Telefon" source="phone" />
            <TextField sortable={false} label="E-mail" source="email" />
            <TextField sortable={false} label="NIP" source="nip" />
            <TextField sortable={false} label="PESEL" source="pesel" />
            <TextField sortable={false} label="REGON" source="regon" />
        </Datagrid>
    </List>
);