export interface Profesor {
  id: number;
  nombreCompleto: string;
  usuario: string;
  grupos?: Grupo[];
}

export interface Grupo {
  id_grupo: number;
  nombre: string;
  profesorId: number;
  salas?: Salas;
  alumnos?: Alumno[];
}

export interface Salas {
  id:            number;
  active:        boolean;
  gruposId:      number;
}

export interface Alumno {
  id:           number;
  nombre:       string;
  puntuaciones: Puntuacion[];
  grupos:       Grupo;
}

export interface AlumnosLogin {
  estudianteId:number;
  grupoId:number;
}

export interface Puntuacion {
  id?:                 number;
  puntuacionObtenida: number;
  nivel:              string;
  alumno_id:           number;
  grupo_id:           number;
}

export interface CheckScore {
  alumnoId: number;
  nivelNombre: string;
}
