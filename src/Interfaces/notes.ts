
// La intefaz define el modelo de datos que tendra una nota
// notes.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[]; // Cambiamos de 'tag' a 'tags' y es un array
  date: Date;
}

