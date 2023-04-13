import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { useCurrentUser } from 'hooks/useCurrentUser';

interface DragAndDropUploadAvatarProps {
  onUpload: (file: File | null) => void;
}

const DragAndDropUploadAvatar = ({
  onUpload,
}: DragAndDropUploadAvatarProps) => {
  const [imageUrl, setimageUrl] = useState<string | null>(null);
  const { user } = useCurrentUser();

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = await getImageUrl(file);
      setimageUrl(url);
      onUpload(file);
    }
  };

  const handleSelectFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = await getImageUrl(file);
      setimageUrl(url);
      onUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setimageUrl(null);
    onUpload(null);
  };

  const getImageUrl = (file: File): Promise<string> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeButtonHeight = 36;

  useEffect(() => {
    if (user?.photoUrl) {
      console.log('aff');
      setimageUrl(user?.photoUrl);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onDragLeave={e => e.preventDefault()}
    >
      <Avatar
        sx={{
          width: 200,
          height: 200,
          mb: 2,
          ...(imageUrl && { border: '4px solid', borderColor: 'primary.main' }),
        }}
        src={imageUrl || undefined}
      >
        {user?.name}
      </Avatar>

      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        {imageUrl ? 'Change Image' : 'Upload Image'}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelectFile}
        />
      </Button>
      <Box
        sx={{
          height: removeButtonHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {imageUrl && (
          <Button variant="contained" color="error" onClick={handleRemoveImage}>
            Remove Image
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DragAndDropUploadAvatar;
