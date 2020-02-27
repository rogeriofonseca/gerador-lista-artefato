const path = require('path')

const autor = 'fulano'
const appName = require('../package.json').name
const caminho = '/tmp' + path.sep + appName

const GeradorTestUtil = require('./gerador-test-util')

let diretorio, gitUtil = {}

// node_modules/jest/bin/jest.js --runInBand --verbose test/diretorio.test.js 
// jest --runInBand --verbose test/diretorio.test.js 
describe('test gerais', () => {

    beforeEach(async () => {

        await new GeradorTestUtil(caminho, 'foo', autor)
        await new GeradorTestUtil(caminho, 'bar', autor)
    })

    it('teste diretorio', async () => {

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas/bar')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
    })

    it('teste listar sub-diretorios primeiro nivel', async () => {

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo')
    })

    afterAll(async () => {

        gitUtil.removerDiretorioTest()
    })
})