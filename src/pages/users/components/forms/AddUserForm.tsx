import { Box, TextField, Grid, MenuItem } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ValidationMessages } from 'constants/validationMessages';
import { ADD_FORM_ID } from 'constants/componentConstants';
import {
  IUserToProjectCreationInput,
  IUsersPageRoles,
} from 'pages/users/usersTypes';
import { useQuery } from '@apollo/client';
import { GET_USERS_PAGE_ROLES } from 'pages/users/usersQueries';

interface IUserFormProps {
  onSubmit: SubmitHandler<IUserToProjectCreationInput>;
}

const UserValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  roleId: yup.string().required(ValidationMessages.REQUIRED),
});

const AddUserForm = ({ onSubmit }: IUserFormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserToProjectCreationInput>({
    resolver: yupResolver(UserValidationSchema),
    defaultValues: {
      name: '',
      roleId: '',
    },
  });

  const { loading, data } = useQuery<IUsersPageRoles>(GET_USERS_PAGE_ROLES, {
    fetchPolicy: 'cache-and-network',
  });

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
      id={ADD_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
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

export default AddUserForm;
