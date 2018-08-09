import { sigin } from './sign';

export const yzmSign = (params) => {
  const initPar = {
    timestamp: parseInt((new Date().getTime() / 1000).toString()),
    ...params
  };

  return {
    sign: sigin(initPar),
    data: JSON.stringify(initPar)
  };
};
