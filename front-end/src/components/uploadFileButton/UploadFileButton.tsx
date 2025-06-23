import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button } from '@mui/material';
import React, { useRef, useState } from 'react';

interface UploadButtonProps {
  onFileChange: (file: File) => void;
  accept?: string;
  previewImg?: boolean;
}

const UploadFileButton: React.FC<UploadButtonProps> = ({ onFileChange, accept = '*', previewImg = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileChange(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Button variant="contained" startIcon={<UploadFileIcon />} onClick={handleClick}>
        Chọn file
      </Button>
      <input type="file" accept={accept} ref={inputRef} onChange={handleFileChange} hidden />
      {previewImg && previewUrl && (
        <Box mt={1} mb={3}>
          <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} />
        </Box>
      )}
    </Box>
  );
};

export default UploadFileButton;
