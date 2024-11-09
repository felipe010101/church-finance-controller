import { type SQLiteDatabase } from "expo-sqlite";

export async function initDataBase(database: SQLiteDatabase) {

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS entradav1 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            obreiro TEXT NOT NULL,
            tipo TEXT NOT NULL,
            valor DOUBLE NOT NULL,
            dizimista TEXT,
            dataRegistro TEXT NOT NULL
        );
    `);

}