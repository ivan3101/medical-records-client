import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Loader from "../../../../components/loader/loader";
import { IMedicalRecord, ITriage, IPatient } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import MedicalRecord from "../../components/medicalRecord/medicalRecord";
import MedicalRecordPdf from "../../components/medicalRecordPdf/medicalRecordPdf";
import { Buttons } from "../adminMedicalRecordContainer/adminMedicalRecordContainer";

export interface IStudentMedicalRecordContainerMapStateToProps {
  medicalRecord: IMedicalRecord;
  triage: ITriage;
  patient: IPatient;
}

class StudentMedicalRecordContainer extends Component<
  IStudentMedicalRecordContainerMapStateToProps & RouteComponentProps
> {
  onClickAddTriage = () => {
    const { history } = this.props;

    history.push(
      `/dashboard/pacientes/${
        (this.props.patient as IPatient)._id
      }/triaje/agregar`
    );
  };

  onClickAddMedicalRecord = () => {
    const { history, match } = this.props;

    history.push(
      `/dashboard/pacientes/${
        (this.props.patient as IPatient)._id
      }/historiaclinica/agregar`
    );
  };

  onClickModifyTriage = (): void => {
    const { history, match } = this.props;

    history.push(
      `/dashboard/pacientes/${
        (this.props.patient as IPatient)._id
      }/triaje/modificar`
    );
  };

  onClickModifyMedicalRecord = (): void => {
    const { history, match } = this.props;

    history.push(
      `/dashboard/pacientes/${
        (this.props.patient as IPatient)._id
      }/historiaclinica/modificar`
    );
  };

  render() {
    const { medicalRecord, triage } = this.props;

    return (
      <Fragment>
        <Buttons>
          <Button onClick={this.onClickAddTriage}>Agregar Triaje</Button>
          <Button onClick={this.onClickModifyTriage}>Modificar Triaje</Button>
          <Button onClick={this.onClickAddMedicalRecord}>
            Agregar Historia Clinica
          </Button>
          <Button onClick={this.onClickModifyMedicalRecord}>
            Modificar Historia Clinica
          </Button>
          <PDFDownloadLink
            document={MedicalRecordPdf(medicalRecord!, triage!)}
            fileName={"historiaclinica.pdf"}
          >
            {({ loading }) =>
              loading ? <Loader /> : <Button>Generar PDF</Button>
            }
          </PDFDownloadLink>
        </Buttons>

        <MedicalRecord triage={triage} medicalRecord={medicalRecord} />
      </Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IStudentMedicalRecordContainerMapStateToProps,
  {},
  IApplicationState
> = state => ({
  patient: state.auth.patient!,
  medicalRecord: state.auth.medicalRecord!,
  triage: state.auth.triage!
});

export default connect(mapStateToProps)(StudentMedicalRecordContainer);
