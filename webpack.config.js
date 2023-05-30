module.exports = ( () => {
  const path = require( 'path' ),
    MinCss = require( 'mini-css-extract-plugin' ),
    RemoveWasteFiles = require( 'webpack-remove-empty-scripts' ),
    TerserPlugin = require( 'terser-webpack-plugin' ),
    BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin,
    BrowserSync = require( 'browser-sync-webpack-plugin' ),
    BrowserSync_option = {
      host: 'localhost',
      port: 10201,
      proxy: 'http://localhost:10200/',
      open: false,
      notify: false
    }

  let entry = {
    'root/fn/region/incognito': './src/app/regions/incognito/@app.tsx',
    'root/fn/region/home': './src/app/regions/home/@app.tsx',

    'root/fn/appWare': './src/app/launch/appWare.tsx',
    'root/launch': './src/app/launch/_.tsx',

    '/uni': './src/app/launch/@app.uni.scss'
  }

  console.log( entry );
  return {
    mode: 'development',
    entry: entry,
    output: {
      filename: '[name].js',
      path: __dirname + '/public/',
      devtoolModuleFilenameTemplate: 'src/[resource-path]'
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin( {
          parallel: true,
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          }
        } )
      ]
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM'
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new BrowserSync(
        BrowserSync_option,
        { reload: true }
      ),
      new MinCss( {
        filename: ( { chunk } ) => {
          let {
            id,
            name,
            filenameTemplate
          } = chunk;
          let fileName = '';

          let keyword = name || filenameTemplate || id;

          if ( keyword.match( /^uni\// ) ) {
            fileName = 'root/ss/uni.min.css';
          } else {
            let paths = keyword.split( '/' );
            let regionName = paths[ paths.length - 1 ];
            fileName = 'root/ss/' + regionName + '.min.css';
          }
          return fileName;
        },
      } ),
      new RemoveWasteFiles,
    ],
    module: {
      rules: [
        {
          test: /\.scss/,
          use: [
            MinCss.loader,
            'css-loader',
            'sass-loader'
          ]
        }, {
          test: /\.(j|t)sx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ]
              }
            }, {
              loader: "ts-loader",
              options: {
                // transpileOnly:true,
                configFile: path.resolve( __dirname, 'tsconfig.json' )
              }
            }
          ],
        }
      ]
    },
    resolve: {
      modules: [ 'node_modules' ],
      extensions: [ '.js', '.jsx', '.tsx', 'ts' ],
      alias: {
        '~': __dirname + '/src',
        '@uniss': path.resolve( __dirname, 'src/lib/@variables/var' ),

        '@appComps': path.resolve( __dirname, 'src/app/appComps' )
      }
    },
  }
} )();