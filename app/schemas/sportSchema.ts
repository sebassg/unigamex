// schemas/sportSchema.ts
import { z } from 'zod';

export const sportSchema = z.object({
  sportName: z
    .string()
    .min(1, { message: 'El nombre del deporte es requerido' })
    .max(100, { message: 'El nombre del deporte no puede exceder los 100 caracteres' })
    .regex(/^[A-Za-z0-9\s]+$/, { message: 'El nombre solo puede contener letras, números y espacios' }),

  category: z.enum(['Individual', 'En equipo'], { message: 'La categoría debe ser "Individual" o "En equipo"' }),

  maxParticipants: z
    .number()
    .min(2, { message: 'El número máximo de participantes debe ser mayor a 0' }),

  status: z.enum(['Activo', 'Inactivo'], { message: 'El estado debe ser "Activo" o "Inactivo"' }),
  
});
