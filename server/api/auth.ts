import { readBody, H3Event, getMethod } from 'h3'

export default async (req: H3Event) => {
  if (getMethod(req) !== 'POST') { return 'Must be post request' }

  const { user } = await readBody(req) // only for POST request

  // @ts-ignore
  req.user = user
  return { updated: true }
}
