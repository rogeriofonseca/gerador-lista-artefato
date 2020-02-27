const GeradorTestUtil = require('./gerador-test-util')

const autor = 'fulano'
let diretorio, gitUtil = {}

describe('test gerais', () => {

    beforeEach(async () => {

        await new GeradorTestUtil('foo', autor)
        await new GeradorTestUtil('bar', autor)
    })

    // jest --runInBand --verbose test/diretorio.test.js 
    it('teste', async () => {

        diretorio = require('../lib/diretorio')('/home/foo/Documents')

        const lista = await diretorio.listarDiretorios()

        // expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
    })

    // it('teste', async () => {

    //     diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas')

    //     const lista = await diretorio.listarDiretorios()

    //     console.log(lista)
    // })

    // afterAll(async () => {

    //     gitUtil.removerDiretorioTest()
    // })
})