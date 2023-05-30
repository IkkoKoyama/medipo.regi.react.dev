const {
  atoms: {
    Box,
    Grid,
    Flex
  },
  fn: {
    Buttons,
    Input,
  }
} = amotify;

export const MonthCalendar: FNC<{}> = () => {
  let Labels = [];
  for ( let index = 0; index < 7; index++ ) {
    let Label = <Box
      backgroundColor={ '1.layer.base' }
      fontColor={ index == 0 ? 'nega' : index == 6 ? 'posi' : 'inherit' }
      padding={ '1/3' }
      borderRadius={ '2/3' }
    >
      { [ '日','月','火','水','木','金','土' ][ index ] }
    </Box>
    Labels.push( Label );
  }

  let Today = $.Time();

  let FirstDayOfTheMonth = Today.getFirstDayOfTheMonth();
  let LastDayOfTheMonth = Today.getLastDayOfTheMonth();
  let FirstWeekDayOfTheMonth = FirstDayOfTheMonth.weekday;
  let LastWeekDayOfTheMonth = LastDayOfTheMonth.weekday;

  for ( let index = FirstWeekDayOfTheMonth; index > 0; index-- ) {
    let Date = FirstDayOfTheMonth.addDate( -1 * index );
    Labels.push( <Box
      padding={ '1/3' }
      fontColor={ '5.translucent' }
      fontSize={ '1.mini' }
    >
      { Date.date }日
    </Box> );
  }

  for ( let index = 1; index <= LastDayOfTheMonth.date; index++ ) {
    let Content =
      index % 5 == 0 ? <Box
        backgroundColor={ 'nega' }
        borderRadius={ '2/3' }
        fontColor='white'
        padding={ '1/3' }
      >
        18:00~ ○○様
      </Box> :
        index % 5 == 1 ? <Box
          backgroundColor={ 'posi' }
          borderRadius={ '2/3' }
          fontColor='white'
          padding={ '1/3' }
        >
          19:00~ ○○様
        </Box> :
          index % 5 == 2 ? <Box
            backgroundColor={ 'warn' }
            borderRadius={ '2/3' }
            fontColor='white'
            padding={ '1/3' }
          >
            15:00~ ○○様
          </Box> :
            index % 5 == 3 ? <Box
              backgroundColor={ 'theme' }
              borderRadius={ '2/3' }
              fontColor='white'
              padding={ '1/3' }
            >
              12:00~ ○○様
            </Box> : '予約なし';

    let Label = <Box
      backgroundColor={ '1.layer.base' }
      padding={ '1/3' }
      borderRadius={ '2/3' }
    >
      <Box
        fontSize={ '1.mini' }
        marginBottom={ '1/2' }
      >
        { index }日
      </Box>
      <Box
        fontColor={ '5.translucent' }
        fontSize={ '0.xs' }
      >
        { Content }
      </Box>
    </Box>
    Labels.push( Label );
  }
  for ( let index = 1; index < 7 - LastWeekDayOfTheMonth; index++ ) {
    Labels.push( <Box
      padding={ '1/3' }
      fontColor={ '5.translucent' }
      fontSize={ '1.mini' }
    >
      { index }日
    </Box> );
  }

  return (
    <Grid
      gridCols={ 7 }
      gap='1/4'
      backgroundColor={ '4.layer.darken' }
      padding={ '1/3' }
      borderBottom='1.thin'
    >
      { Labels }
    </Grid>
  );
}