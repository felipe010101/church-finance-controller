import { type SQLiteDatabase } from "expo-sqlite";

export async function initDataBase(database: SQLiteDatabase) {

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            obreiro TEXT NOT NULL,
            tipo TEXT NOT NULL,
            valor DOUBLE NOT NULL,
            dizimista TEXT
        );
    `);

}