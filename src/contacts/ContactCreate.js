import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

const styles = {
    width: "50%"
}
const redirect = (basePath, id, data) => `/api/contact`;
export const ContactCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={"list"}>
            <TextInput style={styles} label="Nazwa" fullWidth="true" source="name"/>
            <TextInput style={styles} label="Ulica" source="mainAddressStreetName"/>
            <TextInput style={styles} label="Miasto" source="mainAddressCity"/>
            <TextInput style={styles} label="Kod pocztowy" source="mainAddressZipCode"/>
            <TextInput style={styles} label="Kraj" source="mainAddressCountry"/>
            <TextInput style={styles} label="Nr konta" source="bank"/>
            <TextInput style={styles} label="Nr telefonu" source="phone"/>
            <TextInput style={styles} label="E-mail" source="email" type="email"/>
            <TextInput style={styles} label="NIP" source="nip"/>
            <TextInput style={styles} label="PESEL" source="pesel"/>
            <TextInput style={styles} label="REGON" source="regon"/>
        </SimpleForm>
    </Create>
);












