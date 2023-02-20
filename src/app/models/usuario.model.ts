// MODELO DE USUARIO 
export class Usuario {
    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
    ) { }
}

export interface UserInterface {
    uid: string;
    nombre: string;
    email: string;
};
export interface UserRegistration {
    nombre: string;
    mail: string;
    password: string;
};