import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useHomeData } from '../hooks/useHomeData';

export default function WalletBalanceScreen() {
  const { data } = useHomeData();
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Content>
        <Text style={{ fontSize: 32, color: '#10B981' }}>${data.balance}</Text>
        <Text>{t('balance')}</Text>
        <FlatList
          data={data.transactions}
          keyExtractor={item => item.date}
          renderItem={({ item }) => <Text>{item.date} - ${item.amount} ({item.type})</Text>}
        />
        <TextInput placeholder={t('applyAmount')} />
        <Button title={t('apply')} />
      </Card.Content>
    </Card>
  );
}