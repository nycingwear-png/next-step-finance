import React from 'react';
import { View, Text, Button } from 'react-native';
import LanguageSelector from '../../shared/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ padding: 20 }}>
      <Text>{t('settings.title')}</Text>
      <LanguageSelector />
      <Button title={t('logout')} />
    </View>
  );
}