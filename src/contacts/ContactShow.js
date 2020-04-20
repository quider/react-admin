import {Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

const styles = {
    width : "50%"
}

export const ContactShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField disabled label="Id" source="id"/>
            <TextField style={styles} label="Nazwa" fullWidth="true" source="name"/>
            <TextField style={styles} label="Ulica" source="mainAddressStreetName"/>
            <TextField style={styles} label="Miasto" source="mainAddressCity"/>
            <TextField style={styles} label="Kod pocztowy" source="mainAddressZipCode"/>
            <TextField style={styles} label="Kraj" source="mainAddressCountry"/>
            <TextField style={styles} label="Nr konta" source="bank"/>
            <TextField style={styles} label="Nr telefonu" source="phone"/>
            <TextField style={styles} label="E-mail" source="email" type="email"/>
            <TextField style={styles} label="NIP" source="nip" />
            <TextField style={styles} label="PESEL" source="pesel"/>
            <TextField style={styles} label="REGON" source="regon"/>
        </SimpleShowLayout>
    </Show>
);












