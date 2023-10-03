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
import Cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";

const initialForm = {
  amount: 0,
  description: "",
  date: new Date(),
  category: "",
};

export default function TransactionForm({ fetchTransction, editTransaction }) {
  const token = Cookies.get("token");
  const [form, setForm] = useState(initialForm);
  const categories = [
    { label: "Travel" },
    { label: "Food" },
    { label: "shooping" },
    { label: "invesment" },
    { label: "entertainment" },
  ];

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();
  }
  function reLoad(res) {
    if (res.ok) {
      setForm(initialForm);
      fetchTransction();
    }
  }
  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    reLoad(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reLoad(res);
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h5">Add New Transaction</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{diplay:"flex"}}>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <DemoContainer   components={["DesktopDatePicker"]} />

            <DemoItem label="DATE" size="small">
              <DesktopDatePicker
            
                onChange={handleDate}
                name="date"
                defaultValue={dayjs("YYYY-MM-DD")}
              />
            </DemoItem>
          </LocalizationProvider>
          <Autocomplete
            value={form.category}
            onChange={(event, newValue) => {
              setForm({ ...form, category: newValue });
            }}
            // inputValue={form.category}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} sx={{ marginRight: 5 }} size="small" label="Category"  />
            )}
          />
          {editTransaction.amount !== undefined && (
            <Button variant="contained" type="submit">
              Update
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button variant="contained" type="submit">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
