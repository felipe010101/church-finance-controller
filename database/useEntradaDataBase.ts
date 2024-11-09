import { useSQLiteContext } from "expo-sqlite";

export type Entrada = {
    id: number;
    obreiro: string;
    tipo: string;
    valor: number;
    dizimista: string;
    dataRegistro: string;
};

export function useEntradaDataBase() {

    const database = useSQLiteContext();

    async function saveEntrada(data: Omit<Entrada, 'id'>) { 

        const statement = await database.prepareAsync(
            'INSERT INTO entradav1 (obreiro, tipo, valor, dizimista, dataRegistro) VALUES ($obreiro, $tipo, $valor, $dizimista, $dataRegistro)'
        )

        try {
            const result = await statement.executeAsync({
                $obreiro: data.obreiro,
                $tipo: data.tipo,
                $valor: data.valor,
                $dizimista: data.dizimista,
                $dataRegistro: data.dataRegistro
            });

            const insertedRowId = result.lastInsertRowId.toLocaleString();

            return { insertedRowId }

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getEntradas() {
        const query = 'SELECT * FROM entradav1'

        try {
            return await database.getAllAsync<Entrada>(query);
        } catch (error) {
            throw error;
        }
    }    
    
    return { saveEntrada, getEntradas };
}