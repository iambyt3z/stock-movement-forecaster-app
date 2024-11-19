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
