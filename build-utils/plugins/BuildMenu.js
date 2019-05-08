const glob = require('glob')
const fs = require('fs')
const path = require('path')

module.exports = class BuildMenuPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap('BuildMenuPlugin', (x, y) => {
      const srcPath = path.resolve(__dirname, '..', '..', 'src')
      const menuPath = path.resolve(__dirname, '..', '..', '.menu')
      const arrFiles = glob.sync(`${srcPath}/**/*.html`)
      const outputFile = path.join(menuPath, 'index.json')

      // delete file
      try {
        fs.unlinkSync(outputFile)
      } catch (e) {
        console.log(e)
      }

      // remove directory
      try {
        fs.rmdirSync(menuPath)
      } catch (e) {
        console.log(e)
      }

      // make directory + file
      try {
        fs.mkdirSync(menuPath, { recursive: true })
        fs.writeFileSync(outputFile, JSON.stringify({ arrFiles }), {
          flag: 'a+', // flag for "create if required"
        })
      } catch (e) {
        console.log(e)
      }

      console.log(`Menu file created, ${outputFile}`)
    })
  }
}
