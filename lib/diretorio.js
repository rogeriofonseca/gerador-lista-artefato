const util = require('util')
const path = require('path')
const fs = require('fs-extra')

module.exports = (caminho) => {

  return {

    listarDiretorio: async () => {

      try {
        if (fs.lstatSync(caminho).isDirectory()) {

          const lista = []

          listarDiretorio(caminho, lista)

          return lista

        } else {
          throw new Error(`${caminho} não é um diretório`)
        }
      } catch (error) {
        throw new Error(`${caminho} não é um caminho válido`)
      }
    }
  }

  function listarDiretorio(diretorio, lista) {

    let listaSubDiretorio = fs.readdirSync(diretorio).filter(dir => 
      fs.lstatSync(path.join(diretorio, dir)).isDirectory()
    )
    
    return listaSubDiretorio.map(subDiretorio => {

      const caminho = path.join(diretorio, subDiretorio)

      if(subDiretorio === '.git')
        lista.push(diretorio)

      listarDiretorio(caminho, lista)
    })
  }
}