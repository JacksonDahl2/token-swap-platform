import z from "zod"
import dotenv from 'dotenv';

class InvalidEnvironment extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidEnvironment'
  }
}

// expand this as needed
const envSchema = z.object({
  FUNKIT_API_KEY: z.string(),

  // for logger
  NODE_ENV: z.string().optional()
})

dotenv.config();

const settings = () => {
  const parsedEnvironemnt = envSchema.safeParse(process.env)

  if (parsedEnvironemnt.success) {
    return parsedEnvironemnt.data;
  }

  return new InvalidEnvironment(parsedEnvironemnt.error.message);
}

export default settings;