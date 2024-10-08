import { z } from 'zod';
import { formSchema } from '../schemas/formSchema';

export type formType = z.infer<typeof formSchema>;
