const {
  atoms: {
    Box,
  }
} = amotify;

export const ParaTitle: FNC<{ children: ReactElement } & Atoms.BoxProps> = ( params ) => {
  let {
    children,
    ...others
  } = params;
  return (
    <Box
      fontWeight={ '3.bold' }
      fontColor={ '3.blur' }
      { ...others }
    >
      { children }
      <Box
        marginTop={ '1/3' }
        backgroundColor={ '4.layer.darken' }
        borderRadius='sphere'
        _height={ '1/2' }
      />
    </Box>
  );
}