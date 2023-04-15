import { ApolloError, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import GridBreak from 'components/Grid/GridBreak';
import DragAndDropUploadAvatar from 'components/avatars/DragAndDropUploadAvatar';
import { ValidationMessages } from 'constants/validationMessages';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ICurrentUser } from 'types/authTypes';
import { USER_PROFILE_UPDATE_USER } from './userProfileQueries';
import {
  IUserProfileFields,
  userProfileUpdateUserResponse,
} from './userProfileTypes';

const userProfileValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
});

const UserProfile = (): JSX.Element => {
  const { user, setUser } = useCurrentUser();
  const [file, setFile] = useState<File | null>();
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const [userProfileUpdateUser, { data: userProfileUpdateUserData, loading }] =
    useMutation<
      { updateUser: userProfileUpdateUserResponse },
      { input: IUserProfileFields & { id: string; photoFile?: File | null } }
    >(USER_PROFILE_UPDATE_USER);

  useEffect(() => {
    if (userProfileUpdateUserData) {
      const {
        updateUser: { name, photoUrl },
      } = userProfileUpdateUserData;

      const updatedUser: ICurrentUser = {
        ...user!,
        name,
        photoUrl,
      };

      setUser(updatedUser);
    }
  }, [loading, userProfileUpdateUserData, setUser, user]);

  const onSubmit: SubmitHandler<IUserProfileFields> = async data => {
    try {
      await userProfileUpdateUser({
        variables: {
          input: {
            id: user!.id,
            name: data.name,
            photoFile: file,
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        let statusCode: number;
        let serverErrorMessage: string = '';

        if (error.graphQLErrors.length) {
          const { extensions } = error.graphQLErrors[0];

          statusCode = (extensions as { response: { statusCode: number } })
            .response.statusCode;

          serverErrorMessage = (extensions as { response: { message: string } })
            .response.message;
        } else {
          statusCode = 400;
        }

        switch (statusCode) {
          case 400:
            setErrorMessage(ValidationMessages.SERVER_BAD_REQUEST);
            break;
          default:
            setErrorMessage(serverErrorMessage);
        }
      } else {
        setErrorMessage('Unknown error');
      }
    }
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
        <Grid item xs={12}>
          <Button variant="contained" type="submit" sx={{ mb: 2 }}>
            Update
          </Button>
          {!!errorMessage && (
            <Paper
              sx={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '10px',
                border: '1px solid #f5c6cb',
                width: '100%',
                mb: 2,
                textAlign: 'center',
              }}
            >
              {errorMessage}
            </Paper>
          )}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
