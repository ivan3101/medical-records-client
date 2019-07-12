import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import { PatientService } from "../../../../services/patient/patient.service";
import { IMedicalRecord, ITriage } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { IPersonalFormMapStateToProps } from "../../personal/addPersonal/addPersonal";
import MedicalRecord from "../../components/medicalRecord/medicalRecord";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MedicalRecordPdf from "../../components/medicalRecordPdf/medicalRecordPdf";
import Loader from "../../../../components/loader/loader";
import styled from "styled-components";

export interface IAdminMedicalRecordContainerState {
  triage: ITriage | null;
  medicalRecord: IMedicalRecord | null;
  loading: boolean;
}

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class AdminMedicalRecordContainer extends Component<
  IPersonalFormMapStateToProps & RouteComponentProps<{ id: string }>,
  IAdminMedicalRecordContainerState
> {
  state: IAdminMedicalRecordContainerState = {
    triage: null,
    medicalRecord: null,
    loading: false
  };

  patientService = new PatientService(this.props.token);

  async componentDidMount(): Promise<any> {
    try {
      const { id } = this.props.match.params;

      const { triaje: triage } = (await this.patientService.getTriageByPatient(
        id
      )).data.data;
      const {
        historiaMedica: medicalRecord
      } = (await this.patientService.getMedicalRecordByPatient(id)).data.data;

      this.setState(() => ({
        triage,
        medicalRecord
      }));
    } catch (e) {
      console.log(e);
    }
  }

  onClickReturn = (): void => {
    const { history } = this.props;

    history.push(`/dashboard/pacientes`);
  };

  onClickAddTriage = () => {
    const { history, match } = this.props;

    history.push(`/dashboard/pacientes/${match.params.id}/triaje/agregar`);
  };

  onClickAddMedicalRecord = () => {
    const { history, match } = this.props;

    history.push(
      `/dashboard/pacientes/${match.params.id}/historiaclinica/agregar`
    );
  };

  onClickModifyTriage = (): void => {
    const { history, match } = this.props;

    history.push(`/dashboard/pacientes/${match.params.id}/triaje/modificar`);
  };

  onClickModifyMedicalRecord = (): void => {
    const { history, match } = this.props;

    history.push(
      `/dashboard/pacientes/${match.params.id}/historiaclinica/modificar`
    );
  };
  render() {
    return (
      <Fragment>
        <Buttons>
          <Button onClick={this.onClickReturn}>Regresar</Button>
          <Button onClick={this.onClickAddTriage}>Agregar Triaje</Button>
          <Button onClick={this.onClickModifyTriage}>Modificar Triaje</Button>
          <Button onClick={this.onClickAddMedicalRecord}>
            Agregar Historia Clinica
          </Button>
          <Button onClick={this.onClickModifyMedicalRecord}>
            Modificar Historia Clinica
          </Button>
          <PDFDownloadLink
            document={MedicalRecordPdf(
              this.state.medicalRecord!,
              this.state.triage!
            )}
            fileName={"historiaclinica.pdf"}
          >
            {({ loading }) =>
              loading ? <Loader /> : <Button>Generar PDF</Button>
            }
          </PDFDownloadLink>
        </Buttons>

        <MedicalRecord
          triage={this.state.triage}
          medicalRecord={this.state.medicalRecord}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(AdminMedicalRecordContainer);
