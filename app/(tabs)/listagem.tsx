import { ScrollView, Text, StyleSheet } from 'react-native';

export default function Listagem() {
    return (
        <ScrollView style={styles.root}>
            <Text>Listagem</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
    }
});