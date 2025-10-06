import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import MembershipLevelScreen from './MembershipLevelScreen';
import WalletBalanceScreen from './WalletBalanceScreen';
import MonthlyCommissionScreen from './MonthlyCommissionScreen';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <Text>{t('home.title')}</Text>
      <MembershipLevelScreen />
      <WalletBalanceScreen />
      <MonthlyCommissionScreen />
    </ScrollView>
  );
}