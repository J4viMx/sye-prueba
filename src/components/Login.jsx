import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "123",
    },
    onSubmit: async (values, { resetForm }) => {
      if (
        (values.user === "admin" || values.user === "user") &&
        values.password === "123"
      ) {
        localStorage.setItem("isAuthenticated", values.user);
        navigate("/home");
      }
      resetForm();
    },
    validationSchema: Yup.object({
      user: Yup.string().required(`User Required`),
      password: Yup.string().required(`Password required`),
    }),
  });

  const { getFieldProps, errors, touched, handleSubmit } = formik;

  return (
    <>
      <Typography
        variant="h3"
        color="initial"
        textAlign={"center"}
        sx={{ pt: 2 }}
      >
        Login
      </Typography>
      <Box
        sx={{
          pt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
            <InputLabel htmlFor="outlined-adornment-email-login">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="text"
              {...getFieldProps("user")}
              inputProps={{}}
              label="Username"
            />
            {touched.email && errors.email && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ my: 3 }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              name="password"
              {...getFieldProps("password")}
              type="password"
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              color="secondary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
