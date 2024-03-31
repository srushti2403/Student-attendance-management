import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function LoginForm() {
  const [userType, setUserType] = React.useState("student"); // Default user type is 'student'

  const navigate = useNavigate();
  const handleUserTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (userType == "student") {
      navigate("/studentDashboard");
    } else {
      try {
        const response = await fetch(
          "http://localhost:5082/api/Teacher/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: data.get("username"),
              password: data.get("password"),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Login failed");
        }
        const responseData = await response.json();
        console.log("Login successful:", responseData);
      } catch (error: any) {
        console.error("Login error:", error.message);
      }
      navigate("/teacherDashboard");
    }

    console.log({
      email: data.get("username"),
      password: data.get("password"),
      userType: userType,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Login As</FormLabel>
              <RadioGroup
                aria-label="userType"
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
                row
              >
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="Teacher"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                {userType === "student" ? (
                  <Link href="/signUpStudent" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                ) : (
                  <Link href="/signUpTeacher" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
