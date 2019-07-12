import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import Button from "../../../../components/button/button";
import CardList from "../../../../components/cardList/cardList";
import CardListTitle from "../../../../components/cardList/cardListTitle/cardListTitle";
import Loader from "../../../../components/loader/loader";
import OnholdElem from "../../../../components/onholdElem/onholdElem";
import { OnholdService } from "../../../../services/onhold/onhold.service";
import { IOnhold } from "../../../../services/onhold/types";
import { IStudent } from "../../../../services/student/types";
import { IPatient } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { Buttons } from "../../patients/adminMedicalRecordContainer/adminMedicalRecordContainer";

const publicUrl = process.env.REACT_APP_PUBLIC_URL;

export interface IOnholdsByStudentState {
  loading: boolean;
  onholds: IOnhold[];
}

export interface IOnholdsByStudentMapStateToProps {
  token: string;
  userId: string;
  patientId: string;
}

class OnholdsByStudent extends Component<
  IOnholdsByStudentMapStateToProps,
  IOnholdsByStudentState
> {
  state: IOnholdsByStudentState = {
    loading: false,
    onholds: []
  };

  onholdService = new OnholdService(this.props.token);

  async componentDidMount(): Promise<void> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { userId, patientId } = this.props;

      const response = await this.onholdService.getOnHoldsByStudent(
        userId,
        patientId
      );

      const { enEspera } = response.data.data;

      this.setState(() => ({
        loading: false,
        onholds: enEspera
      }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { onholds, loading } = this.state;

    return (
      <div>
        <h2>Mis subidas</h2>

        {loading && <Loader />}

        {!onholds.length && !loading && (
          <h3>
            Aun no ha hecho ninguna modificación a la historia del paciente
          </h3>
        )}

        {!!onholds.length &&
          onholds.map((onhold: IOnhold) => {
            const patient = onhold.paciente as IPatient;
            const student = onhold.estudiante as IStudent;
            const document = new Map(Object.entries(onhold.documento));

            const odontodiagrama = document.get("odontodiagrama");
            const periodontodiagrama = document.get("periodontodiagrama");
            const placa = document.get("registroDeControlDePlaca");

            if (odontodiagrama) {
              document.delete("odontodiagrama");
            }

            if (periodontodiagrama) {
              document.delete("periodontodiagrama");
            }

            if (placa) {
              document.delete("registroDeControlPlaca");
            }

            const rows = [];

            for (const [key, value] of document.entries()) {
              if (typeof value === "object" && value.length > 0) {
                rows.push(
                  <div style={{ marginBottom: "15px" }}>
                    <CardListTitle>{key}</CardListTitle>
                    {value.join(", ")}
                  </div>
                );
              } else if (typeof value === "string") {
                rows.push(
                  <div style={{ marginBottom: "15px" }}>
                    <CardListTitle>{key}</CardListTitle>
                    {value}
                  </div>
                );
              } else if (typeof value === "object") {
                rows.push(<CardList elements={value} />);
              }
            }

            return (
              <OnholdElem
                title={`${onhold.estado} / Paciente ${patient.nombre} ${
                  patient.apellido
                } / Estudiante ${student.nombre} ${student.apellido} / ${
                  onhold.tipo
                } / ${format(
                  new Date(onhold.fechaDeCreacion),
                  "DD [de] MMMM [de] YYYY",
                  { locale: esLocale }
                )}`}
                key={onhold._id}
              >
                {rows}
                {!!odontodiagrama && (
                  <div>
                    <p>Odontodiagrama</p>
                    <img
                      src={`${publicUrl}/${odontodiagrama}`}
                      alt="odontodiagrama"
                    />
                  </div>
                )}
                {!!periodontodiagrama && (
                  <div>
                    <p>Periodontodiagrama</p>
                    <img
                      src={`${publicUrl}/${periodontodiagrama}`}
                      alt="periodontodiagrama"
                    />
                  </div>
                )}
                {!!placa && (
                  <div>
                    <p>Registro de control de Placa</p>
                    <img
                      src={`${publicUrl}/${placa}`}
                      alt="Registro De Control De Placa"
                    />
                  </div>
                )}
              </OnholdElem>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IOnholdsByStudentMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token,
  userId: state.auth.user!.id,
  patientId: state.auth.patient!._id!
});

export default connect(mapStateToProps)(OnholdsByStudent);
