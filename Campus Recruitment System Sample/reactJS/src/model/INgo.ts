import * as React from "react";

import { IMember } from './IMember';
import { ILocation } from './ILocation';

interface INgo {
    _id?: string;
    name: string;
    category: string;
    contact: string;
    address: { area: string, city: string, location: string, lat: number, lng: number, title?: string }[];
    email: string;
    website: string;
    //location: ILocation;
    owner?: string | IMember;
    rating: number;
    dated: number;
}

interface IRNgo extends React.Props<any> {
    _id?: string;
    name: string;
    category: string;
    contact: string;
    address: { area: string, city: string, location: string, lat: number, lng: number, title?: string }[];
    email: string;
    website: string;
    //  location: ILocation;
    owner?: string | IMember;
    rating: number;
    dated: number;
    url?:string;
    area: string;       // getting area and then add in address array 
    location: string;   // getting location and then add in address array
    city: string;
}


export {
    INgo,
    IRNgo
}