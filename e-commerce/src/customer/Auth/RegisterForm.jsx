// import { Button, Grid, TextField } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getUser, register } from "../../State/Auth/Action.js";

// const RegisterForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt")
//   const {auth}=useSelector(store=>store)


//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUser(jwt));
//     }
//   }, [jwt, auth.jwt]);



// const handleSubmit = (event) => {
//     event.preventDefault();
  
//     const data = new FormData(event.currentTarget);
  
//     const userData = {
//       firstName: data.get("firstName"),
//       lastName: data.get("lastName"),
//       email: data.get("email"),
//       password: data.get("password"),
//     };
  
//     dispatch(register(userData));
//     console.log("userData : ", userData);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="first name"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="last name"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="password"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full "
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
//             >
//               Register
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <div className="flex justify-center flex-col items-center">
//         <div className="py-3 flex items-center">
//           <p>if you have already account?</p>
//           <Button
//             onClick={() => navigate("/login")}
//             className="ml-5"
//             size="small"
//           >
//             Login
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;



import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action.js";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form fields before submitting
    if (validateForm()) {
      const data = new FormData(event.currentTarget);

      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };

      dispatch(register(userData));
      console.log("userData: ", userData);
    }
  };

  const validateForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    // Validation logic for each field
    if (!formValues.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!formValues.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formValues.email)) {
      errors.email = "Invalid email format";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (!isStrongPassword(formValues.password)) {
      errors.password =
        "Password must have at least 8 characters, including uppercase, lowercase, and a number";
    }

    setFormErrors(errors);

    // Return true if there are no errors, otherwise false
    return Object.values(errors).every((error) => error === "");
  };

  const isValidEmail = (email) => {
    // Basic email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    // Password must have at least 8 characters, including uppercase, lowercase, and a number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="first name"
              value={formValues.firstName}
              onChange={handleInputChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="last name"
              value={formValues.lastName}
              onChange={handleInputChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full "
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>if you have already account?</p>
          <Button
            onClick={() => navigate("/login")}
            className="ml-5"
            size="small"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
