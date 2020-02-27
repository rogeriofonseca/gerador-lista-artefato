const path = require('path')

const autor = 'fulano'
const caminho = require('../package.json').name

const GeradorTestUtil = require('./gerador-test-util')

let diretorio = {}

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

    it('teste listar sub-diretorios segundo nivel', async () => {

        const caminhoSegundoNivel = caminho + path.sep + 'foo'

        const gitFoo = await new GeradorTestUtil(caminhoSegundoNivel, 'foo', autor)
        const gitBar = await new GeradorTestUtil(caminhoSegundoNivel, 'bar', autor)

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/foo/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo/foo')

        gitFoo.removerDiretorioTest()
        gitBar.removerDiretorioTest()
    })

    it('teste listar sub-diretorios primeiro e segundo nivel', async () => {

        const caminhoPrimeiroNivel = caminho
        const caminhoSegundoNivel = caminho + path.sep + 'foo'

        const gitFoo = await new GeradorTestUtil(caminhoPrimeiroNivel, 'bar', autor)
        const gitBar = await new GeradorTestUtil(caminhoSegundoNivel, 'foo', autor)

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo/foo')

        gitFoo.removerDiretorioTest()
        gitBar.removerDiretorioTest()
    })
})