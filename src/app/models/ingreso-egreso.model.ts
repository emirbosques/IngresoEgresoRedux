


export class IngresoEgreso {
    constructor(
        descripcion: string,
        monto: number,
        tipo: string,
        uid?: string
    ) { }
}

export interface IngresoEgresoInterface {
    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;
}