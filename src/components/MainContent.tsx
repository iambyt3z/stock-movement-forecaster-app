import { Backdrop, Box, Button, CircularProgress, Divider, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from "react";
import { companyEncodedValues, companyNameSelectFieldValues } from "../constants";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { CompanyNameValue } from "../interfaces";
import useQuery from "../hooks/useQuery";
import { ChartsReferenceLine, ScatterChart } from "@mui/x-charts";

const MainContent = () => {
    // Basic Company Information
    const [company, setCompany] = useState(companyNameSelectFieldValues[0].value);
    const [companyEncodedValue, setCompanyEncodedValue] = useState(0);
    const [endDate, setEndDate] = useState<Moment | null>(moment('2012-12-01'));
    const [startDate, setStartDate] = useState<Moment | null>(moment('2011-12-01'));

    // Yesterday's Data
    const [complaintCount, setComplaintCount] = useState("0");
    const [openPrice, setOpenPrice] = useState("0");
    const [closePrice, setClosePrice] = useState("0");

    // Plot Data
    const [priceDropProb, setPriceDropProb] = useState(0);
    const [plotDates, setPlotDates] = useState<Moment[]>([]);
    const [plotClosePrices, setPlotClosePrices] = useState<number[]>([]);
    const [plotComplaintCounts, setPlotComplaintCounts] = useState<number[]>([]);
    const [scatterPlotData, setScatterPlotData] = useState<{x: number; y: number; id: number}[]>([]);

    const { query, isLoading } = useQuery();

    const runQuery = () => {
        query(company, companyEncodedValue, startDate as Moment, endDate as Moment, complaintCount, openPrice, closePrice)
            .then((result) => {
                const { plot_data, prob_close_price_drop } = result;
                
                setPriceDropProb(prob_close_price_drop);
                setPlotDates(plot_data.map((row) => (row.date)));
                setPlotClosePrices(plot_data.map((row) => (row.close_price)));
                setPlotComplaintCounts(plot_data.map((row) => (row.complaint_count)));
                
                setScatterPlotData(
                    plot_data.map((row, index) => ({
                        "id": index,
                        "x": row.complaint_count,
                        "y": row.close_price_difference
                    }))
                );
            })
    }

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

                <Grid2 size={4}>
                    <></>
                </Grid2>

                <Grid2 size={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Yesterday's Complaint Count"
                        value={complaintCount}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setComplaintCount(event.target.value);
                        }}
                    />
                </Grid2>

                <Grid2 size={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Yesterday's Open Price (USD)"
                        value={openPrice}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setOpenPrice(event.target.value);
                        }}
                    />
                </Grid2>

                <Grid2 size={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Yesterday's Close Price (USD)"
                        value={closePrice}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setClosePrice(event.target.value);
                        }}
                    />
                </Grid2>

                <Grid2 size={12}>
                    <Button variant="contained" onClick={runQuery}>
                        <Typography>
                            Submit
                        </Typography>
                    </Button>
                </Grid2>

                {
                    (plotDates.length > 1) && 
                    <Grid2 container spacing={10}>
                        <Grid2 size={12}>
                            <Divider/>
                        </Grid2>

                        <Grid2 size={12} pl={10}>
                            <Typography fontWeight={600}>
                                {`Probability of stock price droping = ${ (priceDropProb * 100).toFixed(2) }%`}
                            </Typography>
                        </Grid2>

                        <Grid2 size={12}>
                            <LineChart
                                xAxis={[
                                    {
                                        label: "Date",
                                        data: plotDates,
                                        tickInterval: plotDates,
                                        disableTicks: true,
                                        scaleType: "time",
                                        valueFormatter: (date) => date.format("YYYY-MM-DD"),
                                    },
                                ]}
                                yAxis={[{ label: "Stock Price (USD)" }]}
                                series={[
                                    { 
                                        data: plotClosePrices,
                                        showMark: false,
                                        curve: "linear",
                                    }
                                ]}
                                height={400}
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <LineChart
                                xAxis={[
                                    {
                                        label: "Date",
                                        data: plotDates,
                                        tickInterval: plotDates,
                                        disableTicks: true,
                                        scaleType: "time",
                                        valueFormatter: (date) => date.format("YYYY-MM-DD"),
                                    },
                                ]}
                                yAxis={[{ label: "Complaints" }]}
                                series={[
                                    { 
                                        data: plotComplaintCounts,
                                        showMark: false,
                                        curve: "linear",
                                    }
                                ]}
                                height={400}
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <ScatterChart
                                height={400}
                                xAxis={[
                                    {
                                        min: 0,
                                        label: "Complaints",
                                    }
                                ]}
                                yAxis={[
                                    { 
                                        label: "Stock Price Difference (USD)",
                                        colorMap: {
                                            type: 'piecewise',
                                            thresholds: [0],
                                            colors: ['#F67280', '#05B2AB']
                                        },
                                    }
                                ]}
                                series={[{ data: scatterPlotData }]}
                            >
                                <ChartsReferenceLine y={0} lineStyle={{ opacity: 0.5 }}/>
                            </ScatterChart>

                            <Grid2 size={12}>
                                <Box height="200px"></Box>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                }
            </Grid2>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

export default MainContent;
