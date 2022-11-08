'use strict';

require( 'dotenv' ).config();

const
  PORT = process.env.PORT | 0,
  ALIAS = process.env.APP_ALIAS,

  express = require( 'express' ),

  APP = express(),
  HTTP = require( 'http' ).Server( APP );

const
  express_json = { limit: '50mb' },
  express_urlencoded = { limit: '50mb', extended: true };

APP
  .use( express.json( express_json ) )
  .use( express.urlencoded( express_urlencoded ) )
  .use( '/' + ALIAS, express.static( process.cwd() + '/public/root' ) );


HTTP.listen( PORT, () => {
  let ip, nif = require( 'os' ).networkInterfaces();
  for ( let _nif in nif ) nif[ _nif ].forEach( ( d ) => { if ( !d.internal && d.family === `IPv4` ) ip = d.address; } );

  let local_ip = `http://localhost:${ PORT }`,
    network_ip = `http://${ ip }:${ PORT }`,
    board = `\u001b[35m
[ ${ ALIAS }.rct ]
┌───────────────────────────────────────┐
│                                       │
│   Node is Now Serving...              │
│                                       │
│   - ${ local_ip }${ new Array( 35 - local_ip.length ).join( ` ` ) }│
│   - ${ network_ip }${ new Array( 35 - network_ip.length ).join( ` ` ) }│
│                                       │
│            [ Ctrl ] + [ C ] to Exit   │
│                                       │
└───────────────────────────────────────┘\u001b[39m`;
  console.log( board );
} );