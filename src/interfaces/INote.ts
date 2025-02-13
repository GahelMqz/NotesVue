export interface Note {
  id: string
  title: string
  description: string
  tags: ('trabajo' | 'personal' | 'academico')[]
  createdAt: Date
}
