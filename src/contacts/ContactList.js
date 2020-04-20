import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const styles = {
    width : "50%"
}

export const ContactList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField sortable={false} style={styles} label="Id" source="id" />
            <TextField sortable={false} style={styles} label="Nazwa" source="name" />
            <TextField sortable={false} style={styles} label="Ulica" source="mainAddressStreetName" />
            <TextField sortable={false} style={styles} label="Miasto" source="mainAddressCity" />
            <TextField sortable={false} style={styles} label="Telefon" source="phone" />
            <TextField sortable={false} style={styles} label="E-mail" source="email" />
            <TextField sortable={false} style={styles} label="NIP" source="nip" />
            <TextField sortable={false} style={styles} label="PESEL" source="pesel" />
            <TextField sortable={false} style={styles} label="REGON" source="regon" />
        </Datagrid>
    </List>
);