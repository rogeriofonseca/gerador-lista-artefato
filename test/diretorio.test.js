const path = require('path')

const autor = 'fulano'
const appName = require('../package.json').name
const caminho = '/tmp' + path.sep + appName

const GeradorTestUtil = require('./gerador-test-util')

let diretorio, gitUtil = {}

// node_modules/jest/bin/jest.js --runInBand --verbose test/diretorio.test.js 
// jest --runInBand --verbose test/diretorio.test.js 
describe('test gerais', () => {

    it('teste diretorio', async () => {

        const gitBar = await new GeradorTestUtil(caminho, 'bar', autor)

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas/bar')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')

        gitBar.removerDiretorioTest()
    })

    it('teste listar sub-diretorios primeiro nivel', async () => {

        const gitFoo = await new GeradorTestUtil(caminho, 'foo', autor)
        const gitBar = await new GeradorTestUtil(caminho, 'bar', autor)

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo')

        gitFoo.removerDiretorioTest()
        gitBar.removerDiretorioTest()
    })
})