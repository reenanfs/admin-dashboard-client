import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import GridBreak from 'components/Grid/GridBreak';
import DragAndDropUploadAvatar from 'components/avatars/DragAndDropUploadAvatar';
import { ValidationMessages } from 'constants/validationMessages';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CREATE_USER } from '../settingsQueries';

const userProfileValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
});

interface IUserProfileFields {
  name: string;
}

const UserProfile = (): JSX.Element => {
  const { user } = useCurrentUser();
  const [file, setFile] = useState<File | null>();

  const [createUser] = useMutation<{
    input: IUserProfileFields & { file: File; isAdmin: Boolean };
  }>(CREATE_USER);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserProfileFields>({
    mode: 'onChange',
    resolver: yupResolver(userProfileValidationSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  const onSubmit: SubmitHandler<IUserProfileFields> = async data => {
    console.log(data);
    console.log(file);
    await createUser({
      variables: {
        input: {
          name: data.name,
          isAdmin: false,
          photoFile: file,
        },
      },
    });
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 10,
          }}
        >
          <DragAndDropUploadAvatar onUpload={setFile} />
        </Grid>
        <Grid item xs={2}>
          <Paper
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              p: 2,
            }}
          >
            Name
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
              />
            )}
          />
        </Grid>
        <GridBreak sx={{ mb: 2 }} />
        <Grid item xs={2}>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
