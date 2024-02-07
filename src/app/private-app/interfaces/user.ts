import { Catalogo } from "./catalogo"

export interface User {
  id: number
  identificacion: string
  nombre_completo: string
  email: string
  email_verified_at: string
  tipo_catalogo: Catalogo
  estado_id: number
  created_at: string
  updated_at: string
}
