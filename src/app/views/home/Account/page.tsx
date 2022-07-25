const {
  glob : {
    React
  },
  atoms : {
    Box
  }
} = AMOT;

import style from './style.module.scss';

export const AccountPage:FNC<{}> = () => {
  return (
    <>
      <Box padding={ 2 }>
        AccountContent
      </Box>
    </>
  );
}