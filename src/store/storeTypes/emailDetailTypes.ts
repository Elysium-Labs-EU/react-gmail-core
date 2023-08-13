import { z } from 'zod'

const EmailDetailState = z.object({
  coreStatus: z.string().nullable(),
  currEmail: z.string(),
  fetchStatus: z.enum(['idle', 'pending', 'fulfilled', 'rejected']),
  sessionViewIndex: z.number(),
  viewIndex: z.number(),
})

export type TEmailDetailState = z.infer<typeof EmailDetailState>
