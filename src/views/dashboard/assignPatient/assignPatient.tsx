import { AxiosError } from "axios";
import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import Container from "../../../components/container/container";
import FormGroup from "../../../components/form/formGroup/formGroup";
import Label from "../../../components/form/label/label";
import SubmitButton from "../../../components/form/submitButton/submitButton";
import SubmitSuccess from "../../../components/form/submitMessage/submitSuccess/submitSuccess";
import Suggestion from "../../../components/suggestion/suggestion";
import { PatientService } from "../../../services/patient/patient.service";
import { PersonalService } from "../../../services/personal/personal.service";
import { IPersonal } from "../../../services/personal/types";
import { StudentService } from "../../../services/student/student.service";
import { IStudent } from "../../../services/student/types";
import { TempPasswordService } from "../../../services/tempPassword/tempPassword.service.";
import { IGeneratePasswordRequest } from "../../../services/tempPassword/types";
import { IPatient } from "../../../services/types";
import { IApplicationState } from "../../../store";
import "./styles.css";

export interface IAssignPatientMapStateToProps {
  token: string;
}

export interface IFilteredResults<T = {}> {
  _id: string;
  _source: T;
}

export interface IAssingPatientState {
  students: Array<IFilteredResults<IStudent>>;
  patients: Array<IFilteredResults<IPatient>>;
  personals: Array<IFilteredResults<IPersonal>>;
  selectedStudent: {
    id: string;
    cedula: string;
  } | null;
  selectedPatient: any;
  selectedPersonal: any;
  studentValue: string;
  personalValue: string;
  patientValue: string;
  submitMessage: string;
}

class AssignPatient extends Component<
  IAssignPatientMapStateToProps,
  IAssingPatientState
> {
  state: IAssingPatientState = {
    patients: [],
    personals: [],
    students: [],
    selectedPatient: "",
    selectedPersonal: "",
    selectedStudent: null,
    studentValue: "",
    personalValue: "",
    patientValue: "",
    submitMessage: ""
  };

  studentService = new StudentService(this.props.token);
  personalService = new PersonalService(this.props.token);
  patientService = new PatientService(this.props.token);
  tempPasswordService = new TempPasswordService(this.props.token);

  onGetSuggestionValueStudent = (
    suggestion: IFilteredResults<IPersonal | IPatient | IStudent>
  ) => {
    return suggestion._source.nombre + " " + suggestion._source.apellido;
  };

  onSuggestionFetchRequestedStudent = async ({ value }: any) => {
    try {
      const filteredStudents = await this.studentService.getFilteredStudents(
        value
      );

      this.setState(() => ({
        students: filteredStudents.data.data.students
      }));
    } catch (e) {
      console.log(e);
    }
  };

  onSuggestionFetchRequestedPatient = async ({ value }: any) => {
    try {
      const filteredStudents = await this.patientService.getFilteredPatients(
        value
      );

      this.setState(() => ({
        patients: filteredStudents.data.data.patients
      }));
    } catch (e) {
      console.log(e);
    }
  };

  onSuggestionFetchRequestedPersonal = async ({ value }: any) => {
    try {
      const filteredStudents = await this.personalService.getFilteredStudents(
        value
      );

      this.setState(() => ({
        personals: filteredStudents.data.data.personal
      }));
    } catch (e) {
      console.log(e);
    }
  };

  onSuggestionSelectedStudent = (_event: any, { suggestion }: any) => {
    const cedula = suggestion._source.cedula;
    const id = suggestion._id;

    this.setState(() => ({
      selectedStudent: {
        cedula,
        id
      }
    }));
  };

  onSuggestionSelectedPatient = (_event: any, { suggestion }: any) => {
    const selectedPatient = suggestion._id;

    this.setState(() => ({
      selectedPatient
    }));
  };

  onSuggestionSelectedPersonal = (_event: any, { suggestion }: any) => {
    this.setState(() => {
      const selectedPersonal = suggestion._id;
      console.log(selectedPersonal);

      return {
        selectedPersonal
      };
    });
  };

  onSuggestionsClearRequestedStudent = () => {
    this.setState(() => ({
      students: []
      // selectedStudent: null
    }));
  };

  onSuggestionsClearRequestedPatient = () => {
    this.setState(() => ({
      patients: []
      // selectedPatient: ""
    }));
  };

  onSuggestionsClearRequestedPersonal = () => {
    this.setState(() => ({
      personals: []
      // selectedPersonal: ""
    }));
  };

  onChangeStudent = (_event: any, { newValue }: any) => {
    this.setState(() => ({
      studentValue: newValue
    }));
  };

  onChangePersonal = (_event: any, { newValue }: any) => {
    this.setState(() => ({
      personalValue: newValue
    }));
  };

  onChangePatient = (_event: any, { newValue }: any) => {
    this.setState(() => ({
      patientValue: newValue
    }));
  };

  onSubmit = async () => {
    try {
      const data: IGeneratePasswordRequest = {
        tempPassword: {
          cedula: this.state.selectedStudent!.cedula,
          estudiante: this.state.selectedStudent!.id,
          paciente: this.state.selectedPatient!,
          profesor: this.state.selectedPersonal!
        }
      };

      const response = await this.tempPasswordService.generatePassword(data);

      this.setState(() => ({
        submitMessage:
          response.data.message +
          ". La contraseña es: " +
          response.data.data.contraseña
      }));
    } catch (e) {
      const error: AxiosError = e;
      console.log(error.response);
    }
  };

  render() {
    const {
      students,
      studentValue,
      personals,
      personalValue,
      patients,
      patientValue,
      submitMessage,
      selectedPersonal,
      selectedPatient,
      selectedStudent
    } = this.state;

    const inputPropsStudent = {
      value: studentValue,
      onChange: this.onChangeStudent
    };

    const inputPropsPersonal = {
      value: personalValue,
      onChange: this.onChangePersonal
    };

    const inputPropsPatient = {
      value: patientValue,
      onChange: this.onChangePatient
    };

    return (
      <Container>
        <h1>Asignar Paciente</h1>

        {!!submitMessage && <SubmitSuccess>{submitMessage}</SubmitSuccess>}

        <FormGroup>
          <Label>Ingrese el nombre del estudiante</Label>
          <Autosuggest
            suggestions={students}
            onSuggestionsFetchRequested={this.onSuggestionFetchRequestedStudent}
            onSuggestionsClearRequested={
              this.onSuggestionsClearRequestedStudent
            }
            getSuggestionValue={this.onGetSuggestionValueStudent}
            renderSuggestion={Suggestion}
            inputProps={inputPropsStudent}
            onSuggestionSelected={this.onSuggestionSelectedStudent}
            id={"student"}
          />
        </FormGroup>

        <FormGroup>
          <Label>Ingrese el nombre del profesor</Label>
          <Autosuggest
            suggestions={personals}
            onSuggestionsFetchRequested={
              this.onSuggestionFetchRequestedPersonal
            }
            onSuggestionsClearRequested={
              this.onSuggestionsClearRequestedPersonal
            }
            getSuggestionValue={this.onGetSuggestionValueStudent}
            renderSuggestion={Suggestion}
            inputProps={inputPropsPersonal}
            onSuggestionSelected={this.onSuggestionSelectedPersonal}
            id={"personal"}
          />
        </FormGroup>

        <FormGroup>
          <Label>Ingrese el nombre del paciente</Label>
          <Autosuggest
            suggestions={patients}
            onSuggestionsFetchRequested={this.onSuggestionFetchRequestedPatient}
            onSuggestionsClearRequested={
              this.onSuggestionsClearRequestedPatient
            }
            getSuggestionValue={this.onGetSuggestionValueStudent}
            renderSuggestion={Suggestion}
            inputProps={inputPropsPatient}
            onSuggestionSelected={this.onSuggestionSelectedPatient}
            id={"patient"}
          />
        </FormGroup>

        <SubmitButton
          disabled={!selectedPatient || !selectedPersonal || !selectedStudent}
          onClick={this.onSubmit}
        >
          Asignar Paciente
        </SubmitButton>
      </Container>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(AssignPatient);
