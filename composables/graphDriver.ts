import { driver, auth } from 'neo4j-driver'

export const useDriver = () => {
  const neo4jDriver = driver(
    'bolt+s://db.sandigan.org:7687',
    auth.basic('neo4j', 'sandigan_thesis')
  )
  console.log(neo4jDriver)
  return neo4jDriver
}
