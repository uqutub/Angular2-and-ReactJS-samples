import * as React from "react";

interface IMember extends React.Props<any> {
    _id?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string;
    contact: string;
    address: string;
    age: number;
    NIC: string;
    location: { lat: number, lng: number, title?: string };
    dated: number;
}

interface IRMember extends React.Props<any> {
    _id?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string;
    contact: string;
    address: string;
    age: number;
    NIC: string;
    location: { lat: number, lng: number, title?: string };
    dated: number;
}

export {
    IMember,
    IRMember
}