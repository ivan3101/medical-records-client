import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Loader from "../../../../components/loader/loader";
import { PatientService } from "../../../../services/patient/patient.service";
import { IApplicationState } from "../../../../store";
import MedicalRecord from "../../components/medicalRecord/medicalRecord";
import MedicalRecordPdf from "../../components/medicalRecordPdf/medicalRecordPdf";
import { IPersonalFormMapStateToProps } from "../../personal/addPersonal/addPersonal";
import {
  Buttons,
  IAdminMedicalRecordContainerState
} from "../adminMedicalRecordContainer/adminMedicalRecordContainer";

class ProfessorMedicalRecordContainer extends Component<
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
      this.setState(() => ({
        loading: true
      }));

      const { id } = this.props.match.params;

      const { triaje: triage } = (await this.patientService.getTriageByPatient(
        id
      )).data.data;
      const {
        historiaMedica: medicalRecord
      } = (await this.patientService.getMedicalRecordByPatient(id)).data.data;

      this.setState(() => ({
        triage,
        medicalRecord,
        loading: false
      }));
    } catch (e) {
      console.log(e);
    }
  }

  onClickReturn = (): void => {
    const { history } = this.props;

    history.push(`/dashboard/revision`);
  };

  render() {
    const { loading } = this.state;

    return (
      <Fragment>
        <Buttons>
          <Button onClick={this.onClickReturn}>Regresar</Button>
          <PDFDownloadLink
            document={MedicalRecordPdf(
              this.state.medicalRecord!,
              this.state.triage!
            )}
            fileName={"historiaclinica.pdf"}
          >
            {({ loading: pdfLoading }) =>
              pdfLoading ? <Loader /> : <Button>Generar PDF</Button>
            }
          </PDFDownloadLink>
        </Buttons>

        {loading ? (
          <Loader />
        ) : (
          <MedicalRecord
            triage={this.state.triage}
            medicalRecord={this.state.medicalRecord}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(ProfessorMedicalRecordContainer);
