'use strict';

const
  PORT = 35000,
  ALIAS = 'medipo/design',
  express = require( 'express' ),
  APP = express(),
  HTTP = require( 'http' ).Server( APP );

APP.use( '/' + ALIAS, express.static( process.cwd() + '/public/' ) );

HTTP.listen( PORT, () => {
  let ip, nif = require( 'os' ).networkInterfaces();
  for ( let _nif in nif ) nif[ _nif ].forEach( ( d ) => { if ( !d.internal && d.family === `IPv4` ) ip = d.address; } );

  let local_ip = `http://localhost:${ PORT }`,
    network_ip = `http://${ ip }:${ PORT }`,
    board = `\u001b[35m
[ ${ ALIAS } ]
  - ${ local_ip }${ new Array( 35 - local_ip.length ).join( ` ` ) }
  - ${ network_ip }${ new Array( 35 - network_ip.length ).join( ` ` ) }\u001b[39m`;
  console.log( board );
} );