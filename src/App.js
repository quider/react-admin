// in src/App.js
import React from 'react';
import {Admin, fetchUtils, Resource} from 'react-admin';
import rest from "ra-data-simple-rest";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import {CurrencyList} from "./currencies";
import {InvoiceList} from "./invoices/invoiceList";
import {ContactList} from "./contacts/ContactList";
import {ContactCreate} from "./contacts/ContactCreate";
import polishMessages from 'ra-language-polish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {ContactEdit} from "./contacts/ContactEdit";
import {ContactShow} from "./contacts/ContactShow";
import {msq} from "./i18n/translations"
import {InvoiceCreate} from "./invoices/InvoiceCreate";
import {MyLayout} from "./menu/leftmenu";
import {InvoiceShow} from "./invoices/InvoiceShow";
import {InvoiceEdit} from "./invoices/InvoiceEdit";
import ContactsIcon from '@material-ui/icons/Contacts';
import EuroIcon from '@material-ui/icons/Euro';


const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
export const dataProvider = rest(process.env.REACT_APP_URL, httpClient);
const messages = {...polishMessages, ...msq};
const i18nProvider = polyglotI18nProvider(() => messages, 'pl');


const App = () =>
    <Admin layout={MyLayout} i18nProvider={i18nProvider} dashboard={Dashboard} title="Wystaw fakturę"
           authProvider={authProvider} dataProvider={dataProvider}>
        {permissions => [
            <Resource name="api/invoice" create={InvoiceCreate} show={InvoiceShow} edit={InvoiceEdit}
                      options={{label: 'Faktury'}}
                      list={InvoiceList}/>,
            <Resource name="api/contact" edit={ContactEdit} show={ContactShow} create={ContactCreate}
                      icon={ContactsIcon}
                      options={{label: 'Kontahenci'}} list={ContactList}/>,
            <Resource name="payment-method"/>,
            // <Resource name="api/contact" show={ShowGuesser} options={{label: 'Kontahenci edit only'}}/>,
            permissions.includes('ROLE_ADMIN') ?
                <Resource name="v1/currency" options={{label: 'Waluty'}} list={CurrencyList} icon={EuroIcon}/> : null,
        ]}
    </Admin>;


export default App;