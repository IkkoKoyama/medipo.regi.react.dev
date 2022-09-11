global.AMOT.app.logo = {
  icon: () => {
    return (
      <img
        src={ Cdn.devEnv + 'image/apps/rotaractIcon.svg' }
        alt=''
        style={{
          padding : '.25rem'
        }}
      />
    );
  },
  title: () => ( <>RACCO</> )
}