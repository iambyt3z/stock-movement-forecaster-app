import { EncodedCompanyValueMap, SelectFeildItem } from "../interfaces";

export const companyNameSelectFieldValues: SelectFeildItem[] = [
    {
        "label": "American Express Company",
        "value": "AMERICAN EXPRESS COMPANY",
    },
    {
        "label": "Bank of America",
        "value": "BANK OF AMERICA, NATIONAL ASSOCIATION",
    },
    {
        "label": "Capital One",
        "value": "CAPITAL ONE FINANCIAL CORPORATION",
    },
    {
        "label": "Citibank",
        "value": "CITIBANK, N.A.",
    },
    {
        "label": "Discover Bank",
        "value": "DISCOVER BANK",
    },
    {
        "label": "JP Morgan & Chase",
        "value": "JPMORGAN CHASE & CO.",
    },
    {
        "label": "Navient Solutions",
        "value": "Navient Solutions, LLC.",
    },
    {
        "label": "Synchrony Financial",
        "value": "SYNCHRONY FINANCIAL",
    },
    {
        "label": "U.S. Bancorp",
        "value": "U.S. BANCORP",
    },
    {
        "label": "Wells Fargo",
        "value": "WELLS FARGO & COMPANY",
    },
];

export const companyEncodedValues: EncodedCompanyValueMap = new Map([
    ["AMERICAN EXPRESS COMPANY", 0],
    ["BANK OF AMERICA, NATIONAL ASSOCIATION", 1],
    ["CAPITAL ONE FINANCIAL CORPORATION", 2],
    ["CITIBANK, N.A.", 3],
    ["DISCOVER BANK", 4],
    ["JPMORGAN CHASE & CO.", 5],
    ["Navient Solutions, LLC.", 6],
    ["SYNCHRONY FINANCIAL", 7],
    ["U.S. BANCORP", 8],
    ["WELLS FARGO & COMPANY", 9],
]);
