import {Driver} from 'neo4j-driver'
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