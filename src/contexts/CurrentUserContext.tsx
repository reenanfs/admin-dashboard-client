import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { ICurrentUser } from 'types/authTypes';

interface ICurrentUserProviderProps {
  children: ReactNode;
}

interface ICurrentUserContext {
  user: ICurrentUser | null;
  setUser: Dispatch<SetStateAction<ICurrentUser | null>>;
  updateUser: (prop: keyof ICurrentUser, value: any) => void;
}

export const CurrentUserContext = createContext<ICurrentUserContext>({
  user: null,
  setUser: () => {},
  updateUser: () => {},
});

export const CurrentUserProvider = ({
  children,
}: ICurrentUserProviderProps): JSX.Element => {
  const [user, setUser] = useState<ICurrentUser | null>(null);

  const updateUser = (prop: keyof ICurrentUser, value: any) => {
    setUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, [prop]: value };
      }
      return null;
    });
  };

  return (
    <CurrentUserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
