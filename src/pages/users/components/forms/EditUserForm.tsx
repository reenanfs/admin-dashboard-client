import { Box, TextField, Grid, MenuItem } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ValidationMessages } from 'constants/validationMessages';

import { EDIT_FORM_ID } from 'constants/componentConstants';
import {
  IUserRows,
  IUserToProjectUpdateInput,
  IUsersPageRoles,
} from 'pages/users/usersTypes';
import { useQuery } from '@apollo/client';
import { GET_USERS_PAGE_ROLES } from 'pages/users/usersQueries';
import { useEffect } from 'react';
import { useCurrentUser } from 'hooks/useCurrentUser';

interface IUserFormProps {
  onSubmit: SubmitHandler<IUserToProjectUpdateInput>;
  defaultValues: IUserRows;
}

const UserValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  roleId: yup.string().required(ValidationMessages.REQUIRED),
});

const EditUserForm = ({
  onSubmit,
  defaultValues: { id, name, roleId },
}: IUserFormProps): JSX.Element => {
  const { currentUser } = useCurrentUser();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Omit<IUserToProjectUpdateInput, 'id' | 'projectId'>>({
    resolver: yupResolver(UserValidationSchema),
    defaultValues: {
      name,
      roleId: '',
    },
  });

  const { loading, data } = useQuery<IUsersPageRoles>(GET_USERS_PAGE_ROLES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!loading && roleId) {
      setValue('roleId', roleId);
    }
  }, [setValue, roleId, loading]);

  const renderSelectOptions = (): JSX.Element[] | JSX.Element => {
    if (!loading && data) {
      const { roles } = data;

      return roles.map(role => (
        <MenuItem value={role.id} key={role.id}>
          {role.name}
        </MenuItem>
      ));
    }

    return <MenuItem value="" key=""></MenuItem>;
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      id={EDIT_FORM_ID}
      onSubmit={handleSubmit(data =>
        onSubmit({ id, projectId: currentUser?.currentProjectId!, ...data })
      )}
    >
      <Grid container direction="column" rowSpacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                size="small"
                {...field}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <TextField
                label="Role"
                size="small"
                id="Role"
                select
                fullWidth
                {...field}
                helperText={!!errors.roleId && errors.roleId.message}
                error={!!errors.roleId}
              >
                {renderSelectOptions()}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserForm;
