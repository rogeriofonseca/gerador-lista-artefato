const path = require('path')
const fs = require('fs-extra')

// https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await

module.exports = (listaDiretorio) => {

  return {

    listarDiretorio: async () => {

      let listaRetorno = []
      const listaPromiseDiretorio = await obterListaPromiseDiretorio()

      await Promise.all(listaPromiseDiretorio).then(listaRetornoPromise => {

        listaRetorno = listaRetornoPromise.reduce((accum, lista) =>
          accum.push.apply(lista)
        )
      })

      return listaRetorno
    }
  }

  function obterListaPromiseDiretorio() {

    return listaDiretorio.map(diretorio => {
      return listarDiretorio(diretorio)
    })
  }

  async function listarDiretorio(caminho) {

    return new Promise(function (resolve, reject) {

      try {

        const lista = []

        if (fs.lstatSync(caminho).isDirectory()) {
          listarDiretorioFoo(caminho, lista)
        }

        console.log(lista)

        resolve(lista)

      } catch (error) {

        reject(error)
      }
    })
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