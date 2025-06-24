import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, TouchableOpacity, Button } from 'react-native';
import { TonConnectButton, TonConnectUIProvider, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

// Манифест для подключения к TON
const manifestUrl = 'https://raw.githubusercontent.com/dikanevn/TB/main/public/tonconnect-manifest.json';

const SendTransactionButton = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const handleSendTransaction = () => {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      messages: [
        {
          address: 'UQAGqaglR0Unk6gbfTGQDC07sLuOmw2ogQ8BejG-j4wMWtQG',
          amount: '100000', // 0.0001 TON in nanotons
        },
      ],
    };

    tonConnectUI.sendTransaction(transaction)
      .then(() => {
        console.log('Transaction sent successfully');
      })
      .catch((error) => {
        console.error('Transaction error:', error);
      });
  };

  if (!wallet) {
    return null;
  }

  return (
    <View style={styles.buttonContainer}>
        <Button title="Отправить 0.0001 TON" onPress={handleSendTransaction} color="#007AFF" />
    </View>
  );
};

export default function App(): React.JSX.Element {
  useEffect(() => {
    // Инициализация Telegram Web App только для веб-платформы
    if (Platform.OS === 'web' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <View style={styles.container}>
        <Text style={styles.text}>v21</Text>
        {Platform.OS === 'web' && (
          <>
            <View style={styles.buttonContainer}>
              <TonConnectButton />
            </View>
            <SendTransactionButton />
          </>
        )}
        <StatusBar style="light" />
      </View>
    </TonConnectUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  }
});
