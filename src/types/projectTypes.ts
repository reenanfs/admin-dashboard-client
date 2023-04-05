export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface ProjectsData {
  projects: Project[];
}

export interface CreateProjectData {
  createProject: Project;
}
