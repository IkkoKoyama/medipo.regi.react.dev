import React from 'react';
import * as ReactRouterDom from "react-router";

declare global {
  type React = typeof React

  type FNC<P> = React.FC<P>;

  interface plainObject {
    [ index: string ]: any;
  }

  namespace amotify {
    interface APP { }
    type ToneTypes = 'Default' | 'College' | 'Business' | 'App' | 'Cafe' | 'Plain'
  }
  interface amotify {
    config: {
      version: string
      tone: amotify.ToneTypes
      themeColor: amotify.ThemeColorTypes
      darkMode: number
      device: {
        isWhat: 'Windows' | 'Android' | 'iPhone' | 'iPad' | 'macOSX' | 'undefined'
        isMiniDisplay(): boolean
        isSystemDarkmode(): boolean
        isPhone: boolean
        isMouseDevice: boolean
        isTouchDevice: boolean
        isIOS: boolean
      }
      update: {
        tone( value: amotify.ToneTypes ): void
        themeColor( value: number ): void
        darkMode( value: number ): void
      }
      extraCDN: {
        list: {
          [ key: string ]: string
        }
        read( key: string ): Promise<boolean>
        mergeList( params: {
          [ key: string ]: string
        } ): void
      }
    }
    glob: amotify.Glob
    atoms: amotify.Atoms
    mols: amotify.Mols
    orgs: amotify.Orgs
    temps: amotify.Temps
    fn: amotify.Functions

    app: amotify.APP
    inmemory: {
      [ key: string ]: any
      HeaderStickyWhenPhone: boolean
      history: History<unknown>
    }
  }
  var amotify: amotify;


  namespace _WebSocket {
    interface Methods {
      emit( path: string,data: any ): _WebSocket.Methods
      on( path: string,data: {
        ( data: any ): void
      } ): _WebSocket.Methods
    }
  }
  declare var io: {
    ( url: string ): _WebSocket.Methods
  }
}