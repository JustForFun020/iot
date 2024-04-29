import { ComponentType } from 'react';

export const delayImport = (ms: any, fun: any): Promise<{ default: ComponentType<any> }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fun());
    }, ms);
  });
};
