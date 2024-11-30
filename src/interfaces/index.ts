import { Moment } from "moment";

export type CompanyNameValue = 
    | "AMERICAN EXPRESS COMPANY"
    | "BANK OF AMERICA, NATIONAL ASSOCIATION"
    | "CAPITAL ONE FINANCIAL CORPORATION"
    | "CITIBANK, N.A."
    | "DISCOVER BANK"
    | "JPMORGAN CHASE & CO."
    | "Navient Solutions, LLC."
    | "SYNCHRONY FINANCIAL"
    | "U.S. BANCORP"
    | "WELLS FARGO & COMPANY";

export interface SelectFeildItem {
    label: string;
    value: CompanyNameValue;
}

export type EncodedCompanyValueMap = Map<CompanyNameValue, number>;

export interface ResponseElement {
    "date": string;
    "company": string;
    "complaint_count": string;
    "open_price": string;
    "high_price": string;
    "low_price": string;
    "close_price": string;
}

export interface ResultElement {
    "date": Moment;
    "company": string;
    "complaint_count": number;
    "open_price": number;
    "high_price": number;
    "low_price": number;
    "close_price": number;
}

export type Response = ResponseElement[];
export type Result = ResultElement[];
