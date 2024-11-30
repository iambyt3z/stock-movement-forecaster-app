import axios from "axios";
import moment, { Moment } from "moment";
import { useState } from "react";
import { Response, Result } from "../interfaces";

interface HookReturn {
    query: (
        companyName: string,
        companyEncodedValue: number,
        startDate: Moment,
        endDate: Moment,
        complaintCount: string
    ) => Promise<Result>;
    isLoading: boolean;
}

function useQuery(): HookReturn {
    const [isLoading, setIsLoading] = useState(false);

    const query = async (
        companyName: string,
        companyEncodedValue: number,
        startDate: Moment,
        endDate: Moment,
        complaintCount: string
    ): Promise<Result> => {
        setIsLoading(true);

        const apiUrl = "http://127.0.0.1:8000/company?"
            + `company_name=${encodeURIComponent(companyName)}&`
            + `company_encoded_value=${companyEncodedValue}&`
            + `start_date=${startDate.format('YYYY-MM-DD')}&`
            + `end_date=${endDate.format('YYYY-MM-DD')}&`
            + `complaints_count=${complaintCount}`

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: apiUrl,
            headers: { }
        };

        let result: Result = [];

        await axios.request(config)
            .then((response) => {
                const responseData = response.data as Response;

                result = responseData.map((responseElement) => {
                    return {
                        "date": moment(responseElement.date),
                        "company": responseElement.company,
                        "complaint_count": Number(responseElement.complaint_count),
                        "open_price": Number(responseElement.open_price),
                        "high_price": Number(responseElement.high_price),
                        "low_price": Number(responseElement.low_price),
                        "close_price": Number(responseElement.close_price),
                    }
                })
            })
            .catch((error) => {
                console.error(error);
            });

        setIsLoading(false);

        return result;
    }

    return {
        "query": query,
        "isLoading": isLoading
    };
}

export default useQuery;
