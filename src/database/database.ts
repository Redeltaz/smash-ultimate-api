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
    private _authToken: AuthToken;

    private readonly _dbHost: string;
    private readonly _dbUsername: string;
    private readonly _dbPassword: string;

    constructor(host: string, username: string, password: string) {
        this._dbHost = host;
        this._dbUsername = username;
        this._dbPassword = password;

        this._authToken = neo4j.auth.basic(this._dbUsername, this._dbPassword);

        this._openConnection();
    }

    private _openConnection(): void {
        this.driver = neo4j.driver(this._dbHost, this._authToken);
    }
}

const db = new Database(
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD
);

export default db;