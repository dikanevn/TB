import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

// Манифест для подключения к TON
const manifestUrl = 'https://raw.githubusercontent.com/dikanevn/TB/main/public/tonconnect-manifest.json';

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
          <View style={styles.buttonContainer}>
            <TonConnectButton />
          </View>
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
