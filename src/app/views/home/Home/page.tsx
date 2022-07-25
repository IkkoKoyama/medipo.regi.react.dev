const {
  glob : {
    React
  },
  atoms : {
    Box
  }
} = AMOT;

import style from './style.module.scss';

export const HomePage:FNC<{}> = () => {
  return (
    <>
      <Box padding={ 2 }>
        HomeContent
      </Box>
    </>
  );
}