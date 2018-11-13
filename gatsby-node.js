const isCssModulesRule = ({ test }) => test.source.includes('\\.module\\.css')
const isCssRules = ({ oneOf }) =>
  Array.isArray(oneOf) && oneOf.some(isCssModulesRule)
const isStyleLoader = ({ loader }) => /\bstyle-loader\b/.test(loader)

const loader = require.resolve('css-modules-flow-types-loader')

exports.onCreateWebpackConfig = ({ getConfig, stage, actions }) => {
  if (stage === 'develop') {
    const config = getConfig()
    const cssModulesRule = config.module.rules
      .find(isCssRules)
      .oneOf.find(isCssModulesRule)
    const cssModulesFlowTypesLoader = {
      loader,
      options: {},
    }
    cssModulesRule.use.splice(
      cssModulesRule.use.findIndex(isStyleLoader) + 1,
      0,
      cssModulesFlowTypesLoader
    )
    actions.replaceWebpackConfig(config)
  }
}
