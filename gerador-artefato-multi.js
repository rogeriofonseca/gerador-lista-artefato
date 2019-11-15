const util = require('util');
const exec = util.promisify(require('child_process').exec);
const args = process.argv.slice(2)

const listaPromiseExecucaoComando = []

// ex. Linux:   node gerador-artefato-multi.js --projeto=/kdi/git/apc-api,/kdi/git/apc-estatico,/kdi/git/crm-patrimonio-estatico --autor=c1282036 --task=1194196,1189666
// ex. Windows: TODO

// node gerador-artefato-multi.js --projeto=/home/jon/Documents/comando-qas/foo-estatico,/home/jon/Documents/comando-qas/foo-api --autor=c1282036 --task=1194196

init()

function init() {

  let params = obterParametros();

  if (params.projeto && params.autor && params.task) {

    params.task.forEach(function (task) {

      params.projeto.forEach(function (projeto) {
        listaPromiseExecucaoComando.push(executarComandoGitLog(projeto, params.autor, task))
      });
    })

    Promise.all(listaPromiseExecucaoComando).then(function (listaComandoExecutado) {

      const listFoo = obterListaFoo(listaComandoExecutado)

      imprimirLista(listFoo)

    }).catch(function (erro) {
      console.log(erro.cmd)
      console.log(erro.stderr)
    })
  }
}

function imprimirLista(lista) {

  console.log(lista)

  // lista.forEach(function (item) {

  //   console.log(item.tipoAlteracao + '\t' +
  //     item.numeroAlteracao + '\t' +
  //     item.artefato);
  // });
}

function obterListaFoo(listaComandoExecutado) {

  const objetoComandoExecutadoPorTask = agruparPorTask(listaComandoExecutado)

  // Object.keys(listaComandoExecutadoPorTask).forEach(function (key) {

  //   const listaSaidaByTask = listaComandoExecutadoPorTask[key]

  //   listaSaidaByTask.forEach(function (execucaoComando) {

  //     let listaArtefato = obterLista(execucaoComando.stdout,
  //       execucaoComando.task, execucaoComando.projeto);

  //     listaArtefato = removerDeletados(listaArtefato);

  //     listaArtefato.sort(ordenarLista)
  //   });
  // })

  return objetoComandoExecutadoPorTask;
}

function agruparPorTask(listaComandoExecutado) {

  return listaComandoExecutado.reduce(function (prev, item) {

    const taskAgrupadora = item.task;

    // if(!prev[itemAgrupador]) {
    //   prev[itemAgrupador] = [item]
    // } else {
    //   prev[itemAgrupador].push(item)
    // }

    // console.log('prev: ' + JSON.stringify(prev))

    const isListaTaskVazia = !prev.listaTask
    const isListaContemTask = prev.listaTask.some(function (itemLista) {

        // console.log('itemLista.task ' + itemLista.task)
        // console.log('taskAgrupadora ' + taskAgrupadora + '\n')

        return itemLista.task ===  taskAgrupadora
      });

    console.log('isListaTaskVazia ' + isListaTaskVazia)
    console.log('isListaContemTask ' + isListaContemTask)

    if (isListaTaskVazia) {

      prev.listaTask = [{ task: taskAgrupadora }]

    } else {

      prev.listaTask.push({ task: taskAgrupadora })
    }

    return prev

  }, {});
}

function removerDeletados(listaArtefato) {

  var retorno = listaArtefato.filter(function (artefatoFilter) {

    let possuiArtefatoCorrespondenteDeletado = listaArtefato.some(function (artefatoSome) {

      return (artefatoFilter.artefato === artefatoSome.artefato) && artefatoSome.tipoAlteracao === 'D'
    })

    return artefatoFilter.tipoAlteracao !== 'D' && !possuiArtefatoCorrespondenteDeletado
  })

  return retorno
}

function ordenarLista(artefatoA, artefatoB) {
  return artefatoA.artefato > artefatoB.artefato
}

async function executarComandoGitLog(projeto, autor, task) {

  let comando = 'git -C ' + projeto + ' log --no-merges --author=' + autor +
    ' --all --name-status --grep=' + task;

  var retorno = await exec(comando);
  retorno.projeto = projeto;
  retorno.task = task
  retorno.comando = comando;

  return retorno
}

function obterLista(saidaComando, task, projeto) {

  let listaArtefatosSaidaComando = saidaComando.match(/^((M|D|A){1}|R.*)\s.*$/gm)
  let listaSaida = []

  if (listaArtefatosSaidaComando && listaArtefatosSaidaComando.length) {

    listaArtefatosSaidaComando.forEach(function (artefatoSaida) {

      let tipoAlteracao = artefatoSaida.match(/^(M|D|A|R)/g)[0]
      let diretorioProjeto = projeto.match(/[^/|\\]*$/g)[0]
      let artefato = diretorioProjeto + '/' + artefatoSaida.match(/[^\s+]\w.*/g)[0]

      let artefatoModificaoEncontrado = listaSaida.find(function (objSaida) {
        return objSaida.artefato === artefato && objSaida.tipoAlteracao === 'M';
      })

      if (tipoAlteracao === 'A' || !artefatoModificaoEncontrado) {

        listaSaida.push({
          tipoAlteracao: tipoAlteracao,
          artefato: artefato,
          task: task,
          numeroAlteracao: 1
        })
      } else {

        artefatoModificaoEncontrado.numeroAlteracao += 1;
      }
    })
  }

  return listaSaida
}

function obterParametros() {

  let obj = {}

  args.forEach(function (arg) {

    let key = arg.split('=')[0].replace(/[^\w]/g, '')
    let value = arg.split('=')[1].split(',')

    obj[key] = value;
  });

  return obj
}
