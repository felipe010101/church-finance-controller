import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Button, View } from 'react-native';
import { useEntradaDataBase, Entrada } from '@/database/useEntradaDataBase';

export default function Listagem() {

    const [entradas, setEntradas] = useState<Entrada[]>([]);

    const entradaDB = useEntradaDataBase();

    async function getEntradas() {
        try {
            const response = await entradaDB.getEntradas();
            setEntradas(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView style={styles.root}>
                <FlatList
                    data={entradas}
                    renderItem={({ item }) => (
                        <Text key={item.id}>{item.obreiro} - {item.tipo} - {item.valor} - {item.dizimista}</Text>
                    )}
                />
                
            </ScrollView>
            <Button title="Buscar entradas" onPress={getEntradas} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
    }
});