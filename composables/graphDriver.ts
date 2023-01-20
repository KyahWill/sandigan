import { driver, auth } from 'neo4j-driver'

export const useDriver = () => {
  const neo4jDriver = driver(
    'bolt://159.65.141.247:7687',
    auth.basic('neo4j', 'sandigan_thesis'),
    { encrypted: 'ENCRYPTION_OFF' }
  )
  console.log(neo4jDriver)
  return neo4jDriver
}
