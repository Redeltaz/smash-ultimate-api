import db from "../../database/database";
import { Record as RecordNeo4j } from "neo4j-driver";
import { objectToString } from "../../utils";

class CRUDBase<ReturnDBType, ParamsDBType> {
    protected readonly label: string;

    constructor(label: string) {
        this.label = label;
    }

    public async get(id: number): Promise<ReturnDBType | boolean | unknown> {
        const session = db.driver.session();
        try {
            const { records } = await session.run(`MATCH (n:${this.label}) WHERE n.id = ${id} RETURN n`);
            session.close();
            
            if (!records.length) return false;
            
            // parsing what neo4j return
            const result = records[0].get("n").properties;
            result.id = result.id.low;

            return result;
        }
        catch(error: unknown) {
            return error;
        }
    }

    public async getMulti(): Promise<ReturnDBType | boolean | unknown> {
        const session = db.driver.session();
        try {
            const { records } = await session.run(`MATCH (n:${this.label}) RETURN n`);
            session.close();

            if (!records.length) return false;

            // parsing what neo4j return
            const result = records.map((record: RecordNeo4j) => {
                const properties = record.get("n").properties;
                properties.id = properties.id.low;
                return properties;
            });

            return result;
        }
        catch(error: unknown) {
            return error;
        }
    }

    public async post(params: ParamsDBType): Promise<ReturnDBType | unknown> {
        const session = db.driver.session();
        try {
            const parsedParams = objectToString(params);

            const { records } = await session.run(`CREATE (n:${this.label}) SET n = ${parsedParams}, n.id = id(n) RETURN n`);
            session.close();

            const result = records[0].get("n").properties;

            return result;
        }
        catch(error) {
            return error;
        }
    }
}

export default CRUDBase;