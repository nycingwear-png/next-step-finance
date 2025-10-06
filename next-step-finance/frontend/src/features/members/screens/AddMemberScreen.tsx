import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Button } from 'react-native';
import QRCode from 'react-native-qrcode-scanner'; // For QR
import { useTranslation } from 'react-i18next';
import api from '../../../shared/services/api';

export default function AddMemberScreen() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', level: 'Regular', amount: '' });
  const { t } = useTranslation();

  const handleSubmit = async () => {
    await api.post('/user/members', form);
    // Generate QR for invite
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder={t('name')} value={form.name} onChangeText={v => setForm({...form, name: v})} />
      {/* Other fields */}
      <Picker selectedValue={form.level} onValueChange={v => setForm({...form, level: v})}>
        <Picker.Item label="Regular" value="Regular" />
        {/* Others */}
      </Picker>
      <Button title={t('submit')} onPress={handleSubmit} />
      <QRCode value="https://expo.dev/@yourapp" size={200} />
    </View>
  );
}