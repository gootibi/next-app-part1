import { z } from "zod";

// Using ZOD whit validation
const schema = z.object({
    name: z.string().min(3),
    // email: z.string().email(),
    // age: z.number(),
})

export default schema;