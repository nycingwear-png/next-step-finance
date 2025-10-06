import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/shared/services/i18n';
import AppNavigator from './src/shared/navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper'; // For UI theme
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#1E3A8A',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F3F4F6',
    surface: '#FFFFFF',
    text: '#111827',
    error: '#DC2626',
  },
};

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </I18nextProvider>
  );
}