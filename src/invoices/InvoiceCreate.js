import {
    Create,
    DateInput,
    FormTab,
    ReferenceInput,
    SelectInput,
    showNotification,
    TabbedForm,
    TextInput
} from "react-admin";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";

export const InvoiceCreate = (props) => {
    const [next, setNext] = useState('');
    useEffect(() => {
        fetch(`http://localhost:8443/api/invoice/next`,
            {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                return response.text()
            }).then(value => setNext(value))
            .catch((e) => {
                showNotification('Error: comment not approved', 'warning')
            });
    }, [])
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="Parametry faktury">
                    <Grid style={{width: "100%"}} container spacing={4}>
                        <Grid container item xs={12} md={6} lg={3} spacing={1}>
                            <DateInput fullWidth={true} label="Data wystawienia" source="createDate"/>
                        </Grid>
                        <Grid container item xs={12} md={6} lg={3} spacing={1}>
                            <DateInput fullWidth={true} label="Data sprzedaży" source="sellDate"/>
                        </Grid>
                        <Grid container item xs={12} md={6} lg={3} spacing={1}>
                            <DateInput fullWidth={true} label="Termin płatności" source="paymentTerm"/>
                        </Grid>
                        <Grid container item xs={12} md={6} lg={3} spacing={1}>
                            <TextInput fullWidth={true} label="Miasto" source="cityName"/>
                        </Grid>

                        <Grid container item xs={6} md={6} lg={3} spacing={1}>
                            <ReferenceInput label="Waluta" source="name" reference="v1/currency">
                                <SelectInput fullWidth={true} defaultValue={"EUR"} optionText="name" optionValue="name"
                                             source="currency"/>
                            </ReferenceInput>
                        </Grid>
                        <Grid container item xs={6} md={6} lg={6} spacing={1}>

                            <TextInput fullWidth={true} value={next} source="number"/>
                        </Grid>
                        <Grid container item xs={6} md={6} lg={3} spacing={1}>
                                <SelectInput label="Sposób płatnosci" choices={[{name:"Przelew", value: "TRANSFER"}]} fullWidth={true} optionText="name" optionValue="name" source="paymentType"/>
                        </Grid>


                    </Grid>
                </FormTab>
                <FormTab label="kontrahent">
                    <Grid style={{width: "100%"}} container spacing={4}>
                        <Grid container item xs={12} md={6} lg={6} spacing={1}>
                            <TextInput fullWidth={true} source="seller"/>
                        </Grid>
                        <Grid container item xs={12} md={6} lg={6} spacing={1}>
                            <TextInput fullWidth={true} source="buyer"/>
                        </Grid>
                    </Grid>
                </FormTab>
                <FormTab label="pozycje faktury">
                    <TextInput source="invoiceItems"/>
                </FormTab>
            </TabbedForm>
        </Create>
    );
}











