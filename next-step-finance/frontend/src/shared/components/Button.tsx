import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

export default function CustomButton({ children, mode = 'contained', ...props }) {
  return <PaperButton mode={mode} {...props}>{children}</PaperButton>;
}