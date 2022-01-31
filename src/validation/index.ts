import { ObjectSchema } from 'joi';
import { registerSchema } from './registerSchema';

export default {
  register: registerSchema,
} as { [key: string]: ObjectSchema };
