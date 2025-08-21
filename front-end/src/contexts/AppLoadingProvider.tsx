import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/loading/Loading';

const AppLoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useSelector((state: { loading: { isLoading: boolean } }) => state.loading);
  return (
    <>
      {isLoading && <Loading />}
      {children}
    </>
  );
};

export default AppLoadingProvider;
