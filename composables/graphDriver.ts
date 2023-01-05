import neo4j from "neo4j-driver";

export const useDriver =  () => {
    return neo4j.driver(
        "neo4j+s://60318b06.databases.neo4j.io",
        neo4j.auth.basic("neo4j", "Cq-Of1FHfShywvyaq0RpAJaOmIHA6ZVPW9yB6UxxXs8")
      );
}

