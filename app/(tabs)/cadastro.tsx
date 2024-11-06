import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function Cadastro() {

  const [cadastrante, setCadastrante] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [dizimista, setDizimista] = useState('');

  const handleSave = () => {
    if (!cadastrante || !tipo || !valor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  };

  const [showDizimista, setShowDizimista] = useState(false);

  const verifyDizimo = (tipo: string) => {
    setTipo(tipo);
    if (tipo === 'dizimo') {
      setShowDizimista(true);
    } else {
      setShowDizimista(false);
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.label}>Obreiro:</Text>
        <TextInput
          style={styles.input}
          value={cadastrante}
          onChangeText={setCadastrante}
          placeholder="Nome do obreiro"
        />
        <Text style={styles.label}>Tipo:</Text>
        <RNPickerSelect
          style={{ inputAndroid: styles.input }}
          onValueChange={(valor) => verifyDizimo(valor)}
          items={[
            { label: 'Dizimo', value: 'dizimo' },
            { label: 'Oferta', value: 'oferta' },
          ]}
        />
        <Text style={styles.label}>Valor:</Text>
        <MaskInput
            style={styles.input}
            value={valor}
            onChangeText={(unmasked) => {setValor(unmasked)}}
            mask={Masks.BRL_CURRENCY}
            inputMode='numeric'
        />
        <View style={{ display: showDizimista ? 'flex' : 'none' }}>
          <Text style={styles.label}>Dizimista:</Text>
          <TextInput
            style={styles.input}
            value={dizimista}
            onChangeText={setDizimista}
            placeholder="Nome do dizimista"
            keyboardType='default'
          />
        </View>

        <View style={styles.button}>
          <Button title="Salvar" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
  },
  toolBar: {
    height: 50,
    backgroundColor: '#111111'
  },
  logo: {
    height: 70,
    backgroundColor: '#1E90FF',
    padding: 10,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50
  },
  container: {
    padding: 50
  },
  button: {
    position: 'relative',
    bottom: -20
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    height: 60,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingLeft: 18
  }
});