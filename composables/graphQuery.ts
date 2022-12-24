import {Driver} from 'neo4j-driver'
import TableContent from 'types/tables'
export const useGraphQuery =  async(driver: Driver, query: String): Promise<Array<any>> => {
    const session = driver.session();
    const output = await session.executeRead(async (tx: any) => {
        const graphTransaction = await tx.run(query);
        return graphTransaction.records.map((item: any) => {
            return item.get(0).properties;
        });        
    });
    await session.close();
    return output
}

export const createTableContent = async(juris: Promise<any[]>, graphDriver: Driver): TableContent[] => {
  const output = await Promise.all((await juris)
  .map(async(item: Array<any>) => {
    const tags = (await useGraphQuery(graphDriver, queryTags(item.unique_id)))
    .map((tag) => {
      return tag.Title
    })
    return {
      title: item.name,
      link: item.unique_id,
      tags: tags,
      date: item.month+"-"+item.day+"-"+item.year
    }
  })
  )
  return output
} 
export const queryLatest = () => {
    return `
    MATCH (juris :Juris)
    return juris

    order by juris.year
    desc
    limit 10;
    `
}
export const querySearch = (search :String) => {
    return `
    MATCH (juris :Juris {name: "` +search+`"})
    return juris
    order by juris.year
    desc
    limit 10;
    `
}
export const queryTags = (juris :String) => {
  return  `
    Match (:Juris {unique_id:` +
      juris +
      `}) -- (n) 
    Return n
    Limit 10  
  `
  

}