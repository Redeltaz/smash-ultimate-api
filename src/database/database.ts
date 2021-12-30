import neo4j from "neo4j-driver";
import dotenv from "dotenv";
import { 
    Driver,
    AuthToken,
} from "neo4j-driver";

dotenv.config();

const DB_HOST = process.env.DB_HOST as string;
const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

class Database {
    public driver: Driver;
    private authToken: AuthToken;

    private readonly dbHost: string;
    private readonly dbUsername: string;
    private readonly dbPassword: string;

    constructor(host: string, username: string, password: string) {
        this.dbHost = host;
        this.dbUsername = username;
        this.dbPassword = password;

        this.authToken = neo4j.auth.basic(this.dbUsername, this.dbPassword);

        this.__openConnection();
    }

    private __openConnection(): void {
        this.driver = neo4j.driver(this.dbHost, this.authToken);
    }
}

const db = new Database(
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD
);

export default db;