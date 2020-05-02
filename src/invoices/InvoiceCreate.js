import {
    ArrayInput,
    AutocompleteInput,
    Create,
    DateInput,
    FormDataConsumer,
    NumberInput,
    ReferenceInput,
    SaveButton,
    SelectInput,
    showNotification,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    Toolbar
} from "react-admin";
import React, {useCallback, useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useForm} from "react-final-form";

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {display: 'inline-flex', marginRight: '1rem', width: "100%"},
    value: {display: 'inline-flex', marginRight: '1rem', width: "15em"},
    currency: {display: 'inline-flex', marginRight: '1rem', width: "10em"},
});
const SaveWithNoteButton = ({handleSubmitWithRedirect, ...props}) => {
    const {basePath, redirect} = props;

    const form = useForm();

    const handleClick = useCallback(() => {
        // change the average_note field value
        for (let item in form.getState().invoiceItems) {
            item.replace(",", ".")
        }
        handleSubmitWithRedirect(redirect);
    }, [form]);

    // override handleSubmitWithRedirect with custom logic
    return <SaveButton {...props} handleSubmitWithRedirect={handleClick}/>;
};

const PostCreateToolbar = props => (
    <Toolbar {...props} >
        <SaveWithNoteButton
            label="Wystaw fakturę"
            redirect="show"
            submitOnEnter={true}
        />

    </Toolbar>
);
export const InvoiceCreate = (props) => {
    const classes = useStyles();
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
    }, []);
    const [next, setNext] = useState('');
    return (
        <Create {...props} >
            <SimpleForm toolbar={<PostCreateToolbar/>}>
                        <DateInput label="Data wystawienia" source="createDate"/>
                        <DateInput label="Data sprzedaży" source="sellDate"/>
                        <DateInput label="Termin płatności" source="paymentTerm"/>
                        <TextInput style={{width: "15em"}} label="Miasto" source="cityName"/>
                        <ReferenceInput label="Waluta" source="currency" reference="v1/currency">
                            <SelectInput defaultValue={"EUR"} optionText="name" optionValue="name"
                                         source="currency"/>
                        </ReferenceInput>
                <TextInput style={{width: "10em"}} defaultValue={next} source="number"/>
                <SelectInput style={{width: "15em"}} label="Sposób płatnosci"
                             choices={[{name: "Przelew", value: "TRANSFER"}]} optionText="name"
                             optionValue="value" source="paymentType"/>

                <ReferenceInput style={{width: "100px"}} label="Kupujący"
                                source="buyerId"
                                reference="api/contact">
                    <AutocompleteInput optionText="name" fullWidth={true}
                                       onSelect={(selected, helpers) => {
                                           console.log(selected);
                                       }}/>
                </ReferenceInput>
                <Typography fontSize={20}>Pozycje faktury:</Typography>
                <ArrayInput source="invoiceItems" label="Pozycje">
                    <SimpleFormIterator onChange={(e) => {
                        console.log(e)
                    }}>
                        <TextInput formClassName={classes.text} fullWidth={true} source="name" label="Nazwa pozycji"/>
                        <NumberInput formClassName={classes.value} source="count" label="Ilość"/>
                        <TextInput formClassName={classes.value} source="unit" label="Jednostka"/>
                        <NumberInput formClassName={classes.value} source="net" label="Netto" onChange={(e) => {
                            console.log("dupa")
                        }}/>
                        <FormDataConsumer formClassName={classes.value}>
                            {({
                                  formData, // The whole form data
                                  scopedFormData, // The data for this item of the ArrayInput
                                  getSource, // A function to get the valid source inside an ArrayInput
                                  ...rest
                              }) => {
                                if (scopedFormData !== undefined) {
                                    let countGross = (scopedFormData.net !== undefined ? scopedFormData.net : 0) * (scopedFormData.count !== undefined ? scopedFormData.count : 0)
                                    console.log(countGross)
                                    return <TextInput formClassName={classes.value} label="Brutto" readonly
                                                      value={countGross} source={getSource('gross')}/>
                                } else {
                                    return <TextInput formClassName={classes.value} label="Brutto" readonly
                                                      source={getSource("gros")}/>
                                }
                            }}
                        </FormDataConsumer>
                    </SimpleFormIterator>
                </ArrayInput>
                <Card style={{width: "100%"}}>
                    <CardContent>
                        <Typography gutterBottom>
                            Sprzedawca zwolniony podmiotowo z podatku od towarów i usług [dostawa towarów
                            lub świadczenie usług zwolnione na podstawie art. 113 ust. 1 (albo ust. 9)
                            ustawy z dnia 11 marca 2004 r. o podatku od towarów i usług (Dz. U. z 2016r
                            poz. 710 z późn. Zm.)]
                        </Typography>
                    </CardContent>
                </Card>
            </SimpleForm>
        </Create>
    );
}











