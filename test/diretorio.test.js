const path = require('path')
const fs = require('fs-extra')

const autor = 'fulano'
const nomeApp = require('../package.json').name

const GeradorTestUtil = require('./gerador-test-util')

const caminho = '/tmp/gerador-lista-artefato-qas'
let diretorio = {}

// node_modules/jest/bin/jest.js --runInBand --verbose test/diretorio.test.js 
// jest --runInBand --verbose test/diretorio.test.js 
describe('test gerais', () => {

    it('teste diretorio', async () => {

        const caminho = '/tmp/gerador-lista-artefato-qas/bar'
        const gitBar = await new GeradorTestUtil(nomeApp, 'bar', autor)

        diretorio = require('../lib/diretorio')(caminho)

        const lista = await diretorio.listarDiretorio()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')

        gitBar.removerDiretorioTest()
    })

    it('teste diretorio invalido', async () => {

        diretorio = require('../lib/diretorio')(caminho)

        expect.assertions(1);

        return expect(diretorio.listarDiretorio()).rejects.toEqual(
            new Error(`${caminho} não é um caminho válido`));
    })

    it('teste listar sub-diretorios primeiro nivel', async () => {

        const gitFoo = await new GeradorTestUtil(nomeApp, 'foo', autor)
        const gitBar = await new GeradorTestUtil(nomeApp, 'bar', autor)

        diretorio = require('../lib/diretorio')(caminho)

        const lista = await diretorio.listarDiretorio()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo')

        gitFoo.removerDiretorioTest()
        gitBar.removerDiretorioTest()
    })

    it('teste listar sub-diretorios segundo nivel', async () => {

        const caminhoSegundoNivel = nomeApp + path.sep + 'foo'

        const gitFoo = await new GeradorTestUtil(caminhoSegundoNivel, 'foo', autor)
        const gitBar = await new GeradorTestUtil(caminhoSegundoNivel, 'bar', autor)

        diretorio = require('../lib/diretorio')(caminho)

        const lista = await diretorio.listarDiretorio()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/foo/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo/foo')

        gitFoo.removerDiretorioTest()
        gitBar.removerDiretorioTest()
    })

    it('teste listar sub-diretorios primeiro e segundo nivel', async () => {

        const caminhoPrimeiroNivel = nomeApp
        const caminhoSegundoNivel = nomeApp + path.sep + 'foo'

        const gitFoo = await new GeradorTestUtil(caminhoPrimeiroNivel, 'bar', autor)
        const gitBar = await new GeradorTestUtil(caminhoSegundoNivel, 'foo', autor)

        diretorio = require('../lib/diretorio')(caminho)

        const lista = await diretorio.listarDiretorio()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/foo/foo')

        gitFoo.removerDiretorioTest()
        gitBar.removerDiretorioTest()
    })

    it('teste listar sub-diretorios até o quinto nível', async () => {

        const caminhoPrimeiroNivel = nomeApp
        const caminhoSegundoNivel = nomeApp + path.sep + 'foo'
        const caminhoTerceiroNivel = nomeApp + path.sep + 'bar' + path.sep + 'qux'
        const caminhoQuartoNivel = nomeApp + path.sep + 'baz' + path.sep + 'foobar' + path.sep + 'waldo'
        const caminhoQuintoNivel = nomeApp + path.sep + 'quuz' + path.sep + 'fred' + path.sep + 'flob'

        fs.mkdirsSync(caminhoPrimeiroNivel + path.sep + 'agx')
        fs.mkdirsSync(caminhoSegundoNivel + path.sep + 'agx')
        fs.mkdirsSync(caminhoTerceiroNivel + path.sep + 'agx')
        fs.mkdirsSync(caminhoQuartoNivel + path.sep + 'agx')
        fs.mkdirsSync(caminhoQuintoNivel + path.sep + 'agx')

        const gitBar = await new GeradorTestUtil(caminhoPrimeiroNivel, 'bar', autor)
        const gitFoo = await new GeradorTestUtil(caminhoSegundoNivel, 'foo', autor)
        const gitBaz = await new GeradorTestUtil(caminhoTerceiroNivel, 'baz', autor)
        const gitQux = await new GeradorTestUtil(caminhoQuartoNivel, 'qux', autor)
        const gitThu = await new GeradorTestUtil(caminhoQuintoNivel, 'thu', autor)

        diretorio = require('../lib/diretorio')(caminho)

        const lista = await diretorio.listarDiretorio()

        expect(lista[0]).toBe('/tmp/gerador-lista-artefato-qas/bar')
        expect(lista[1]).toBe('/tmp/gerador-lista-artefato-qas/bar/qux/baz')
        expect(lista[2]).toBe('/tmp/gerador-lista-artefato-qas/baz/foobar/waldo/qux')
        expect(lista[3]).toBe('/tmp/gerador-lista-artefato-qas/foo/foo')
        expect(lista[4]).toBe('/tmp/gerador-lista-artefato-qas/quuz/fred/flob/thu')

        gitBar.removerDiretorioTest()
        gitFoo.removerDiretorioTest()
        gitBaz.removerDiretorioTest()
        gitQux.removerDiretorioTest()
        gitThu.removerDiretorioTest()
    })
})