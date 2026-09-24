// ========================================
// CONFIGURAÇÃO
// ========================================

let ano = 2027;

const ANO_MINIMO = 2027;


const nomesMeses = [

    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",

    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO"

];



// ========================================
// CATEGORIAS
// ========================================

const categorias = {

    evento: {
        nome: "Eventos Pedagógicos",
        prioridade: 1,
        cor: "#18a657"
    },

    pedagogico: {
        nome: "Início / Fim Pedagógico",
        prioridade: 2,
        cor: "#20a9e0"
    },

    vermelho: {
        nome: "Reuniões",
        prioridade: 3,
        cor: "#f02b32"
    },

    avaliacao: {
        nome: "Avaliações / Simulados",
        prioridade: 4,
        cor: "#172a75"
    },

    feriado: {
        nome: "Feriados",
        prioridade: 5,
        cor: "#f7941d"
    },

    viagem: {
        nome: "Desbravando Caminhos / Viagens",
        prioridade: 6,
        cor: "#e91e78"
    }

};



// ========================================
// ELEMENTOS HTML
// ========================================

const semestre1 =
    document.getElementById(
        "semestre-1"
    );


const semestre2 =
    document.getElementById(
        "semestre-2"
    );


const plannerMensal =
    document.getElementById(
        "planner-mensal"
    );


const listaGerenciamento =
    document.getElementById(
        "lista-gerenciamento"
    );


const camposDiasLetivos =
    document.getElementById(
        "campos-dias-letivos"
    );


const formulario =
    document.getElementById(
        "form-evento"
    );


const campoId =
    document.getElementById(
        "evento-id"
    );


const campoNome =
    document.getElementById(
        "nome"
    );


const campoInicio =
    document.getElementById(
        "inicio"
    );


const campoFim =
    document.getElementById(
        "fim"
    );


const campoTipo =
    document.getElementById(
        "tipo"
    );


const botaoSalvar =
    document.getElementById(
        "botao-salvar"
    );


const botaoCancelar =
    document.getElementById(
        "botao-cancelar"
    );


const botaoImprimirCalendario =
    document.getElementById(
        "imprimir-calendario"
    );


const botaoImprimirPlanner =
    document.getElementById(
        "imprimir-planner"
    );


const selecionarTodosMeses =
    document.getElementById(
        "selecionar-todos-meses"
    );


const checkboxesMeses =
    Array.from(
        document.querySelectorAll(
            ".checkbox-mes-planner"
        )
    );


const botaoAnoAnterior =
    document.getElementById(
        "ano-anterior"
    );


const botaoProximoAno =
    document.getElementById(
        "proximo-ano"
    );


const indicadorAno =
    document.getElementById(
        "ano-atual"
    );


const anoSubtitulo =
    document.getElementById(
        "ano-subtitulo"
    );

const checkboxSetembroAmarelo =
    document.getElementById(
        "setembro-amarelo"
    );



// ========================================
// DADOS
// ========================================

let eventos =
    carregarEventos();


let diasLetivos =
    carregarDiasLetivos();

let setembroAmarelo =
    carregarSetembroAmarelo();



// ========================================
// INICIALIZAÇÃO
// ========================================

atualizarInterfaceAno();

checkboxSetembroAmarelo.checked =
    setembroAmarelo;

criarCamposDiasLetivos();

renderizarTudo();



// ========================================
// FONTES
// ========================================

if (document.fonts) {

    document.fonts.ready.then(
        function () {

            ajustarTodasListasEventos();

        }
    );

}



// ========================================
// REDIMENSIONAMENTO
// ========================================

window.addEventListener(
    "resize",
    function () {

        ajustarTodasListasEventos();

    }
);



// ========================================
// SELECIONAR TODOS OS MESES
// ========================================

selecionarTodosMeses.addEventListener(
    "change",
    function () {

        checkboxesMeses.forEach(
            checkbox => {

                checkbox.checked =
                    selecionarTodosMeses.checked;

            }
        );

    }
);



// ========================================
// ALTERAÇÃO INDIVIDUAL DOS MESES
// ========================================

checkboxesMeses.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            function () {

                atualizarCheckboxTodos();

            }
        );

    }
);



// ========================================
// ATUALIZAR ESTADO DO "TODOS"
// ========================================

function atualizarCheckboxTodos() {

    const quantidadeMarcados =
        checkboxesMeses.filter(
            checkbox =>
                checkbox.checked
        ).length;



    // Todos marcados

    if (
        quantidadeMarcados ===
        checkboxesMeses.length
    ) {

        selecionarTodosMeses.checked =
            true;


        selecionarTodosMeses.indeterminate =
            false;

    }


    // Nenhum marcado

    else if (
        quantidadeMarcados === 0
    ) {

        selecionarTodosMeses.checked =
            false;


        selecionarTodosMeses.indeterminate =
            false;

    }


    // Alguns marcados

    else {

        selecionarTodosMeses.checked =
            false;


        selecionarTodosMeses.indeterminate =
            true;

    }

}



// ========================================
// SETEMBRO AMARELO
// ========================================

checkboxSetembroAmarelo.addEventListener(
    "change",
    function () {
        setembroAmarelo = checkboxSetembroAmarelo.checked;
        salvarSetembroAmarelo();
        renderizarTudo();
    }
);


// ========================================
// NAVEGAÇÃO ENTRE ANOS
// ========================================

botaoAnoAnterior.addEventListener(
    "click",
    function () {

        if (
            ano <= ANO_MINIMO
        ) {

            return;

        }


        trocarAno(
            ano - 1
        );

    }
);


botaoProximoAno.addEventListener(
    "click",
    function () {

        trocarAno(
            ano + 1
        );

    }
);


// ========================================
// TROCAR ANO
// ========================================

function trocarAno(
    novoAno
) {

    if (
        novoAno < ANO_MINIMO
    ) {

        return;

    }


    limparFormulario();


    ano =
        novoAno;


    eventos =
        carregarEventos();


    diasLetivos =
        carregarDiasLetivos();


    setembroAmarelo =
        carregarSetembroAmarelo();


    checkboxSetembroAmarelo.checked =
        setembroAmarelo;


    criarCamposDiasLetivos();

    atualizarInterfaceAno();

    renderizarTudo();

}


// ========================================
// ATUALIZAR INTERFACE DO ANO
// ========================================

function atualizarInterfaceAno() {

    indicadorAno.textContent =
        ano;


    anoSubtitulo.textContent =
        ano;


    document.title =
        `Calendário Escolar ${ano}`;


    document
        .querySelectorAll(
            ".texto-ano"
        )
        .forEach(
            elemento => {

                elemento.textContent =
                    ano;

            }
        );


    botaoAnoAnterior.disabled =
        ano <= ANO_MINIMO;


    campoInicio.min =
        `${ano}-01-01`;


    campoInicio.max =
        `${ano}-12-31`;


    campoFim.min =
        `${ano}-01-01`;


    campoFim.max =
        `${ano}-12-31`;

}


// ========================================
// IMPRIMIR CALENDÁRIO GERAL
// ========================================

botaoImprimirCalendario.addEventListener(
    "click",
    function () {

        limparConfiguracaoImpressaoPlanner();


        document.body.classList.remove(
            "imprimir-planner"
        );


        document.body.classList.add(
            "imprimir-calendario"
        );


        window.print();

    }
);



// ========================================
// IMPRIMIR PLANNER
// ========================================

botaoImprimirPlanner.addEventListener(
    "click",
    function () {

        const mesesSelecionados =
            checkboxesMeses

                .filter(
                    checkbox =>
                        checkbox.checked
                )

                .map(
                    checkbox =>
                        Number(
                            checkbox.value
                        )
                );



        if (
            mesesSelecionados.length === 0
        ) {

            alert(
                "Selecione pelo menos um mês para imprimir."
            );

            return;

        }



        prepararImpressaoPlanner(
            mesesSelecionados
        );


        document.body.classList.remove(
            "imprimir-calendario"
        );


        document.body.classList.add(
            "imprimir-planner"
        );


        window.print();

    }
);



// ========================================
// PREPARAR MESES DO PLANNER
// ========================================

function prepararImpressaoPlanner(
    mesesSelecionados
) {

    const paginas =
        Array.from(
            document.querySelectorAll(
                ".pagina-planner"
            )
        );



    paginas.forEach(
        pagina => {

            pagina.classList.remove(
                "nao-imprimir",
                "ultima-pagina-impressao"
            );


            const mes =
                Number(
                    pagina.dataset.mes
                );


            if (
                !mesesSelecionados.includes(
                    mes
                )
            ) {

                pagina.classList.add(
                    "nao-imprimir"
                );

            }

        }
    );



    const paginasSelecionadas =
        paginas.filter(
            pagina =>
                !pagina.classList.contains(
                    "nao-imprimir"
                )
        );



    if (
        paginasSelecionadas.length > 0
    ) {

        paginasSelecionadas[
            paginasSelecionadas.length - 1
        ].classList.add(
            "ultima-pagina-impressao"
        );

    }

}



// ========================================
// LIMPAR CONFIGURAÇÃO DE IMPRESSÃO
// ========================================

function limparConfiguracaoImpressaoPlanner() {

    const paginas =
        document.querySelectorAll(
            ".pagina-planner"
        );


    paginas.forEach(
        pagina => {

            pagina.classList.remove(
                "nao-imprimir",
                "ultima-pagina-impressao"
            );

        }
    );

}



// ========================================
// APÓS IMPRIMIR
// ========================================

window.addEventListener(
    "afterprint",
    function () {

        document.body.classList.remove(
            "imprimir-calendario",
            "imprimir-planner"
        );


        limparConfiguracaoImpressaoPlanner();

    }
);



// ========================================
// FORMULÁRIO
// ========================================

formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const nome =
            campoNome.value.trim();


        const inicio =
            campoInicio.value;


        const fim =
            campoFim.value;


        const tipo =
            campoTipo.value;



        if (
            !nome ||
            !inicio ||
            !fim ||
            !tipo
        ) {

            alert(
                "Preencha todos os campos."
            );

            return;
        }



        const dataInicio =
            criarDataLocal(
                inicio
            );


        const dataFim =
            criarDataLocal(
                fim
            );



        if (
            dataFim < dataInicio
        ) {

            alert(
                "A data final não pode ser anterior à data inicial."
            );

            return;
        }



        if (campoId.value) {

            const id =
                Number(
                    campoId.value
                );


            const evento =
                eventos.find(
                    evento =>
                        evento.id === id
                );


            if (evento) {

                evento.nome =
                    nome;

                evento.inicio =
                    inicio;

                evento.fim =
                    fim;

                evento.tipo =
                    tipo;

            }

        }

        else {

            eventos.push({

                id:
                    gerarId(),

                nome:
                    nome,

                inicio:
                    inicio,

                fim:
                    fim,

                tipo:
                    tipo

            });

        }



        salvarEventos();

        limparFormulario();

        renderizarTudo();

    }
);



// ========================================
// CANCELAR EDIÇÃO
// ========================================

botaoCancelar.addEventListener(
    "click",
    function () {

        limparFormulario();

    }
);



// ========================================
// RENDERIZAR TUDO
// ========================================

function renderizarTudo() {

    ordenarEventos();

    renderizarCalendarios();

    renderizarPlanner();

    renderizarGerenciamento();


    requestAnimationFrame(
        function () {

            ajustarTodasListasEventos();

        }
    );

}



// ========================================
// PARTE 1
// RENDERIZAR CALENDÁRIOS
// ========================================

function renderizarCalendarios() {

    semestre1.innerHTML =
        "";


    semestre2.innerHTML =
        "";



    for (
        let mes = 0;
        mes < 12;
        mes++
    ) {

        const elementoMes =
            criarMes(
                mes
            );



        if (
            mes < 6
        ) {

            semestre1.appendChild(
                elementoMes
            );

        }

        else {

            semestre2.appendChild(
                elementoMes
            );

        }

    }

}



// ========================================
// CRIAR MÊS
// ========================================

function criarMes(mes) {

    const container =
        document.createElement(
            "section"
        );


    container.classList.add(
        "mes"
    );



    const titulo =
        document.createElement(
            "h3"
        );


    titulo.textContent =
        nomesMeses[mes];


    container.appendChild(
        titulo
    );



    const diasSemana =
        document.createElement(
            "div"
        );


    diasSemana.classList.add(
        "dias-semana"
    );



    [
        "D",
        "S",
        "T",
        "Q",
        "Q",
        "S",
        "S"
    ].forEach(
        letra => {

            const span =
                document.createElement(
                    "span"
                );


            span.textContent =
                letra;


            diasSemana.appendChild(
                span
            );

        }
    );


    container.appendChild(
        diasSemana
    );



    const calendario =
        document.createElement(
            "div"
        );


    calendario.classList.add(
        "calendario"
    );


    if (mes === 8 && setembroAmarelo) {
        calendario.classList.add(
            "calendario-setembro-amarelo"
        );
    }


    criarDiasDoMes(
        calendario,
        mes
    );


    container.appendChild(
        calendario
    );



    const areaDiasLetivos =
        document.createElement(
            "div"
        );


    areaDiasLetivos.classList.add(
        "dias-letivos"
    );



    const quantidade =
        Number(
            diasLetivos[mes]
        ) || 0;



    areaDiasLetivos.textContent =
        quantidade > 0

            ? `${quantidade} DIAS LETIVOS`

            : "";



    container.appendChild(
        areaDiasLetivos
    );



    const listaEventos =
        document.createElement(
            "div"
        );


    listaEventos.classList.add(
        "lista-eventos"
    );


    listaEventos.dataset.mes =
        mes;


    criarLegendaMes(
        listaEventos,
        mes
    );


    container.appendChild(
        listaEventos
    );



    return container;

}



// ========================================
// CRIAR DIAS
// ========================================

function criarDiasDoMes(
    calendario,
    mes
) {

    const primeiroDia =
        new Date(
            ano,
            mes,
            1
        ).getDay();


    const quantidadeDias =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();



    for (
        let i = 0;
        i < primeiroDia;
        i++
    ) {

        const vazio =
            document.createElement(
                "div"
            );


        vazio.classList.add(
            "celula-vazia"
        );


        calendario.appendChild(
            vazio
        );

    }



    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        const dataAtual =
            new Date(
                ano,
                mes,
                dia
            );


        const elementoDia =
            document.createElement(
                "div"
            );


        elementoDia.classList.add(
            "dia"
        );



        const eventosDoDia =
            obterEventosDoDia(
                dataAtual
            )

                .sort(
                    (a, b) =>

                        categorias[
                            a.tipo
                        ].prioridade

                        -

                        categorias[
                            b.tipo
                        ].prioridade
                );



        eventosDoDia.forEach(
            evento => {

                const camada =
                    document.createElement(
                        "div"
                    );


                camada.classList.add(
                    "camada-evento"
                );


                const nivel =
                    calcularNivelEvento(
                        evento
                    );


                const aumento =
                    nivel * 4;


                camada.style.setProperty(
                    "--aumento",
                    `${aumento}px`
                );


                camada.style.backgroundColor =
                    categorias[
                        evento.tipo
                    ].cor;


                camada.style.zIndex =
                    categorias[
                        evento.tipo
                    ].prioridade;


                configurarFormatoCamada(
                    camada,
                    evento,
                    dataAtual,
                    mes
                );


                elementoDia.appendChild(
                    camada
                );

            }
        );



        const numero =
            document.createElement(
                "span"
            );


        numero.classList.add(
            "numero-dia"
        );


        numero.textContent =
            dia;



        if (
            eventosDoDia.length > 0
        ) {

            numero.classList.add(
                "numero-com-evento"
            );

        }



        elementoDia.appendChild(
            numero
        );


        calendario.appendChild(
            elementoDia
        );

    }

}



// ========================================
// EVENTOS DE UMA DATA
// ========================================

function obterEventosDoDia(
    dataAtual
) {

    return eventos.filter(
        evento => {

            const inicio =
                criarDataLocal(
                    evento.inicio
                );


            const fim =
                criarDataLocal(
                    evento.fim
                );


            return (

                dataAtual >= inicio

                &&

                dataAtual <= fim

            );

        }
    );

}



// ========================================
// SOBREPOSIÇÃO
// ========================================

function calcularNivelEvento(
    eventoAtual
) {

    const inicioAtual =
        criarDataLocal(
            eventoAtual.inicio
        );


    const fimAtual =
        criarDataLocal(
            eventoAtual.fim
        );


    const categoriasNaFrente =
        new Set();



    eventos.forEach(
        outroEvento => {

            if (
                outroEvento.id ===
                eventoAtual.id
            ) {

                return;

            }



            const inicioOutro =
                criarDataLocal(
                    outroEvento.inicio
                );


            const fimOutro =
                criarDataLocal(
                    outroEvento.fim
                );


            const sobrepoe =

                inicioAtual <= fimOutro

                &&

                fimAtual >= inicioOutro;



            if (!sobrepoe) {

                return;

            }



            const prioridadeAtual =
                categorias[
                    eventoAtual.tipo
                ].prioridade;


            const prioridadeOutro =
                categorias[
                    outroEvento.tipo
                ].prioridade;



            if (
                prioridadeOutro >
                prioridadeAtual
            ) {

                categoriasNaFrente.add(
                    outroEvento.tipo
                );

            }

        }
    );



    return categoriasNaFrente.size;

}



// ========================================
// FORMATO DAS CAMADAS
// ========================================

function configurarFormatoCamada(
    camada,
    evento,
    dataAtual,
    mes
) {

    const inicioOriginal =
        criarDataLocal(
            evento.inicio
        );


    const fimOriginal =
        criarDataLocal(
            evento.fim
        );


    const primeiroDiaMes =
        new Date(
            ano,
            mes,
            1
        );


    const ultimoDiaMes =
        new Date(
            ano,
            mes + 1,
            0
        );


    const inicioVisivel =

        inicioOriginal <
        primeiroDiaMes

            ? primeiroDiaMes
            : inicioOriginal;


    const fimVisivel =

        fimOriginal >
        ultimoDiaMes

            ? ultimoDiaMes
            : fimOriginal;



    if (
        inicioVisivel.getTime() ===
        fimVisivel.getTime()
    ) {

        camada.classList.add(
            "camada-unica"
        );

        return;

    }



    const diaSemana =
        dataAtual.getDay();


    const ehInicio =

        dataAtual.getTime() ===
        inicioVisivel.getTime();


    const ehFim =

        dataAtual.getTime() ===
        fimVisivel.getTime();



    if (
        ehInicio ||
        diaSemana === 0
    ) {

        camada.classList.add(
            "camada-inicio"
        );

    }

    else {

        camada.classList.add(
            "camada-conecta-esquerda"
        );

    }



    if (
        ehFim ||
        diaSemana === 6
    ) {

        camada.classList.add(
            "camada-fim"
        );

    }

    else {

        camada.classList.add(
            "camada-conecta-direita"
        );

    }

}



// ========================================
// LEGENDA DO MÊS
// ========================================

function criarLegendaMes(
    lista,
    mes
) {

    const inicioMes =
        new Date(
            ano,
            mes,
            1
        );


    const fimMes =
        new Date(
            ano,
            mes + 1,
            0
        );



    const eventosDoMes =
        eventos.filter(
            evento => {

                const inicio =
                    criarDataLocal(
                        evento.inicio
                    );


                const fim =
                    criarDataLocal(
                        evento.fim
                    );


                return (

                    inicio <= fimMes

                    &&

                    fim >= inicioMes

                );

            }
        );



    if (mes === 8 && setembroAmarelo) {
        const itemSetembro = document.createElement("div");
        itemSetembro.classList.add("item-evento");

        const dataSetembro = document.createElement("span");
        dataSetembro.classList.add("data-evento", "data-setembro-amarelo");
        dataSetembro.textContent = "1 a 30";

        const descricaoSetembro = document.createElement("span");
        descricaoSetembro.classList.add("descricao-evento");
        descricaoSetembro.textContent = "Setembro Amarelo";

        itemSetembro.appendChild(dataSetembro);
        itemSetembro.appendChild(descricaoSetembro);
        lista.appendChild(itemSetembro);
    }


    eventosDoMes.forEach(
        evento => {

            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "item-evento"
            );



            const data =
                document.createElement(
                    "span"
                );


            data.classList.add(
                "data-evento"
            );


            data.style.backgroundColor =
                categorias[
                    evento.tipo
                ].cor;


            data.textContent =
                formatarPeriodoLegendaMes(
                    evento,
                    mes
                );



            const descricao =
                document.createElement(
                    "span"
                );


            descricao.classList.add(
                "descricao-evento"
            );


            descricao.textContent =
                evento.nome;



            item.appendChild(
                data
            );


            item.appendChild(
                descricao
            );


            lista.appendChild(
                item
            );

        }
    );

}



// ========================================
// AJUSTAR LISTAS
// ========================================

function ajustarTodasListasEventos() {

    const listas =
        document.querySelectorAll(
            ".lista-eventos"
        );


    listas.forEach(
        lista => {

            ajustarFonteLista(
                lista
            );

        }
    );

}



// ========================================
// FONTE AUTOMÁTICA
// ========================================

function ajustarFonteLista(
    lista
) {

    let tamanho =
        9;


    const tamanhoMinimo =
        7;


    const passo =
        0.25;



    lista.style.fontSize =
        `${tamanho}pt`;


    atualizarEspacamentoLista(
        lista,
        tamanho
    );



    while (

        lista.scrollHeight >
        lista.clientHeight + 1

        &&

        tamanho >
        tamanhoMinimo

    ) {

        tamanho -=
            passo;


        tamanho =
            Math.max(
                tamanho,
                tamanhoMinimo
            );


        lista.style.fontSize =
            `${tamanho}pt`;


        atualizarEspacamentoLista(
            lista,
            tamanho
        );

    }

}



// ========================================
// ESPAÇAMENTO
// ========================================

function atualizarEspacamentoLista(
    lista,
    tamanho
) {

    const itens =
        lista.querySelectorAll(
            ".item-evento"
        );


    let alturaMinima;
    let margemInferior;



    if (
        tamanho >= 8.5
    ) {

        alturaMinima =
            5.0;

        margemInferior =
            1.2;

    }

    else if (
        tamanho >= 7.5
    ) {

        alturaMinima =
            4.6;

        margemInferior =
            0.7;

    }

    else {

        alturaMinima =
            4.1;

        margemInferior =
            0.4;

    }



    itens.forEach(
        item => {

            item.style.minHeight =
                `${alturaMinima}mm`;


            item.style.marginBottom =
                `${margemInferior}mm`;

        }
    );

}



// ========================================
// PARTE 2
// RENDERIZAR PLANNER
// ========================================

function renderizarPlanner() {

    plannerMensal.innerHTML =
        "";



    for (
        let mes = 0;
        mes < 12;
        mes++
    ) {

        const pagina =
            criarPaginaPlanner(
                mes
            );


        plannerMensal.appendChild(
            pagina
        );

    }

}



// ========================================
// CRIAR PÁGINA DO PLANNER
// ========================================

function criarPaginaPlanner(
    mes
) {

    const pagina =
        document.createElement(
            "section"
        );


    pagina.classList.add(
        "pagina-planner"
    );


    /*
        Importante para sabermos
        qual mês esconder na impressão.
    */

    pagina.dataset.mes =
        mes;



    // ====================================
    // CABEÇALHO
    // ====================================

    const cabecalho =
        document.createElement(
            "header"
        );


    cabecalho.classList.add(
        "planner-cabecalho"
    );



    // ====================================
    // LOGO
    // ====================================

    const areaLogo =
        document.createElement(
            "div"
        );


    areaLogo.classList.add(
        "planner-logo-area"
    );



    const logo =
        document.createElement(
            "img"
        );


    logo.src =
        "logo-panorama.png";


    logo.alt =
        "Colégio Panorama";


    logo.classList.add(
        "planner-logo"
    );


    areaLogo.appendChild(
        logo
    );



    // ====================================
    // TÍTULO
    // ====================================

    const titulo =
        document.createElement(
            "div"
        );


    titulo.classList.add(
        "planner-titulo"
    );


    titulo.innerHTML =
        `${nomesMeses[mes]} <strong>${ano}</strong>`;



    const espacoDireita =
        document.createElement(
            "div"
        );



    cabecalho.appendChild(
        areaLogo
    );


    cabecalho.appendChild(
        titulo
    );


    cabecalho.appendChild(
        espacoDireita
    );


    pagina.appendChild(
        cabecalho
    );



    // ====================================
    // CONTEÚDO
    // ====================================

    const conteudo =
        document.createElement(
            "div"
        );


    conteudo.classList.add(
        "planner-conteudo"
    );



    // ====================================
    // CABEÇALHO DOS DIAS
    // ====================================

    const cabecalhoDias =
        document.createElement(
            "div"
        );


    cabecalhoDias.classList.add(
        "planner-dias-semana"
    );



    const cabecalhoSemana =
        document.createElement(
            "div"
        );


    cabecalhoSemana.classList.add(
        "planner-cabecalho-semana"
    );


    cabecalhoSemana.textContent =
        "SEM.";


    cabecalhoDias.appendChild(
        cabecalhoSemana
    );



    [
        "DOMINGO",
        "SEGUNDA",
        "TERÇA",
        "QUARTA",
        "QUINTA",
        "SEXTA",
        "SÁBADO"
    ].forEach(
        nomeDia => {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.classList.add(
                "planner-dia-semana"
            );


            elemento.textContent =
                nomeDia;


            cabecalhoDias.appendChild(
                elemento
            );

        }
    );


    conteudo.appendChild(
        cabecalhoDias
    );



    // ====================================
    // GRADE
    // ====================================

    const grade =
        document.createElement(
            "div"
        );


    grade.classList.add(
        "planner-grade"
    );



    const semanas =
        obterSemanasDoMes(
            mes
        );


    grade.style.gridTemplateRows =
        `repeat(${semanas.length}, 1fr)`;



    semanas.forEach(
    semana => {

        const numeroSemana =
            document.createElement(
                "div"
            );


        numeroSemana.classList.add(
            "planner-numero-semana"
        );


        // Usa uma data pertencente ao ano de 2027
        // para evitar que a primeira semana de janeiro
        // seja considerada semana 52/53 de 2026.

        const dataReferencia =
            semana.find(
                data =>
                    data.getFullYear() === ano
            ) || semana[0];


        numeroSemana.textContent =
            obterNumeroSemanaISO(
                dataReferencia
            );


        grade.appendChild(
            numeroSemana
        );



            semana.forEach(
                data => {

                    const celula =
                        criarCelulaPlanner(
                            data,
                            mes
                        );


                    grade.appendChild(
                        celula
                    );

                }
            );

        }
    );


    conteudo.appendChild(
        grade
    );



    // ====================================
    // DIAS LETIVOS
    // ====================================

    const rodape =
        document.createElement(
            "div"
        );


    rodape.classList.add(
        "planner-rodape"
    );

    if (mes === 8 && setembroAmarelo) {
        const acaoSetembro = document.createElement("div");
        acaoSetembro.classList.add("planner-setembro-amarelo");
        acaoSetembro.textContent = "01 A 30 - SETEMBRO AMARELO";
        rodape.appendChild(acaoSetembro);
    }




    const quantidade =
        Number(
            diasLetivos[mes]
        ) || 0;



    rodape.textContent =
        quantidade > 0

            ? `${quantidade} DIAS LETIVOS`

            : "";



    conteudo.appendChild(
        rodape
    );


    pagina.appendChild(
        conteudo
    );



    return pagina;

}



// ========================================
// CÉLULA DO PLANNER
// ========================================

function criarCelulaPlanner(
    data,
    mesAtual
) {

    const celula =
        document.createElement(
            "div"
        );


    celula.classList.add(
        "planner-dia"
    );



    if (
        data.getMonth() !==
        mesAtual
    ) {

        celula.classList.add(
            "planner-dia-fora"
        );


        return celula;

    }



    const diaSemana =
        data.getDay();



    if (
        diaSemana === 0 ||
        diaSemana === 6
    ) {

        celula.classList.add(
            "planner-fim-semana"
        );

    }



    const numero =
        document.createElement(
            "span"
        );


    numero.classList.add(
        "planner-numero-dia"
    );


    numero.textContent =
        data.getDate();


    celula.appendChild(
        numero
    );



    const areaEventos =
        document.createElement(
            "div"
        );


    areaEventos.classList.add(
        "planner-eventos-dia"
    );



    const eventosDoDia =
        obterEventosDoDia(
            data
        );



    eventosDoDia.forEach(
        evento => {

            const texto =
                document.createElement(
                    "div"
                );


            texto.classList.add(
                "planner-evento"
            );


            texto.textContent =
                evento.nome;


            areaEventos.appendChild(
                texto
            );

        }
    );



    celula.appendChild(
        areaEventos
    );


    return celula;

}



// ========================================
// SEMANAS DO MÊS
// DOMINGO A SÁBADO
// ========================================

function obterSemanasDoMes(
    mes
) {

    const primeiroDia =
        new Date(
            ano,
            mes,
            1
        );


    const ultimoDia =
        new Date(
            ano,
            mes + 1,
            0
        );


    // ====================================
    // PRIMEIRO DOMINGO DA GRADE
    // ====================================

    const inicio =
        new Date(
            primeiroDia
        );


    inicio.setDate(

        inicio.getDate()

        -

        inicio.getDay()

    );


    // ====================================
    // ÚLTIMO SÁBADO DA GRADE
    // ====================================

    const fim =
        new Date(
            ultimoDia
        );


    fim.setDate(

        fim.getDate()

        +

        (6 - fim.getDay())

    );


    // ====================================
    // CRIAR SEMANAS
    // ====================================

    const semanas =
        [];


    let dataAtual =
        new Date(
            inicio
        );


    while (
        dataAtual <= fim
    ) {

        const semana =
            [];


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            semana.push(
                new Date(
                    dataAtual
                )
            );


            dataAtual.setDate(

                dataAtual.getDate()

                +

                1

            );

        }


        semanas.push(
            semana
        );

    }


    return semanas;

}



// ========================================
// NÚMERO DA SEMANA
// DOMINGO A SÁBADO
// ========================================

function obterNumeroSemanaISO(
    data
) {

    const dataAtual =
        new Date(
            data.getFullYear(),
            data.getMonth(),
            data.getDate()
        );


    const primeiroDiaAno =
        new Date(
            ano,
            0,
            1
        );


    // Domingo que inicia a primeira
    // semana visual de 2027

    const inicioPrimeiraSemana =
        new Date(
            primeiroDiaAno
        );


    inicioPrimeiraSemana.setDate(

        inicioPrimeiraSemana.getDate()

        -

        inicioPrimeiraSemana.getDay()

    );


    const diferencaDias =
        Math.floor(

            (
                dataAtual -
                inicioPrimeiraSemana
            )

            /

            86400000

        );


    return Math.floor(
        diferencaDias / 7
    ) + 1;

}



// ========================================
// CAMPOS DOS DIAS LETIVOS
// ========================================

function criarCamposDiasLetivos() {

    camposDiasLetivos.innerHTML =
        "";



    nomesMeses.forEach(
        (nomeMes, indice) => {

            const container =
                document.createElement(
                    "div"
                );


            container.classList.add(
                "campo-dia-letivo"
            );



            const label =
                document.createElement(
                    "label"
                );


            label.textContent =
                nomeMes;



            const input =
                document.createElement(
                    "input"
                );


            input.type =
                "number";


            input.min =
                "0";


            input.max =
                "31";


            input.value =
                diasLetivos[indice] || "";


            input.placeholder =
                "0";



            input.addEventListener(
                "input",
                function () {

                    const valor =
                        Number(
                            input.value
                        ) || 0;


                    diasLetivos[indice] =
                        valor;


                    salvarDiasLetivos();


                    renderizarCalendarios();

                    renderizarPlanner();


                    requestAnimationFrame(
                        function () {

                            ajustarTodasListasEventos();

                        }
                    );

                }
            );



            container.appendChild(
                label
            );


            container.appendChild(
                input
            );


            camposDiasLetivos.appendChild(
                container
            );

        }
    );

}



// ========================================
// GERENCIAMENTO
// ========================================

function renderizarGerenciamento() {

    listaGerenciamento.innerHTML =
        "";



    if (
        eventos.length === 0
    ) {

        listaGerenciamento.innerHTML =
            `
            <div class="sem-eventos">
                Nenhum evento cadastrado.
            </div>
            `;

        return;

    }



    eventos.forEach(
        evento => {

            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "item-gerenciamento"
            );



            const cabecalho =
                document.createElement(
                    "div"
                );


            cabecalho.classList.add(
                "cabecalho-item"
            );



            const cor =
                document.createElement(
                    "span"
                );


            cor.classList.add(
                "indicador-cor"
            );


            cor.style.backgroundColor =
                categorias[
                    evento.tipo
                ].cor;



            const nome =
                document.createElement(
                    "span"
                );


            nome.classList.add(
                "nome-gerenciamento"
            );


            nome.textContent =
                evento.nome;



            cabecalho.appendChild(
                cor
            );


            cabecalho.appendChild(
                nome
            );



            const datas =
                document.createElement(
                    "div"
                );


            datas.classList.add(
                "datas-gerenciamento"
            );


            datas.textContent =
                formatarPeriodoCompleto(
                    evento
                );



            const acoes =
                document.createElement(
                    "div"
                );


            acoes.classList.add(
                "acoes-evento"
            );



            const editar =
                document.createElement(
                    "button"
                );


            editar.type =
                "button";


            editar.classList.add(
                "botao-acao"
            );


            editar.textContent =
                "Editar";


            editar.addEventListener(
                "click",
                function () {

                    editarEvento(
                        evento.id
                    );

                }
            );



            const excluir =
                document.createElement(
                    "button"
                );


            excluir.type =
                "button";


            excluir.classList.add(
                "botao-acao",
                "botao-excluir"
            );


            excluir.textContent =
                "Excluir";


            excluir.addEventListener(
                "click",
                function () {

                    excluirEvento(
                        evento.id
                    );

                }
            );



            acoes.appendChild(
                editar
            );


            acoes.appendChild(
                excluir
            );



            item.appendChild(
                cabecalho
            );


            item.appendChild(
                datas
            );


            item.appendChild(
                acoes
            );


            listaGerenciamento.appendChild(
                item
            );

        }
    );

}



// ========================================
// EDITAR
// ========================================

function editarEvento(id) {

    const evento =
        eventos.find(
            evento =>
                evento.id === id
        );


    if (!evento) {
        return;
    }



    campoId.value =
        evento.id;


    campoNome.value =
        evento.nome;


    campoInicio.value =
        evento.inicio;


    campoFim.value =
        evento.fim;


    campoTipo.value =
        evento.tipo;



    botaoSalvar.textContent =
        "Salvar alterações";


    botaoCancelar.classList.remove(
        "oculto"
    );


    campoNome.focus();

}



// ========================================
// EXCLUIR
// ========================================

function excluirEvento(id) {

    const evento =
        eventos.find(
            evento =>
                evento.id === id
        );


    if (!evento) {
        return;
    }



    const confirmar =
        confirm(
            `Excluir o evento "${evento.nome}"?`
        );



    if (!confirmar) {
        return;
    }



    eventos =
        eventos.filter(
            evento =>
                evento.id !== id
        );



    salvarEventos();

    limparFormulario();

    renderizarTudo();

}



// ========================================
// LIMPAR FORMULÁRIO
// ========================================

function limparFormulario() {

    formulario.reset();


    campoId.value =
        "";


    botaoSalvar.textContent =
        "Adicionar evento";


    botaoCancelar.classList.add(
        "oculto"
    );

}



// ========================================
// SALVAR EVENTOS
// ========================================

function salvarEventos() {

    localStorage.setItem(

        `calendarioEscolar${ano}`,

        JSON.stringify(
            eventos
        )

    );

}



// ========================================
// CARREGAR EVENTOS
// ========================================

function carregarEventos() {

    const dados =
        localStorage.getItem(
            `calendarioEscolar${ano}`
        );



    if (!dados) {

        return [];

    }



    try {

        return JSON.parse(
            dados
        );

    }

    catch (erro) {

        console.error(
            "Erro ao carregar eventos:",
            erro
        );


        return [];

    }

}



// ========================================
// SALVAR DIAS LETIVOS
// ========================================

function salvarDiasLetivos() {

    localStorage.setItem(

        `diasLetivos${ano}`,

        JSON.stringify(
            diasLetivos
        )

    );

}



// ========================================
// CARREGAR DIAS LETIVOS
// ========================================

function carregarDiasLetivos() {

    const dados =
        localStorage.getItem(
            `diasLetivos${ano}`
        );



    if (!dados) {

        return Array(12).fill(0);

    }



    try {

        const valores =
            JSON.parse(
                dados
            );



        if (
            Array.isArray(
                valores
            )
        ) {

            return Array.from(

                {
                    length: 12
                },

                (_, indice) =>

                    Number(
                        valores[indice]
                    ) || 0

            );

        }

    }

    catch (erro) {

        console.error(
            "Erro ao carregar dias letivos:",
            erro
        );

    }



    return Array(12).fill(0);

}



// ========================================
// ORDENAR EVENTOS
// ========================================

function ordenarEventos() {

    eventos.sort(
        (a, b) =>

            criarDataLocal(
                a.inicio
            )

            -

            criarDataLocal(
                b.inicio
            )
    );

}



// ========================================
// GERAR ID
// ========================================

function gerarId() {

    return (

        Date.now()

        +

        Math.floor(
            Math.random() * 1000
        )

    );

}



// ========================================
// CRIAR DATA LOCAL
// ========================================

function criarDataLocal(
    dataTexto
) {

    const partes =
        dataTexto.split("-");


    return new Date(

        Number(
            partes[0]
        ),

        Number(
            partes[1]
        ) - 1,

        Number(
            partes[2]
        )

    );

}



// ========================================
// DATA DD/MM
// ========================================

function formatarDataCurta(
    data
) {

    const dia =
        String(
            data.getDate()
        ).padStart(
            2,
            "0"
        );


    const mes =
        String(
            data.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    return `${dia}/${mes}`;

}



// ========================================
// DATA COMPLETA
// ========================================

function formatarDataCompleta(
    data
) {

    return (

        formatarDataCurta(
            data
        )

        +

        "/"

        +

        data.getFullYear()

    );

}



// ========================================
// PERÍODO DA LEGENDA
// ========================================

function formatarPeriodoLegendaMes(
    evento,
    mes
) {

    const inicioOriginal =
        criarDataLocal(
            evento.inicio
        );


    const fimOriginal =
        criarDataLocal(
            evento.fim
        );


    const inicioMes =
        new Date(
            ano,
            mes,
            1
        );


    const fimMes =
        new Date(
            ano,
            mes + 1,
            0
        );


    const inicioVisivel =

        inicioOriginal <
        inicioMes

            ? inicioMes
            : inicioOriginal;


    const fimVisivel =

        fimOriginal >
        fimMes

            ? fimMes
            : fimOriginal;



    if (
        inicioOriginal.getTime() ===
        fimOriginal.getTime()
    ) {

        return inicioOriginal.getDate();

    }



    if (
        inicioOriginal.getMonth() !==
        fimOriginal.getMonth()
    ) {

        return (

            `${formatarDataCurta(
                inicioOriginal
            )} a `

            +

            `${formatarDataCurta(
                fimOriginal
            )}`

        );

    }



    if (
        inicioVisivel.getTime() ===
        fimVisivel.getTime()
    ) {

        return inicioVisivel.getDate();

    }



    return (

        `${inicioVisivel.getDate()} a `

        +

        `${fimVisivel.getDate()}`

    );

}



// ========================================
// PERÍODO COMPLETO
// ========================================

function formatarPeriodoCompleto(
    evento
) {

    const inicio =
        criarDataLocal(
            evento.inicio
        );


    const fim =
        criarDataLocal(
            evento.fim
        );



    if (
        evento.inicio ===
        evento.fim
    ) {

        return formatarDataCompleta(
            inicio
        );

    }



    return (

        `${formatarDataCompleta(
            inicio
        )} até `

        +

        `${formatarDataCompleta(
            fim
        )}`

    );

}

// ========================================
// SETEMBRO AMARELO - ARMAZENAMENTO
// ========================================

function carregarSetembroAmarelo() {
    return localStorage.getItem(
        `setembroAmarelo${ano}`
    ) === "true";
}

function salvarSetembroAmarelo() {
    localStorage.setItem(
        `setembroAmarelo${ano}`,
        String(setembroAmarelo)
    );
}

document.getElementById("sair").addEventListener("click", function () {
    sessionStorage.removeItem("logado");
    location.replace("login.html");
});