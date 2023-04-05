import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import { CreateProjectData, ProjectsData } from 'types/projectTypes';
import { CREATE_PROJECT } from 'pages/settings/settingsQueries';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { GET_PROJECTS } from 'graphql/projectsQueries';

const ProjectManagement = (): JSX.Element => {
  const { user } = useCurrentUser();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data } = useQuery<ProjectsData>(GET_PROJECTS);
  const [createProject] = useMutation<CreateProjectData>(CREATE_PROJECT, {
    variables: {
      input: {
        name,
        description,
        ownerId: user?.id,
      },
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleCreateProject = () => {
    createProject();
    setName('');
    setDescription('');
  };

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreateProject}>
          Create Project
        </Button>
      </form>
      <ul>
        {data?.projects.map(project => (
          <li key={project.id}>
            <div>{project.name}</div>
            <div>{project.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;
