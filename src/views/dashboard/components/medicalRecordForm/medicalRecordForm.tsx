import { Form, FormikProps } from "formik";
import React, { Component, FunctionComponent } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router";
import StepFive from "./stepFive/stepFive";
import StepFour from "./stepFour/stepFour";
import StepOne from "./stepOne/stepOne";
import StepSix from "./stepSix/stepSix";
import StepThree from "./stepThree/stepThree";
import StepTwo from "./stepTwo/stepTwo";

export interface IRenderStepProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  path: string | string[] | undefined;
}

const RenderStep: FunctionComponent<IRenderStepProps> = ({
  component: ReactComponent,
  path,
  ...rest
}) => (
  <Route
    path={path}
    render={(props: RouteComponentProps) => (
      <ReactComponent {...props} {...rest} />
    )}
  />
);

class MedicalRecordForm extends Component<
  RouteComponentProps & FormikProps<any>
> {
  render() {
    const { match } = this.props;
    return (
      <Form>
        <Switch>
          <RenderStep
            path={`${match.path}/paso-1`}
            component={StepOne}
            {...this.props}
          />
          <RenderStep
            path={`${match.path}/paso-2`}
            component={StepTwo}
            {...this.props}
          />
          <RenderStep
            path={`${match.path}/paso-3`}
            component={StepThree}
            {...this.props}
          />
          <RenderStep
            path={`${match.path}/paso-4`}
            component={StepFour}
            {...this.props}
          />
          <RenderStep
            path={`${match.path}/paso-5`}
            component={StepFive}
            {...this.props}
          />
          <RenderStep
            path={`${match.path}/paso-6`}
            component={StepSix}
            {...this.props}
          />
          <Redirect to={`${match.url}/paso-1`} />
        </Switch>
      </Form>
    );
  }
}

export default withRouter(MedicalRecordForm);
