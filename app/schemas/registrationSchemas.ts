import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio').max(50, 'El nombre no puede superar los 50 caracteres').regex(/^[a-zA-Z]+$/, 'El nombre solo puede contener letras'),
  lastName: z.string().min(1, 'El apellido es obligatorio').max(50, 'El apellido no puede superar los 50 caracteres').regex(/^[a-zA-Z]+$/, 'El apellido solo puede contener letras'),
  email: z.string().email('Por favor, ingrese un correo electrónico válido'),
  idNumber: z.string().regex(/^\d+$/, 'El número de identificación solo debe contener números'), 
  career: z.string().max(100, 'La carrera no puede superar los 100 caracteres'),
  birthDate: z.string().refine(date => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 16;
  }, 'Debe ser mayor de 16 años'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
    .regex(/[!@#$%^&*]/, 'La contraseña debe contener al menos un carácter especial'),
});

export type FormData = z.infer<typeof registrationSchema>;
