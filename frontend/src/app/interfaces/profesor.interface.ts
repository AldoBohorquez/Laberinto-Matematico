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
  salasId: number;
}
