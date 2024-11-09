import React, { useState } from 'react';
import { Text, StyleSheet, FlatList, Button, View, TouchableOpacity } from 'react-native';
import { useEntradaDataBase, Entrada } from '@/database/useEntradaDataBase';

export default function Listagem() {

    const [entradas, setEntradas] = useState<Entrada[]>([]);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

    const entradaDB = useEntradaDataBase();

    function formatToBRL(amountInCents: number): string {
        return (amountInCents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    const toggleExpand = (id: number) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

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
            <FlatList
                data={entradas}
                renderItem={({ item }) => {

                    const isExpanded = expandedItems.has(item.id);

                    return (
                        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                            <Text style={styles.item}>{item.dataRegistro.split('T')[0]}</Text>
                            {isExpanded && (
                                <View>
                                    <View style={styles.field}>
                                        <Text style={styles.headerText}>Obreiro</Text>
                                        <Text style={styles.cell}>{item.obreiro}</Text>
                                    </View>
                                    <View style={styles.field}>
                                        <Text style={styles.headerText}>Tipo</Text>
                                        <Text style={styles.cell}>{item.tipo}</Text>
                                    </View>
                                    <View style={styles.field}>
                                        <Text style={styles.headerText}>Valor</Text>
                                        <Text style={styles.cell}>{formatToBRL(item.valor)}</Text>
                                    </View>
                                    {item.tipo === 'dizimo' && (
                                        <View style={styles.field}>
                                            <Text style={styles.headerText}>Dizimista</Text>
                                            <Text style={styles.cell}>{item.dizimista}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                    </TouchableOpacity>    
                    );    
                }}
            />
            <Button title="Buscar entradas" onPress={getEntradas} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        backgroundColor: 'gray',
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 2,
        borderBlockColor: 'black',
        textAlign: 'center'
    },
    cell: {
        flex: 1,
        textAlign: 'center'
    },
    tableHeader: {
        justifyContent: 'space-between',
        backgroundColor: '#f1f1f1',
        padding: 10,
    },
    headerText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
});