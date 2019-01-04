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
    const insertIndex = cssModulesRule.use.findIndex(isStyleLoader) + 1
    cssModulesRule.use.splice(insertIndex, 0, cssModulesFlowTypesLoader)
    actions.replaceWebpackConfig(config)
  }
}
