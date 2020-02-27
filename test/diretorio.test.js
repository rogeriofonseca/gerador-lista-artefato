const GeradorTestUtil = require('./gerador-test-util')

const autor = 'fulano'
let diretorio, gitUtil = {}

// jest --runInBand --verbose test/diretorio.test.js 
describe('test gerais', () => {

    beforeEach(async () => {

        await new GeradorTestUtil('foo', autor)
        await new GeradorTestUtil('bar', autor)
    })

    it('teste', async () => {

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas/bar')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
    })

    it('teste', async () => {

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas')

        const lista = await diretorio.listarDiretorios()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo')
    })

    afterAll(async () => {

        gitUtil.removerDiretorioTest()
    })
})