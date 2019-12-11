const path = require("path");

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve("ts-loader"),
                options: {
                    configFile: path.resolve(__dirname, "..", "tsconfig.json")
                }
            }/*,
            {
                loader: require.resolve("react-docgen-typescript-loader")
            }*/
        ]
    })
    config.resolve.extensions.push(".ts", ".tsx")
    return config
}