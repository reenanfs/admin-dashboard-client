export interface IHomeData {
  project: {
    tasks: [
      {
        id: string;
        name: string;
      }
    ];
    projectMemberships: [
      {
        user: {
          id: string;
          name: string;
        };
      }
    ];
    id: string;
    name: string;
  };
}
