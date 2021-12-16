import db from "../../database/database";
import { Record as RecordNeo4j } from "neo4j-driver";
import { objectToString } from "../../utils";
import { isInstanceOfDatabaseResult } from "../../interfaces";

class CRUDBase {
    protected readonly label: string;

    constructor(label: string) {
        this.label = label;
    }

    public async get(id: number): Promise<unknown> {
        const session = db.driver.session();
        try {
            const { records } = await session.run(`MATCH (n:${this.label}) WHERE n.id = ${id} RETURN n`);
            session.close();

            // parsing what neo4j return
            const result = records[0].get("n").properties;
            result.id = result.id.low;

            if(isInstanceOfDatabaseResult(result)) {
                return result;
            } else {
                throw "What the database return don't look like a real database result";
            }
        }
        catch(error: unknown) {
            console.log(error);

            return error;
        }
    }

    public async getMulti(): Promise<unknown> {
        const session = db.driver.session();
        try {
            const { records } = await session.run(`MATCH (n:${this.label}) RETURN n`);
            session.close();

            // parsing what neo4j return
            let result = records.map((record: RecordNeo4j) => {
                const properties = record.get("n").properties;
                properties.id = properties.id.low;
                return properties;
            });

            result = result.filter((result: Record<string, unknown>) => {
                if(isInstanceOfDatabaseResult(result)){
                    return result;
                }else {
                    console.log(`Object ${result.id} was remove from the array because it didn't look like a database result`);
                }
            });

            return result;
        }
        catch(error: unknown) {
            console.log(error);

            return error;
        }
    }

    public async post(params: Record<string, unknown>): Promise<unknown> {
        const session = db.driver.session();
        try {
            const parsedParams = objectToString(params);

            const { records } = await session.run(`CREATE (n:${this.label}) SET n = ${parsedParams}, n.id = id(n) RETURN n`);
            session.close();

            const result = records[0].get("n").properties;

            return result;
        }
        catch(error) {
            console.error(error);

            return error;
        }
    }
}

export default CRUDBase;