import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useHomeData } from '../hooks/useHomeData';

const screenWidth = Dimensions.get('window').width;

export default function MonthlyCommissionScreen() {
  const { data } = useHomeData();
  const { t } = useTranslation();

  const chartData = {
    labels: data.commissions.map(c => c.month),
    datasets: [{ data: data.commissions.map(c => c.total) }],
    colors: [() => '#10B981']
  };

  return (
    <Card>
      <Card.Content>
        <Text>{t('currentMonth')}: {new Date().toLocaleString('default', { month: 'long' })}</Text>
        <Text style={{ fontSize: 24 }}>${data.commissions[0]?.total || 0}</Text>
        <LineChart data={chartData} width={screenWidth} height={220} chartConfig={{ backgroundColor: '#F3F4F6', color: () => '#1E3A8A' }} />
        <FlatList
          data={data.commissions[0]?.breakdown}
          renderItem={({ item }) => <Text>{item.from} - ${item.amount} ({item.date})</Text>}
        />
      </Card.Content>
    </Card>
  );
}