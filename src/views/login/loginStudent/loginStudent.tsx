import React, { FunctionComponent } from "react";
import Background from "../../../components/background/background";
import CardContent from "../../../components/card/cardContent/cardContent";
import CardHeader from "../../../components/card/cardHeader/cardHeader";
import LoginCard from "../components/loginCard/loginCard";
import LoginFormContainer from "./components/loginForm/loginFormContainer";

const LoginStudent: FunctionComponent = () => {
  return (
    <Background center>
      <LoginCard>

        <CardHeader>
          Iniciar Sesión
        </CardHeader>

        <CardContent>
          <LoginFormContainer/>
        </CardContent>

      </LoginCard>
    </Background>
  );
};

export default LoginStudent;