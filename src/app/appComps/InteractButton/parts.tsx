const {
  glob: {
    React,
    useState,
    useRef,
    useEffect
  },
  atoms: {
    Box,
    Buttons: {
      Button
    },
    Icon
  }
} = AMOT;

import style from './style.module.scss';

const HeartSVG: FNC<{}> = () => {
  return (
    <path
      d="
        M 50,27.5
        A 15,15 0 1,1 80,57.5
        L 55,82.5
        Q 50,87.5 45,82.5
        L 45,82.5
        L 20,57.5
        A 15,15 0 1,1 50,27.5
        Z
      "
      className={ style.Icon }
    />
  );
}
const StarSVG: FNC<{}> = () => {
  return (
    <path
      d="
        M 53.9,15
        L 63.75,34.8
        L 86,38.1
        Q 94.5,39.25 87.7,46
        L 72.3,61
        L 76,83
        Q 77.5,91.5 68.9,87
        L 50,77.4
        L 31,87.2
        Q 22.5,91.5 24.2,82
        L 27.7,61.1
        L 12,45.75
        Q 5.5,39.5 14,38.3
        L 36.2,34.85
        L 46.1,15
        Q 50,7 53.9,15
        Z
      "
      className={ style.Icon }
    />
  );
}
const ThumbsUpSVG: FNC<{}> = () => {
  return (
    <path
      d="
        M 16,40
        L 28,40
        Q 32,40 32,44
        L 32,80
        Q 32,84 28,84
        L 16,84
        Q 12,84 12,80
        L 12,44
        Q 12,40 16,40
        Z

        M 38,44
        Q 38,40 42,35
        L 54,17
        Q 55,15 60,15
        L 61,15
        Q 64,16 64,19
        L 58,37
        Q 57,40 60,40
        L 85,40
        Q 90,40 90,45
        
        L 73,81
        Q 70,86 65,85
        L 44,80
        Q 38,78 38,72
      "
      className={ style.Icon }
    />
  );
}

declare global {
  type InteractButtonProps = {
    type: 'heart' | 'star' | 'thumbs-up'
    size?: 'S' | 'R' | 'L' | 'XL'
    free?: ReactElement
    styles?: OriginalStyleProps
    className?: string
    value?: boolean
    onChangeCallBack: {
      ( check: boolean ): void
    }
  }
}

export const InteractButton: FNC<InteractButtonProps> = ( props ) => {
  let {
    type,
    size = 'R',
    styles = {},
    className = '',
    free = '',
    value: DefaultValue = false,
    onChangeCallBack
  } = props;

  const mounted = useRef( false );

  let [ val_check,set_check ] = useState( DefaultValue );
  let [ val_componentId ] = useState( $.uuidGen( 16 ) );

  useEffect( () => {
    if ( mounted.current ) {
      let Box = $( '#' + val_componentId );
      if ( val_check ) Box.addClass( style.Animation );
      else Box.removeClass( style.Animation );

      onChangeCallBack( val_check );
    } else {
      mounted.current = true;
    }
  },[ val_check ] );

  let ClassName =
    `
  ${ style.Wrap }
  ${ style[ `Type_${ type }` ] }
  ${ style[ `Open_${ val_check }` ] }
  ${ style[ `Size_${ size }` ] }
  `.trim();

  return (
    <Button.Plain
      className={ style.Button + ' ' + className }
      { ...styles }
      children={
        <>
          <Box
            className={ ClassName }
            id={ val_componentId }
          >
            <svg
              viewBox="0 0 100 100"
              className={ style.SVG }
            >
              {
                type == 'heart' ? <HeartSVG />
                  : type == 'star' ? <StarSVG />
                    : type == 'thumbs-up' ? <ThumbsUpSVG /> : null
              }

              <circle
                className={ style.Circle }
                cx="50" cy="50" r="4"
              />
              <g className={ style.Group + ' ' + style.Group_1 }>
                <circle className={ style.Oval1 } cx="2.5" cy="3" r='10' />
                <circle className={ style.Oval2 } cx="7.5" cy="2" r='5' />
              </g>
              <g className={ style.Group + ' ' + style.Group_2 }>
                <circle className={ style.Oval1 } cx="5" cy="6" r='10' />
                <circle className={ style.Oval2 } cx="2" cy="2" r='5' />
              </g>
              <g className={ style.Group + ' ' + style.Group_3 }>
                <circle className={ style.Oval1 } cx="2" cy="7" r='10' />
                <circle className={ style.Oval2 } cx="4" cy="2" r='5' />
              </g>
              <g className={ style.Group + ' ' + style.Group_4 }>
                <circle className={ style.Oval1 } cx="6" cy="5" r='10' />
                <circle className={ style.Oval2 } cx="2" cy="2" r='5' />
              </g>
              <g className={ style.Group + ' ' + style.Group_5 }>
                <circle className={ style.Oval1 } cx="6" cy="5" r='10' />
                <circle className={ style.Oval2 } cx="2" cy="2" r='5' />
              </g>
              <g className={ style.Group + ' ' + style.Group_6 }>
                <circle className={ style.Oval1 } cx="2" cy="7" r='10' />
                <circle className={ style.Oval2 } cx="3" cy="2" r='5' />
              </g>
              <g className={ style.Group + ' ' + style.Group_7 }>
                <circle className={ style.Oval1 } cx="2" cy="6" r='10' />
                <circle className={ style.Oval2 } cx="5" cy="2" r='5' />
              </g>
            </svg>
            { free }
          </Box>
        </>
      }
      onClick={ ( event ) => {
        event.stopPropagation();
        set_check( !val_check );
      } }
    />
  );
}