export class AppSettings {
    endpointUri: string = 'https://localhost:5001/';
    GoogleSettings : GoogleSettings = new GoogleSettings();
}

export class GoogleSettings {
    clientId: string = '953957970538-lvlb6rm2u93chd3p3ba1skecho6j2el7.apps.googleusercontent.com';
    scope : string = 'https://www.googleapis.com/auth/userinfo.email';
}