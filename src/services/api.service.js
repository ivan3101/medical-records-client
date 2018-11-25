const baseUrl = process.env.REACT_APP_API_URL;

export const authEndPoints = {
    'loginStudent': `${baseUrl}/auth/student`,
    'loginPersonal': `${baseUrl}/auth/personal`
};