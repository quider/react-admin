// in src/App.js
import React from 'react';
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import rest from "ra-data-simple-rest";
import Dashboard from "./Dashboard";
import {PostCreate, PostEdit} from "./posts";
import authProvider from "./authProvider";
import {CurrencyList} from "./currencies";
import {InvoiceList} from "./invoices/invoiceList";
import {ContactList} from "./contacts/ContactList";

const httpClient = (url, options = {}) => {
        if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
        }
        const token = localStorage.getItem('token');
        options.headers.set('Authorization', `Bearer ${token}`);
        return fetchUtils.fetchJson(url, options);
};
const dataProvider = rest('http://localhost:8443', httpClient);
const App = () =>
    <Admin dashboard={Dashboard} title="Wystaw fakturę" authProvider={authProvider} dataProvider={dataProvider} >
        <Resource name="api/invoice" create={PostCreate} edit={PostEdit} options={{ label: 'Faktury' }}   list={InvoiceList} />
        <Resource name="api/contact" options={{ label: 'Kontahenci', title: 'Konrahenci' }}  list={ContactList} />
        {/*<Resource name="users" options={{ label: 'Użytkownicy' }}  list={ListGuesser} />*/}
        {/*<Resource name="company" options={{ label: 'Moja działalność' }}  list={ListGuesser} />*/}
        <Resource name="v1/currency" options={{ label: 'Waluty' }} list={CurrencyList} />
    </Admin>;

export default App;