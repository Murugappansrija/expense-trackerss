import Card from "@mui/material/Card";
import dayjs from "dayjs";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const initialForm = { amount: 0, description: "", date: new Date() };

export default function TransactionForm({ fetchTransction }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      setForm(initialForm);
      fetchTransction();
    }
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h5">Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={form.amount}
            onChange={handleChange}
            name="amount"
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
            value={form.description}
            onChange={handleChange}
           
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={form.date}
              onChange={handleDate}
              name = "date"
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            /> */}
            <DemoContainer components={["DesktopDatePicker"]} />

            <DemoItem label="Desktop variant"    size="small">
              <DesktopDatePicker
               onChange={handleDate} 
                name = "date"
                       
                defaultValue={dayjs("YYYY-MM-DD")}
              />
            </DemoItem>
          
          </LocalizationProvider>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
