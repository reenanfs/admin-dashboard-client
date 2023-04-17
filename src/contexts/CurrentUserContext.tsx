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
  currentUser: ICurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<ICurrentUser | null>>;
  updateCurrentUser: (prop: keyof ICurrentUser, value: any) => void;
}

export const CurrentUserContext = createContext<ICurrentUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
  updateCurrentUser: () => {},
});

export const CurrentUserProvider = ({
  children,
}: ICurrentUserProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  const updateCurrentUser = (prop: keyof ICurrentUser, value: any) => {
    setCurrentUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, [prop]: value };
      }
      return null;
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, updateCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
