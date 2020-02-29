const path = require('path')
const fs = require('fs-extra')

module.exports = (listaDiretorio) => {

  return {

    listarDiretorio: async () => {

      const listaPromiseDiretorio = await obterListaPromiseDiretorio()

      console.log(listaPromiseDiretorio)
    }
  }

  async function obterListaPromiseDiretorio() {

    return listaDiretorio.map(diretorio => {
      return listarDiretorio(diretorio)
    })
  }

  async function listarDiretorio(caminho) {

    try {
      if (fs.lstatSync(caminho).isDirectory()) {

        const lista = []

        listarDiretorioFoo(caminho, lista)

        return lista

      } else {
        throw new Error(`${caminho} não é um diretório`)
      }
    } catch (error) {
      throw new Error(`${caminho} não é um caminho válido`)
    }
  }

  function listarDiretorioFoo(diretorio, lista) {

    const listaSubDiretorio = fs.readdirSync(diretorio).filter(subDiretorio => {

      const caminhoSubDiretorio = path.join(diretorio, subDiretorio)

      return fs.lstatSync(caminhoSubDiretorio).isDirectory() &&
        isDiretorioAcessivel(caminhoSubDiretorio)
    })

    return listaSubDiretorio.map(subDiretorio => {

      const caminho = path.join(diretorio, subDiretorio)

      if (subDiretorio === '.git')
        lista.push(diretorio)
      else
        listarDiretorio(caminho, lista)
    })
  }

  function isDiretorioAcessivel(caminhoSubDiretorio) {

    try {
      fs.accessSync(caminhoSubDiretorio, fs.constants.F_OK | fs.constants.R_OK)
      return true
    } catch (error) {
      return false
    }
  }
}