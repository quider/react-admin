import {useMediaQuery} from "@material-ui/core";
import {getResources, Layout, MenuItemLink, showNotification} from "react-admin";
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import DefaultIcon from '@material-ui/icons/ViewList';
import LabelIcon from '@material-ui/icons/Label';

export const Menu = ({onMenuClick, logout}) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    const [company, setCompany] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8443/api/contact/company/show`,
            {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                return response.json()
            }).then(value => setCompany(value))
            .catch((e) => {
                showNotification('Error: comment not approved', 'warning')
            });
    }, [])

    return (
        <div>
            {resources.map(resource => (
                resource.hasList && <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon/> : <DefaultIcon/>
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to={`/api/contact/${company.id}/show`}
                primaryText="Moja działalność"
                leftIcon={<LabelIcon/>}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {isXSmall && logout}
        </div>
    );
};

export const MyLayout = (props) => <Layout {...props} menu={Menu}/>;