import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useMembers } from '../hooks/useMembers';

export default function OutstandingPaymentsScreen() {
  const { outstanding } = useMembers();
  const { t } = useTranslation();

  return (
    <FlatList
      data={outstanding}
      renderItem={({ item }) => (
        <Card>
          <Text>{item.member} - ${item.amount} - {item.dueDate}</Text>
          <Button title={`${t('remind')} (${item.reminds})`} />
        </Card>
      )}
    />
  );
}