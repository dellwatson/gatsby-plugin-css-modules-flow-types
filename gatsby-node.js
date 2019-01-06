const loader = require.resolve('css-modules-flow-types-loader')

exports.onCreateWebpackConfig = ({ getConfig, loaders, rules, actions }) => {
  const config = getConfig()

  const cssLoader = loaders.css()
  const plainCssRule = rules.css()
  const cssModulesRule = rules.cssModules()

  const isCssLoader = ({ loader }) => loader === cssLoader.loader
  const isPlainCssRule = rule => (rule.test.source = plainCssRule.test.source)
  const isCssModulesRule = rule =>
    (rule.test.source = cssModulesRule.test.source)
  const isAnyCssRule = rule => isPlainCssRule(rule) || isCssModulesRule(rule)
  const cssRules = config.module.rules.find(
    rule => Array.isArray(rule.oneOf) && rule.oneOf.every(isAnyCssRule)
  )
  const cssModulesFlowTypesLoader = {
    loader,
    options: {},
  }

  cssRules.oneOf.filter(isAnyCssRule).forEach(rule => {
    const insertIndex = rule.use.findIndex(isCssLoader)
    rule.use.splice(insertIndex, 0, cssModulesFlowTypesLoader)
  })

  actions.replaceWebpackConfig(config)
}
