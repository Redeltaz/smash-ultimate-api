export interface DatabaseResult {
    id: number;
}

export const isInstanceOfDatabaseResult = (object: Record<string, unknown>) => {
    return (
        "id" in object &&
        typeof(object.id) === "number"
    );
};