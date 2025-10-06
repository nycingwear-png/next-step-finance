import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import api from '../../../shared/services/api';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { phone, code });
      // Save token
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert(t('error'), err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{t('login.phone')}</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <Text>{t('login.code')}</Text>
      <TextInput value={code} onChangeText={setCode} />
      <Button title={t('login.submit')} onPress={handleLogin} />
      <Button title={t('register')} onPress={() => navigation.navigate('Register')} />
    </View>
  );
}