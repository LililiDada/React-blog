const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = {
    webpack(config,...args){
        config = withCss().webpack(config,...args);
        config.module.rules.push(
          {
              test: /\.(png|jpe?g|gif)$/i,
              loader: 'url-loader'
          }
        );
        config.module.rules.push(
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        )
        
        return config;
    }
}

