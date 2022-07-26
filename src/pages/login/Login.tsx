import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { sendEmailVerification } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import confirmSignUp, { ConfirmCode } from "../../auth/confirmSignUp";
import { LoginValues } from "../../auth/signIn";
import signUp, { UserAttributes } from "../../auth/signUp";
import { startLoginWithEmail } from "../../auth/thunks";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import LoginForm from "./LoginForm";
import RecoveryForm from "./RecoveryForm";
import RegisterConfirmForm from "./RegisterConfirmForm";
import RegisterForm from "./RegisterForm";

interface LoginProps {
  step: "login" | "register" | "passwordRecovery" | "confirmationCode";
}

export default function Login({ step }: LoginProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // TODO: change display name
  const userEmail = useAppSelector((state) => state.auth.displayName);
  const errorMessage = useAppSelector((state) => state.auth.errorMessage);
  const unverifiedUser = useAppSelector((state) => state.auth.unverifiedUser);

  const signUpSubmit = async ({
    email,
    password,
    givenName,
    familyName,
  }: UserAttributes) => {
    signUp(
      {
        email,
        password,
        givenName,
        familyName,
      },
      dispatch,
      navigate,
      enqueueSnackbar,
      t
    );
  };

  const confirmSignUpSubmit = async ({ confirmCode }: ConfirmCode) => {
    confirmSignUp(
      { confirmCode },
      userEmail || "",
      navigate,
      enqueueSnackbar,
      t,
      dispatch
    );
  };

  const handleResend = async () => {
    if (unverifiedUser) sendEmailVerification(unverifiedUser);
  };

  const signInSubmit = ({ email, password }: LoginValues) => {
    console.log("se ejecuta signInSubmit", email, password);
    dispatch(startLoginWithEmail({ email, password }));
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
          {t("general.login")}
        </Typography>
        <Paper
          elevation={4}
          sx={{
            width: 350,
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 1,
            my: 1,
          }}
        >
          {/* TODO: use this error for all errors */}
          {errorMessage && (
            <Alert severity="warning" sx={{ my: 2 }}>
              {t(`errors.${errorMessage}`)}
            </Alert>
          )}
          {step === "register" && <RegisterForm submit={signUpSubmit} />}
          {step === "passwordRecovery" && <RecoveryForm />}
          {step === "confirmationCode" && (
            <RegisterConfirmForm submit={confirmSignUpSubmit} />
          )}
          {step === "login" && <LoginForm submit={signInSubmit} />}
          {unverifiedUser && (
            <Button onClick={handleResend}>
              {t("login.resend_confirmation_code")}
            </Button>
          )}
        </Paper>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            width: 350,
            display: "flex",
            justifyContent: "center",
            p: 2,
            my: 1,
          }}
        >
          {(step === "register" || step === "confirmationCode") && (
            <Typography variant="body2">
              {t("login.already_registered")}{" "}
              <Link component={NavLink} to="/">
                {t("login.log_in")}
              </Link>
            </Typography>
          )}
          {step === "passwordRecovery" && (
            <Typography variant="body2">
              {t("login.go_back_to")}{" "}
              <Link component={NavLink} to="/">
                {t("general.login")}
              </Link>
            </Typography>
          )}
          {step === "login" && (
            <Typography variant="body2">
              {t("login.not_registered")}{" "}
              <Link component={NavLink} to="register">
                {t("login.create_an_account")}
              </Link>
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: 350, mb: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LanguageSelector />
            </Grid>
            <Grid item xs={6}>
              <ThemeSelector />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}