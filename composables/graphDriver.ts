import { driver, auth } from 'neo4j-driver'

export const useDriver = () => {
  const neo4jDriver = driver(
    'bolt://db.sandigan.org:7687',
    auth.basic('neo4j', 'sandigan_thesis'),
    { trust: 'TRUST_ALL_CERTIFICATES' }
  )
  console.log(neo4jDriver)
  return neo4jDriver
}
