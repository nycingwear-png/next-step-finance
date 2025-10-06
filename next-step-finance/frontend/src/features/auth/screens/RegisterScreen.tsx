import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import api from '../../../shared/services/api';

export default function RegisterScreen() {
  const [form, setForm] = useState({ phone: '', firstName: '', lastName: '', idNumber: '', address: '', employment: false, industry: '', workAddress: '', guarantorPhone: '', email: '', hasLicense: false });
  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);
  const [holderPhoto, setHolderPhoto] = useState(null);
  const [code, setCode] = useState('');
  const { t } = useTranslation();

  const pickImage = async (setter) => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setter(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (frontId) formData.append('frontId', { uri: frontId, type: 'image/jpeg', name: 'front.jpg' });
    // Similar for others
    formData.append('code', code);

    try {
      await api.post('/auth/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      Alert.alert(t('success'), t('register.success'));
    } catch (err) {
      Alert.alert(t('error'), err.message);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>{t('register.phone')}</Text>
      <TextInput value={form.phone} onChangeText={v => setForm({...form, phone: v})} />
      {/* Repeat for all fields */}
      <Text>{t('register.frontId')}</Text>
      <Button title={t('upload')} onPress={() => pickImage(setFrontId)} />
      {/* Similar for back, holder */}
      <Text>{t('register.hasLicense')}</Text>
      <Switch value={form.hasLicense} onValueChange={v => setForm({...form, hasLicense: v})} />
      <Text>{t('register.code')}</Text>
      <TextInput value={code} onChangeText={setCode} />
      <Button title={t('submit')} onPress={handleSubmit} />
    </ScrollView>
  );
}