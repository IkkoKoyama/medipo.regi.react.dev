const {
  atoms: {
    Box,
  },
  fn: {
    Table: {
      Attachment
    }
  }
} = amotify;

import style from './style.module.scss';

export const HeadRow: FNC<{
  status: TimeGantt.StatusParams
}> = ( params ) => {
  let {
    status
  } = params;
  let {
    componentId,
    segmentType,
    colLength,
    unitsInfo,
    unit
  } = status;

  let Cols = [
    <Attachment.Cell.Head
      backgroundColor={ '1.layer.base' }
      className={ [
        style.TableCell,
        style.Origin,
        style.Stem
      ].join( ' ' ) }
      id={ 'OriginCell-' + componentId }
      _height={ 3 }
      padding={ '1/2' }
    >
      <Box
        fontSize={ '0.xs' }
        fontColor='theme'
      // fontWeight='3.bold'
      >
        <Box textAlign='right'>
          Units : { unit }分
        </Box>
        <Box textAlign='left'>
          Segmental : { segmentType }
        </Box>
      </Box>
    </Attachment.Cell.Head>,
    <Box
      _width={ 0 }
      className={ style.MetaCell }
    />
  ];

  for ( let index = 0; index < colLength; index++ ) {
    let Params: amotify.fn.Tables.TableCellParams = {}
    let Children: ReactElement[] = [];

    let unitInfo = unitsInfo[ index ];
    let time = unitInfo.time;
    let hour = Math.floor( time / 60 );
    let minutes = time % 60;

    if ( [ status.openAt,status.restFrom,status.restTo,status.closeAt ].includes( time ) ) {
      let label = '';
      let color: amotify.UniStyles.Fonts.ColorParams = 'theme';
      if ( time == status.openAt ) {
        label = '営業開始';
      }
      if ( time == status.restFrom ) {
        label = '休憩';
        color = 'warn';
      }
      if ( time == status.restTo ) {
        label = '営業再開';
      }
      if ( time == status.closeAt ) {
        label = '営業終了';
        color = 'nega';
      }

      Children.push(
        <Box
          position='absolute'
          positionTop={ '1/4' }
          positionLeft={ '1/4' }
          fontColor={ color }
          fontSize={ '0.xs' }
        >
          { label }
        </Box>
      );
    }

    Children.push(
      <Box
        position='absolute'
        positionBottom={ '1/4' }
        positionLeft={ '1/4' }
        fontSize={ '1.mini' }
        fontColor={ time % 60 == 0 ? '1.clear' : '5.translucent' }
      >
        { hour.zeroEmbed( 2 ) }:{ minutes.zeroEmbed( 2 ) }
      </Box>
    );

    let ClassNames = [
      style.TableCell,
      style.FieldCell
    ];
    if ( unitInfo.outCell ) {
      Params.backgroundColor = '3.layer.canvas';
    }
    if ( unitInfo.stem ) ClassNames.push( style.Stem );

    Params.id = 'TimeCell-' + componentId + '-' + time;
    Params.className = ClassNames.join( ' ' );

    Cols.push(
      <Attachment.Cell.Head
        backgroundColor={ '1.layer.base' }
        { ...Params }
        children={ Children }
      />
    );
  }

  return (
    <Attachment.Head
      className={ style.THead }
      position='relative'
    >
      <Attachment.Row
        className={ style.Row }
      >
        { Cols }
      </Attachment.Row>
    </Attachment.Head>
  );
}