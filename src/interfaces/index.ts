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

export interface ResponsePlotDataElement {
    "date": string;
    "company": string;
    "complaint_count": string;
    "close_price": string;
    "close_price_difference": string;
}

export interface ResultPlotElement {
    "date": Moment;
    "company": string;
    "complaint_count": number;
    "close_price": number;
    "close_price_difference": number;
}

export interface Response {
    "prob_close_price_drop": number;
    "plot_data": ResponsePlotDataElement[];
};

export interface Result {
    "prob_close_price_drop": number;
    "plot_data": ResultPlotElement[];
}
