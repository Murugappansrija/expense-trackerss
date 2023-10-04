// import Card from "@mui/material/Card";
// import dayjs from "dayjs";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { useEffect, useState } from "react";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import Cookies from "js-cookie";
// import Autocomplete from "@mui/material/Autocomplete";
// import { Box } from "@mui/material";
// import {useSelector} from 'react-redux'
// const initialForm = {
//  label:"",
//  icons:"",
// };
// const icons =[{
//     label:"User"
// }]
// export default function CategoryForm({editCategory,fetchTransction}) {
//   const {categories} = useSelector((state)=>state.auth.user)
//   const token = Cookies.get("token");
//   const [form, setForm] = useState(initialForm);
  

//   useEffect(() => {
//     if (editCategory._id !== undefined) {
//       setForm(editCategory);
//     }
//   }, [editCategory]);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function handleDate(newValue) {
//     setForm({ ...form, date: newValue });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     editCategory._id === undefined ? create() : update();
//   }
//   function reLoad(res) {
//     if (res.ok) {
//       setForm(initialForm);
//       fetchTransction();
//     }
//   }
//   async function create() {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
//       method: "POST",
//       body: JSON.stringify(form),
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     reLoad(res);
//   }

//   async function update() {
//     const res = await fetch(
//       `${process.env.REACT_APP_API_URL}/category/${editCategory._id}`,
//       {
//         method: "PATCH",
//         body: JSON.stringify(form),
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     reLoad(res);
//   }
//   function getCategoryNameById(){
//     return categories.find((category) => category._id===form.category_id) ?? ""
//   }
//   return (
//     <Card sx={{ minWidth: 275, marginTop: 10 }}>
//       <CardContent>
//         <Typography variant="h5">Add New Transaction</Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{diplay:"flex"}}>
//           <TextField
//             sx={{ marginRight: 5 }}
//             size="small"
//             id="outlined-basic"
//             label="Lable"
//             type="text"
//             variant="outlined"
//             value={form.label}
//             onChange={handleChange}
//             name="lable"
//           />
//           {/* <TextField
//             sx={{ marginRight: 5 }}
//             size="small"
//             id="outlined-basic"
//             label="Description"
//             variant="outlined"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//           />
//           <LocalizationProvider dateAdapter={AdapterDayjs}  >
//             <DemoContainer   components={["DesktopDatePicker"]} />

//             <DemoItem label="DATE" size="small">
//               <DesktopDatePicker
            
//                 onChange={handleDate}
//                 name="date"
//                 defaultValue={dayjs("YYYY-MM-DD")}
//               />
//             </DemoItem>
//           </LocalizationProvider> */}
//           <Autocomplete
//             // value={form.category_id}
//             value={getCategoryNameById()}
//             onChange={(event, newValue) => {
//               setForm({ ...form, icon : newValue });
//             }}
//             // inputValue={form.category}
//             // onInputChange={(event, newInputValue) => {
//             //   setInputValue(newInputValue);
//             // }}
//             id="icons"
//             options={icons}
//             sx={{ width: 200 }}
//             renderInput={(params) => (
//               <TextField {...params} sx={{ marginRight: 5 }} size="small" label="icon"  />
//             )}
//           />
//           {editCategory._id !== undefined && (
//             <Button variant="contained" type="submit">
//               Update
//             </Button>
//           )}
//           {editCategory._id === undefined && (
//             <Button variant="contained" type="submit">
//               Submit
//             </Button>
//           )}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/auth.js";
const InitialForm = {
  label: "",
  icon: "",
};

const icons = ["User"];

export default function CategoryForm({ editCategory }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [form, setForm] = useState(InitialForm);

  useEffect(() => {
    if (editCategory._id !== undefined) {
      setForm(editCategory);
    }
  }, [editCategory]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editCategory._id === undefined ? create() : update();
  }

  function reload(res, _user) {
    if (res.ok) {
      dispatch(getUser({ user: _user }));
      setForm(InitialForm);
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const _user = {
      ...user,
      categories: [...user.categories, { ...form }],
    };
    reload(res, _user);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/category/${editCategory._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const _user = {
      ...user,
      categories: user.categories.map((cat) =>
        cat._id == editCategory._id ? form : cat
      ),
    };
    reload(res, _user);
  }

  function getCategoryNameById() {
    return (
      user.categories.find((category) => category._id === form.category_id) ??
      ""
    );
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Categeory</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Label"
            type="text"
            size="small"
            name="label"
            variant="outlined"
            value={form.label}
            onChange={handleChange}
          />

          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Icon" />
            )}
          />

          {editCategory._id !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}

          {editCategory._id === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
