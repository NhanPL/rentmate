import { TextField, TextFieldProps } from '@mui/material';
import { useState, ChangeEvent } from 'react';

interface CurrencyInputProps extends Omit<TextFieldProps, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  prefix?: string;
}

export default function CurrencyInput({ value = 0, onChange, prefix = ' ₫/month', ...props }: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(formatNumber(value));

  // 🔹 Hàm format số có dấu phẩy
  function formatNumber(num: number | string): string {
    if (num === null || num === undefined) return '';
    const str = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return str;
  }

  // 🔹 Xử lý khi nhập
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.replace(/[^\d]/g, ''); // chỉ giữ số
    const num = Number(input);
    setDisplayValue(formatNumber(input));
    onChange?.(num);
  }

  // 🔹 Khi người dùng dán (paste)
  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/[^\d]/g, '');
    const num = Number(paste);
    setDisplayValue(formatNumber(paste));
    onChange?.(num);
  }

  return (
    <TextField
      {...props}
      value={displayValue + prefix}
      onChange={handleChange}
      onPaste={handlePaste}
      fullWidth
      inputProps={{
        inputMode: 'numeric',
        style: { textAlign: 'right' },
      }}
    />
  );
}
