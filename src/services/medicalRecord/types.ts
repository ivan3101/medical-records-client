export interface IAddMedicalRecordRequest {
  patientId: string;
  historiaMedica: FormData;
}

export interface IModifyMedicalRecordRequest {
  patientId: string;
  historiaMedica: FormData;
}
