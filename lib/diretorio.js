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

    const listaSubDiretorio = fs.readdirSync(diretorio).filter(dir => {

      const caminhoSubDiretorio = path.join(diretorio, dir)

      return fs.lstatSync(
        caminhoSubDiretorio).isDirectory() &&
          // diretorio !== '.git' &&
            isDiretorioAcessivel(caminhoSubDiretorio)
    })

    return listaSubDiretorio.map(subDiretorio => {

      const caminho = path.join(diretorio, subDiretorio)

      if (subDiretorio === '.git')
        lista.push(diretorio)

      listarDiretorio(caminho, lista)
    })
  }

  function isDiretorioAcessivel(caminhoSubDiretorio) {

    try {
      fs.accessSync(caminhoSubDiretorio, fs.constants.R_OK)
      return true
    } catch (error) {
      return false
    }
  }
}