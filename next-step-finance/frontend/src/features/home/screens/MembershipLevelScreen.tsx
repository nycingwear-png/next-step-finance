import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Badge } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useHomeData } from '../hooks/useHomeData';

const levelColors = {
  Regular: '#10B981',
  Silver: '#F59E0B',
  Gold: '#D97706',
  Diamond: '#1E3A8A',
  Platinum: '#059669'
};

export default function MembershipLevelScreen() {
  const { data } = useHomeData();
  const { t } = useTranslation();
  const color = levelColors[data.level] || '#10B981';

  return (
    <Card>
      <Card.Content>
        <Image source={{ uri: 'avatar' }} style={{ width: 50, height: 50 }} />
        <Text>{data.level}</Text>
        <Badge style={{ backgroundColor: color }}>{data.level}</Badge>
        <Text>{t('upgrade', { next: 'Silver', req: '100 members' })}</Text>
      </Card.Content>
    </Card>
  );
}