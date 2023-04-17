import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Tooltip,
} from '@mui/material';
import * as yup from 'yup';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_PROJECT_MANAGEMENT_DATA,
  DELETE_PROJECT_MANAGEMENT_DATA,
  GET_PROJECT_MANAGEMENT_DATA,
  UPDATE_CURRENT_PROJECT_MANAGEMENT_DATA,
  UPDATE_PROJECT_MANAGEMENT_DATA,
} from './projectManagementQueries';
import {
  ICreateAndUpdateProjectFields,
  ICreateProjectInput,
  IDeleteProjectInput,
  IDeleteProjectResponse,
  IPMProjectsOwned,
  IProjectManagementData,
  IUpdateCurrentProjectInput,
  IUpdateCurrentProjectResponse,
  IUpdateProjectInput,
  currentProjectListItem,
  projectsOwnedListItem,
} from './projectManagementTypes';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { CURRENT_PROJECT_TOOLTIP } from './projectManagementConstants';
import { ValidationMessages } from 'constants/validationMessages';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { areObjectsEqual } from 'utils/areObjectsEqual';
import ErrorPaper from 'components/papers/ErrorPaper';
import SuccessPaper from 'components/papers/SuccessPaper';

const projectManagementValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
});

// Render the component
const ProjectManager = () => {
  // Declare state variables
  const { currentUser, updateCurrentUser } = useCurrentUser();
  const [currentProjectsList, setCurrentProjectsList] = useState<
    currentProjectListItem[]
  >([]);
  const [projectsOwnedList, setProjectsOwnedList] = useState<
    projectsOwnedListItem[]
  >([]);
  const [currentProjectId, setCurrentProjectId] = React.useState('');
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [currentProjectErrorMessage, setCurrentProjectErrorMessage] =
    useState<string>('');
  const [currentProjectSuccessMessage, setCurrentProjectSuccessMessage] =
    useState<string>('');
  const [createEditProjectErrorMessage, setCreateEditProjectErrorMessage] =
    useState<string>('');
  const [previousValues, setPreviousValues] =
    useState<ICreateAndUpdateProjectFields>({
      name: '',
      description: '',
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ICreateAndUpdateProjectFields>({
    mode: 'onChange',
    resolver: yupResolver(projectManagementValidationSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { data: projectManagementData, loading } =
    useQuery<IProjectManagementData>(GET_PROJECT_MANAGEMENT_DATA, {
      variables: {
        input: {
          id: currentUser?.id,
        },
      },
    });

  const [createProject] = useMutation<
    { createProject: IPMProjectsOwned },
    { input: ICreateProjectInput }
  >(CREATE_PROJECT_MANAGEMENT_DATA, {
    refetchQueries: [
      {
        query: GET_PROJECT_MANAGEMENT_DATA,
        variables: {
          input: {
            id: currentUser?.id,
          },
        },
      },
    ],
    onError: error => {
      handleMutationError(error, setCreateEditProjectErrorMessage);
    },
  });

  const [updateProject] = useMutation<
    { updateProject: IPMProjectsOwned },
    { input: IUpdateProjectInput }
  >(UPDATE_PROJECT_MANAGEMENT_DATA, {
    refetchQueries: [
      {
        query: GET_PROJECT_MANAGEMENT_DATA,
        variables: {
          input: {
            id: currentUser?.id,
          },
        },
      },
    ],
    onError: error => {
      handleMutationError(error, setCreateEditProjectErrorMessage);
    },
  });

  const [deleteProject] = useMutation<
    { deleteProject: IDeleteProjectResponse },
    { input: IDeleteProjectInput }
  >(DELETE_PROJECT_MANAGEMENT_DATA, {
    refetchQueries: [
      {
        query: GET_PROJECT_MANAGEMENT_DATA,
        variables: {
          input: {
            id: currentUser?.id,
          },
        },
      },
    ],
    onError: error => {
      handleMutationError(error, setCreateEditProjectErrorMessage);
    },
  });

  const [updateCurrentProject] = useMutation<
    { updateUser: IUpdateCurrentProjectResponse },
    { input: IUpdateCurrentProjectInput }
  >(UPDATE_CURRENT_PROJECT_MANAGEMENT_DATA, {
    onCompleted: data => {
      const {
        updateUser: {
          currentProject: { id: currentProjectId },
        },
      } = data;

      updateCurrentUser('currentProjectId', currentProjectId);
      setCurrentProjectSuccessMessage('Current project successfully updated.');
    },
    onError: error => {
      handleMutationError(error, setCurrentProjectErrorMessage);
    },
  });

  const handleMutationError = (
    error: ApolloError,
    setErrorMessageFn: (value: React.SetStateAction<string>) => void
  ): void => {
    const { extensions } = error.graphQLErrors[0];
    let statusCode = (extensions as { response: { statusCode: number } })
      .response.statusCode;

    let serverErrorMessage = (extensions as { response: { message: string } })
      .response.message;

    switch (statusCode) {
      case 401:
        setErrorMessageFn(ValidationMessages.SERVER_INVALID_CREDENTIALS);
        break;
      case 400:
        setErrorMessageFn(ValidationMessages.SERVER_BAD_REQUEST);
        break;
      default:
        setErrorMessageFn(serverErrorMessage);
    }
  };

  useEffect(() => {
    if (!loading && projectManagementData) {
      const { projectsOwned, projectMemberships } = projectManagementData.user;
      setProjectsOwnedList([
        ...projectsOwned.map(project => ({
          ...project,
          deleting: false,
          editing: false,
        })),
      ]);
      setCurrentProjectsList([
        ...projectsOwned.map(({ id, name }) => ({ id, name })),
        ...projectMemberships.map(({ project: { id, name } }) => ({
          id,
          name,
        })),
      ]);
      setCurrentProjectId(currentUser?.currentProjectId!);
    }
  }, [loading, projectManagementData, currentUser]);

  // Handle the form submit event
  const onSubmit: SubmitHandler<ICreateAndUpdateProjectFields> = async data => {
    const { name, description } = data;

    if (editing && areObjectsEqual(previousValues, data)) {
      reset();
      setEditing(false);
      setProjectsOwnedList(prevList =>
        prevList.map(project =>
          project.id === editId ? { ...project, editing: false } : project
        )
      );
      return;
    }

    if (editing) {
      updateProject({
        variables: { input: { id: editId, name, description } },
      });
    } else {
      createProject({
        variables: {
          input: { name, description, ownerId: currentUser?.id! },
        },
      });
    }

    reset();
    setEditing(false);
  };

  // Handle the edit button click event
  const handleEdit = (id: string, name: string, description: string) => {
    setEditId(id);
    setValue('name', name);
    setValue('description', description);
    setEditing(true);

    setProjectsOwnedList(prevList =>
      prevList.map(project =>
        project.id === id ? { ...project, editing: true } : project
      )
    );

    setPreviousValues({
      name,
      description,
    });
  };

  const handleCancelEditing = (id: string): void => {
    reset();
    setEditing(false);
    setProjectsOwnedList(prevList =>
      prevList.map(project =>
        project.id === id ? { ...project, editing: false } : project
      )
    );
  };
  // Handle the delete button click event
  const handleDelete = (id: string) => {
    setProjectsOwnedList(prevList =>
      prevList.map(project =>
        project.id === id ? { ...project, deleting: true } : project
      )
    );
  };

  const handleCancelDeletion = (id: string): void => {
    setProjectsOwnedList(prevList =>
      prevList.map(project =>
        project.id === id ? { ...project, deleting: false } : project
      )
    );
  };

  const handleConfirmDeletion = (id: string): void => {
    deleteProject({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setCurrentProjectId(event.target.value as string);
  };

  const renderCurrentProjectSelectLabel = (): string => {
    return !!currentProjectsList.length
      ? 'Current Project'
      : 'User has no Projects';
  };

  // Render the component
  return (
    <Container>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Select Current Project{' '}
          <Tooltip title={CURRENT_PROJECT_TOOLTIP}>
            <HelpOutlineIcon />
          </Tooltip>
        </Typography>

        <FormControl fullWidth>
          <InputLabel>{renderCurrentProjectSelectLabel()}</InputLabel>
          <Select
            sx={{ mb: 5 }}
            value={currentProjectId}
            label={renderCurrentProjectSelectLabel()}
            onChange={handleSelectChange}
          >
            {currentProjectsList.map(project => {
              return (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ display: 'flex', marginLeft: 'auto', width: 200, mb: 2 }}
          onClick={() =>
            updateCurrentProject({
              variables: { input: { id: currentUser?.id!, currentProjectId } },
            })
          }
        >
          Save
        </Button>
        {!!currentProjectErrorMessage && (
          <ErrorPaper errorMessage={currentProjectErrorMessage} />
        )}
        {!!currentProjectSuccessMessage && (
          <SuccessPaper successMessage={currentProjectSuccessMessage} />
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create / Edit Projects
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Project Name"
                sx={{ mb: 3 }}
                {...field}
                helperText={!!errors.name && errors.name.message}
                error={!!errors.name}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Project Description"
                sx={{ mb: 3 }}
                {...field}
                helperText={!!errors.description && errors.description.message}
                error={!!errors.description}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            {editing ? 'Edit Project' : 'Create Project'}
          </Button>
          {!!createEditProjectErrorMessage && (
            <ErrorPaper errorMessage={createEditProjectErrorMessage} />
          )}
        </Box>
        <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
          {!!projectsOwnedList.length && (
            <Typography variant="h5" align="center" gutterBottom>
              Manage Projects You Own
            </Typography>
          )}
          <List>
            {projectsOwnedList.map(project => (
              <Paper key={project.id} sx={{ p: 3, mb: 2 }}>
                <ListItem>
                  {project.deleting ? (
                    <>
                      <ListItemText
                        primary={`Are you sure you want to delete "${project.name}"?`}
                        secondary="Confirm your action."
                      />
                      <ListItemSecondaryAction>
                        <Button
                          color="primary"
                          onClick={() => handleConfirmDeletion(project.id)}
                          sx={{ mr: 2 }}
                        >
                          Confirm
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleCancelDeletion(project.id)}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </ListItemSecondaryAction>
                    </>
                  ) : project.editing ? (
                    <>
                      <ListItemText
                        primary={`You are currently editing the project "${project.name}"?`}
                        secondary="Do you want to cancel?"
                      />
                      <ListItemSecondaryAction>
                        <Button
                          color="error"
                          onClick={() => handleCancelEditing(project.id)}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </ListItemSecondaryAction>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        primary={project.name}
                        secondary={project.description}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() =>
                            handleEdit(
                              project.id,
                              project.name,
                              project.description
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDelete(project.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </>
                  )}
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      </Paper>
    </Container>
  );
};

export default ProjectManager;
