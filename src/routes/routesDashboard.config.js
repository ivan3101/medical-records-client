import Resume from "../views/dashboard/student/resume/resume";
import resume from "../assets/icons/resume.svg";
import MedicalRecords from "../views/dashboard/student/medical-record/medicalRecords";
import Uploads from "../views/dashboard/student/uploads/uploads";

export const routesDashboardConfig = {
    student: [
        {
            name: 'Paciente',
            icon: resume,
            path: '/dashboard/resume',
            component: Resume
        },
        {
            name: 'Historial Medico',
            icon: null,
            path: '/dashboard/medical-records',
            component: MedicalRecords
        },
        {
            name: 'Mis subidas',
            icon: null,
            path: '/dashboard/uploads',
            component: Uploads
        }
    ],
    professor: [],
    archive: [],
};