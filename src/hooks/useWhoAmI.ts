import { useLazyQuery } from '@apollo/client';
import { IAuthResponse } from 'types/authTypes';
import { useAuth } from './useAuth';
import { WHO_AM_I } from 'graphql/queries/authQueries';
import { useEffect, useState } from 'react';

export const useWhoAmI = (): boolean => {
  const [loading, setLoading] = useState<boolean>(true);
  const { setAuth, whoAmIFetched, setwhoAmIFetched } = useAuth();

  const [whoAmI] = useLazyQuery<{
    whoAmI: IAuthResponse;
  }>(WHO_AM_I, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (data) {
        const {
          whoAmI: { access_token, refresh_token, credential },
        } = data;

        setAuth(access_token, refresh_token, credential);
      }
      setLoading(false);
      setwhoAmIFetched(true);
    },
    onError: () => {
      setLoading(false);
      setwhoAmIFetched(true);
    },
  });

  useEffect(() => {
    if (!whoAmIFetched) {
      whoAmI();
    } else {
      setLoading(false);
    }
  }, [whoAmI, whoAmIFetched, setwhoAmIFetched, setLoading]);

  return loading;
};
