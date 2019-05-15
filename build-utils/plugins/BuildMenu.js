const glob = require('glob')
const fs = require('fs')
const path = require('path')

module.exports = class BuildMenuPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap('BuildMenuPlugin', (context, entry) => {    
      const srcPath = path.resolve(__dirname, '..', '..', 'src')
      const menuPath = path.resolve(__dirname, '..', '..', '.menu')      
      const outputFile = path.join(menuPath, 'index.json')

      // filter to remove the index.html webpack html template src
      // map each to a path relative to src
      const htmlElements = 
        glob.sync(`${srcPath}/**/*.html`)
          .filter(path => !path.endsWith('/src/index.html'))
          .map(elementPath => elementPath.split('/src/')[1])

      // delete file
      try {
        fs.unlinkSync(outputFile)
      } catch (e) {
        console.log('Could not delete file', e.message)
      }

      // remove directory
      try {
        fs.rmdirSync(menuPath)
      } catch (e) {
        console.log('Could not delete directory', e.message)
      }

      // make directory + file
      try {
        fs.mkdirSync(menuPath, { recursive: true })
        fs.writeFileSync(outputFile, JSON.stringify({ htmlElements }), {
          flag: 'a+', // flag for "create if required"
        })        
      } catch (e) {
        console.log('Could not create directory or file', e.message, e)
      }

      console.log(`Menu file created, ${outputFile}`)
    })

    compiler.hooks.beforeCompile.tapAsync('BuildMenuPlugin', (params, callback) => {
      console.log('## Before compile ##')      
      callback();
    }); 

    compiler.hooks.emit.tapAsync('BuildMenuPlugin', (compilation, callback) => {    
      console.log('## Emit ##')
      callback();
    });

    compiler.hooks.afterCompile.tapAsync('BuildMenuPlugin', (compilation, callback) => {
      console.log('## After compile ##')
      callback();
    }); 
  }
}
