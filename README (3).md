# VozAtiva — Projeto JessicaTCC

## ATUALIZAÇÃO 16/11 — Banco de dados didático

Este projeto ganhou uma demonstração de Banco de Dados **com dados totalmente fictícios**.

| Arquivo | Alteração |
| --- | --- |
| `banco.sql` | **Novo:** comandos MySQL para criar banco `vozativa`, tabela `usuarios` e inserir cinco pessoas fictícias. |
| `dados/usuarios.json` | **Novo:** lista dos cinco usuários fictícios com senha de demonstração. |
| `dados/usuarios-exemplo.js` | **Novo:** cópia da lista para que o exemplo funcione quando abrir `index.html` diretamente no VSCode (`file://`). |
| `entrar.html` | **Alterado:** corrige o título do formulário, ajusta um caminho de script e carrega os usuários de exemplo. |
| `entrar.js` | **Alterado:** cadastro local de demonstração e verificação de e-mail/senha. |
| `README.md` | **Alterado:** este resumo. |

### Teste rápido

1. Abra o `index.html` normalmente e clique em **Entrar**.
2. Use o e-mail `ana@vozativa.example` e a senha `vozativa123`.
3. Clique em **Entrar na conta**. O sistema mostra uma mensagem e retorna à página inicial.
4. Para testar **Criar conta**, use apenas nome e e-mail inventados; o cadastro de demonstração fica salvo **somente no navegador utilizado**, não no arquivo JSON.

### O que os alunos precisam entender

- O arquivo `banco.sql` contém comandos que podem ser executados no MySQL.
- O arquivo `dados/usuarios.json` é uma **cópia manual fictícia** dos usuários, e não uma conexão com MySQL.
- Em `http://` ou `https://`, `entrar.js` consulta o JSON com `fetch()`.
- Abrindo `index.html` diretamente (`file://`), o navegador pode impedir o `fetch()`. Por isso existe a cópia `dados/usuarios-exemplo.js`; nesse caso o navegador lê o JS, **não o JSON**.
- Para incluir um usuário fictício fixo, mantenha as listas `usuarios.json` e `usuarios-exemplo.js` iguais e atualize o SQL se necessário.
- As contas criadas pelo botão **Criar conta** só existem no navegador em que foram cadastradas.
- Procure por `ATUALIZAÇÃO 16/11` em `entrar.html` e `entrar.js` para encontrar as mudanças.

**Aviso importante:** este site fala sobre violência e pedidos de ajuda. Não utilize o cadastro demonstrativo com informações reais, denúncias, relatos, documentos ou senhas verdadeiras. Este exemplo não protege informações sensíveis, não cria uma sessão autenticada de verdade e não deve ser usado para atendimentos. Para contas reais, será necessário um serviço seguro de autenticação e armazenamento.



## ATUALIZAÇÃO 16/11 — Perfil e sessão demonstrativa

- **Novo:** `perfil.html`, página que mostra o nome e e-mail fictícios da conta.
- **Modificado:** `entrar.js`, agora guarda nome e e-mail após o login de demonstração.
- **Modificado:** `js/common.js`, exibe **Minha conta** e **Sair** nos menus das páginas que já o carregam.
- Após entrar, clique no seu nome no menu para abrir o perfil. Clique em **Sair** para encerrar a sessão de demonstração.
- Os arquivos `banco.sql`, `dados/usuarios.json` e `dados/usuarios-exemplo.js` foram **preservados sem alterações**.
- Tudo continua **exclusivamente didático**, sem sessão segura ou proteção de dados reais.

## ATUALIZAÇÃO 16/11 — Correção da tela Criar conta

- `entrar.html`: o campo **Nome completo** agora fica dentro de um bloco específico do cadastro.
- `entrar.css`: o atributo `hidden` passa a ocultar corretamente os campos ao alternar entre Entrar e Criar conta.
- `entrar.js`: o botão **Criar conta** mostra o nome e muda o botão principal para **Criar minha conta**. Incluído um fallback didático para a senha local ao abrir o HTML diretamente (`file://`).
- As contas fictícias criadas pelo formulário ficam no `localStorage` do navegador. Depois de cadastrar, clique em **Já tenho uma conta** e entre com o mesmo e-mail e senha.
- `banco.sql`, `dados/usuarios.json` e `dados/usuarios-exemplo.js` não foram modificados. Não utilizar senhas nem dados reais.
