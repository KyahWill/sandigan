import { Driver } from 'neo4j-driver'
import TableContent from 'types/tables'
export const useGraphQuery = async (driver: Driver, query: String): Promise<Array<any>> => {
  const session = driver.session()
  let output
  try {
    output = await session.executeRead(async (tx: any) => {
      const graphTransaction = await tx.run(query)
      console.log('Graph Transaction ' + graphTransaction)
      return graphTransaction.records.map((item: any) => {
        return item.get(0).properties
      })
    })
  } catch (error) {
    console.log('Error when creating outputs: ' + error)
  }

  await session.close()
  return output
}
export const useGraphQueryExperiment = async (driver: Driver, query: String): Promise<Array<TableContent>> => {
  let session
  try {
    session = driver.session()
  } catch (error) {
    console.log(error)
    return []
  }
  console.log(session)
  let output
  try {
    output = await session.executeRead(async (tx: any) => {
      const graphTransaction = await tx.run(query)
      return graphTransaction.records.map((item: any) => {
        const properties = item.get(0).properties
        console.log(properties)
        return {
          title: properties.name,
          link: String(properties.unique_id),
          tags: item.get(1),
          date: properties.month + '-' + properties.day + '-' + properties.year
        }
        // [item.get(0).properties, item.get(1)];
      })
    })
  } catch (error) {
    console.log(error)
  }

  await session.close()
  return output
}

export const queryLatestExperiment = (page: number, limit = 10) => {
  return `
  MATCH (juris :Juris) 
  with juris 
  Order by juris.year desc, juris.month desc, juris.day desc 
  Skip ` + String(page * limit) + ' LIMIT ' + String(limit) + `
  OPTIONAL MATCH (juris) --> (legTerm :legalTerm)
  return juris, collect(legTerm.title)
  `
}

export const queryNodeId = (id: String) => {
  return `
  MATCH (j :Juris {unique_id:'` + id + `'})
  RETURN j
  `
}

export const querySearch = (search :String) => {
  return `
    MATCH (juris :Juris)
    WHERE juris.name  CONTAINS '` + search + `'
    with juris Order by juris.year desc limit 10
    OPTIONAL MATCH (juris) --> (legTerm :legalTerm)
    return juris, collect(legTerm.title)
    `
}
// export const queryTags = (juris :String) => {
//   return  `
//     Match (:Juris {unique_id:` +
//       juris +
//       `}) -- (n)
//     Return n
//     Limit 10
//   `

// }
// export const createTableContent = async(juris: Promise<any[]>, graphDriver: Driver): TableContent[] => {
//   const output = await Promise.all((await juris)
//   .map(async(item: Array<any>) => {
//     const tags = (await useGraphQuery(graphDriver, queryTags(item.unique_id)))
//     .map((tag) => {
//       return tag.Title
//     })
//     return {
//       title: item.name,
//       link: String(item.unique_id),
//       tags: tags,
//       date: item.month+"-"+item.day+"-"+item.year
//     }
//   })
//   )
//   return output
// }
