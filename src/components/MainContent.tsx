import { Box, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useState } from "react";
import { companyEncodedValues, companyNameSelectFieldValues } from "../constants";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { CompanyNameValue } from "../interfaces";

const MainContent = () => {
    const [company, setCompany] = useState(companyNameSelectFieldValues[0].value);
    const [companyEncodedValue, setCompanyEncodedValue] = useState(0);
    const [startDate, setStartDate] = useState<Moment | null>(moment('2011-12-01'));
    const [endDate, setEndDate] = useState<Moment | null>(moment('2012-12-01'));

    console.log(company, companyEncodedValue, startDate, endDate);

    return (
        <Box px={10} pt={5}>
            <Grid2 container spacing={4}>
                <Grid2 size={12} mb={2}>
                    <Typography variant="h6">
                        Enter Company Details and Timeframe between which you want the analysis
                    </Typography>
                </Grid2>

                <Grid2 size={4}>
                    <FormControl fullWidth>
                        <InputLabel>
                            Company Name
                        </InputLabel>

                        <Select
                            value={company}
                            label="Company Name"
                            onChange={(event: SelectChangeEvent) => {
                                const newValue: CompanyNameValue = event.target.value as CompanyNameValue
                                setCompany(newValue);
                                setCompanyEncodedValue(companyEncodedValues.get(newValue) as number)
                            }}
                        >
                            {
                                companyNameSelectFieldValues.map((fieldValue) => {
                                    return (
                                        <MenuItem value={fieldValue.value}>
                                            {fieldValue.label}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid2>

                <Grid2 size={8}>
                    <></>
                </Grid2>

                <Grid2 size={4}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        minDate={moment('2011-12-01')}
                        maxDate={moment('2024-10-29')}
                        slotProps={{
                            "textField": {
                                "fullWidth": true
                            }
                        }}
                    />
                </Grid2>

                <Grid2 size={4}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        minDate={moment('2011-12-01')}
                        maxDate={moment('2024-10-29')}
                        slotProps={{
                            "textField": {
                                "fullWidth": true
                            }
                        }}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default MainContent;
