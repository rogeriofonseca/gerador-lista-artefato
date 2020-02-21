const GeradorTestUtil = require('./gerador-test-util')

const autor = 'fulano'
let diretorio, gitUtil = {}

describe('test gerais', () => {

    beforeEach(async () => {

        await new GeradorTestUtil('foo', autor)
        await new GeradorTestUtil('bar', autor)
    })

    // jest --runInBand --verbose test/diretorio.test.js 
    it('teste', () => {

        diretorio = require('../lib/diretorio')('/tmp/gerador-lista-artefato-qas/bar')

        const lista = diretorio.listarDiretorios()

        // expect(lista).toHaveLength(1)
    })

    // afterAll(async () => {

    //     gitUtil.removerDiretorioTest()
    // })
})