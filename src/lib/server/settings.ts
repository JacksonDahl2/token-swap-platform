import z from "zod"

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

const settings = () => {
  const parsedEnvironemnt = envSchema.safeParse(process.env)

  if (parsedEnvironemnt.success) {
    return parsedEnvironemnt.data;
  }

  return new InvalidEnvironment(parsedEnvironemnt.error.message);
}

export default settings;