const withCss = require('@zeit/next-css')
const nodeExternals = require('webpack-node-externals')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({
  
})

