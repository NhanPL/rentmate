// utils/navigation.ts
import { NavigateFunction } from 'react-router';

let navigator: NavigateFunction;

export const setNavigator = (nav: NavigateFunction) => {
  navigator = nav;
};

export const navigateTo = (path: string) => {
  if (navigator) {
    navigator(path);
  } else {
    console.error('Navigator chưa được khởi tạo!');
  }
};
