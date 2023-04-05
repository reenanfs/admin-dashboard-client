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
}

export const CurrentUserContext = createContext<ICurrentUserContext>({
  user: null,
  setUser: () => {},
});

export const CurrentUserProvider = ({
  children,
}: ICurrentUserProviderProps): JSX.Element => {
  const [user, setUser] = useState<ICurrentUser | null>(null);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
