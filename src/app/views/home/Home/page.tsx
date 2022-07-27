const {
  glob : {
    React
  },
  atoms : {
    Box,
    Icon
  }
} = AMOT;

import style from './style.module.scss';

import {
  InteractButton
} from '@appComps/InteractButton/parts';

export const HomePage:FNC<{}> = () => {
  return (
    <>
      <Box padding={ 2 }>
        <div className={ style.Likes }>
          <div className={ style.LikesIcon }></div>
        </div>
        <InteractButton
          type='heart'
          onChangeCallBack={ ( value ) => {
            console.log( value );
          } }
          free={ 'x 20' }
        />
        <InteractButton
          type='star'
          onChangeCallBack={ ( value ) => {
            console.log( value );
          } }
          free={ 'x 30' }
        />
        <InteractButton
          type='thumbs-up'
          onChangeCallBack={ ( value ) => {
            console.log( value );
          } }
          free={ 'x 10' }
        />
      </Box>
    </>
  );
}