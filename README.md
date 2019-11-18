# Comando para listagem de artefatos do QAS

Comando para listar os artefatos incluídos/alterados/renomeados/removidos para geração do QAS

## Pré-requisitos 

- Não utilizar espaços nos nomes dos arquivos
- Configurar corretamente as variáveis do Git `user.name` e `user.email` com nome e matrícula

## Uso

### Linux

``` console
$ node gerador-artefato.js --diretorio=/kdi/git --projeto=foo-estatico,foo-api --autor=X1337 --task=900089,900081
```

### Windows

``` console
$ node gerador-artefato.js --diretorio=C:/kdi/git --projeto=foo-estatico,foo-api --autor=X1337 --task=900089,900081
```

Onde:

- --diretorio: Diretório dos projetos Git
- --projeto: Lista de projetos Git (podem ser passados vários projetos separados por vírgula)
- --autor: Autor dos commits
- --task: Lista de tarefas (podem ser passadas várias tarefas separadas por vírgula)

## Saida

``` console
$ node gerador-artefato.js --diretorio=/kdi/git --projeto=foo-estatico,foo-api --autor=X1337 --task=900089,900081

Tarefa nº 900089

M   2   foo-api/src/main/java/br/com/foo/api/v1/foo/gateway/GatewayConsultarFoo.java
A   1   foo-api/src/main/java/br/com/foo/api/v1/foo/gateway/GatewayIncluirFoo.java
M   3   foo-api/src/main/java/br/com/foo/api/v1/foo/gateway/GatewayIncluirFoo.java
M   1   foo-estatico/Gruntfile.js
M   1   foo-estatico/karma.conf.js
M   1   foo-estatico/package.json

Tarefa nº 900081

M   2   foo-api/src/main/java/br/com/foo/api/v1/foo/gateway/GatewayConsultarFoo.java
M   3   foo-api/src/main/java/br/com/foo/api/v1/foo/gateway/GatewayIncluirFoo.java
R   1   foo-estatico/foo.json foo-estatico/bar.json

```
Onde:

- Ação executada no artefato na tarefa - A (Added), M (Modified) e R (Renamed)
- Nº de modificações do artefato na tarefa
- Caminho do artefato

## TODO

- Tratar arquivos deletados e depois adicionados com o mesmo nome
