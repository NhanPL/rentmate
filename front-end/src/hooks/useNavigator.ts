// hooks/useNavigator.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setNavigator } from '../utils/navigation';

export const useNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
};
