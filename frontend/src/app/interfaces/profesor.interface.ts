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
}

export interface Salas {
  id:            number;
  active:        boolean;
  gruposId:      number;
}
