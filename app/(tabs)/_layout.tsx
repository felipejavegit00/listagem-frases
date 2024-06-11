import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen() {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      const translatedAdvice = await translateToPortuguese(data.slip.advice);
      setAdvice(translatedAdvice);
    } catch (error) {
      console.error('Erro ao buscar conselho:', error);
    }
  };

  const translateToPortuguese = async (englishText) => {
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishText)}&langpair=en|pt-BR`);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error('Erro ao traduzir texto:', error);
      return englishText; // Retorna o texto em inglês se a tradução falhar
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{advice}</Text>
      <Button title="Obter Novo Conselho" onPress={fetchAdvice} />
    </View>
  );
}
