<template>
    <div class="titleContainer">Olá, {{ this.userName }}</div><br>
    <div class="revisionContainer">
        <div class="revisionTextContainer">
            <div class="title">Estás prestes a começar um jogo diário de 5 perguntas.</div>
            <div class="buttonDiv">
                <button class="buttonBack" @click.prevent="goBack()">Voltar</button>
                <button class="buttonNext" @click.prevent="startGame()">Começar</button>
            </div>
        </div>
        <div class="revisionImgContainer">
            <img class="revisionImg" src="../assets/doctors/img2.png" alt="Boneco" />
        </div>
    </div>

    <div class="divider"></div>
    <div class="doubts">
        Dúvidas sobre os jogos?
        <button class="buttonHelp" @click.prevent="this.showHelp = !this.showHelp">Ajuda</button>
    </div>
    <div class="tutorialsContainer" v-if="this.showHelp">
        Tens dúvidas de como jogar os diferentes modos de jogo?

        <div class="boxTutorial">
            <div class="tituloTutorial">Multipla Escolha</div>
            <img class="tutorialImg" src="../assets/1.png" alt="Escolha" />
            <div class="alignLeft">
                <ol>
                    <li>Início do Jogo: O jogo começa com uma pergunta ou situação apresentada na tela.</li>
                    <li>Opções de Resposta: Abaixo da pergunta, haverá várias opções de resposta, geralmente
                        identificadas por letras (A, B, C, D, etc.).</li>
                    <li>Escolha uma Opção: Leia todas as opções cuidadosamente e selecione a que você acha correta. Isso
                        pode ser feito clicando na opção desejada ou tocando na tela, dependendo do dispositivo.</li>
                    <li>Confirmar Resposta: Em alguns jogos, após escolher uma opção, você pode precisar confirmar sua
                        resposta clicando em um botão "Confirmar" ou "Enviar".</li>
                    <li>Receber Feedback: O jogo irá informar se a sua escolha está correta ou errada. Muitas vezes, uma
                        explicação adicional ou a resposta correta será exibida.</li>
                    <li>Próxima Pergunta: Após receber o feedback, você será levado à próxima pergunta e o processo se
                        repete.</li>
                </ol>
            </div>
        </div>

        <div class="boxTutorial">
            <div class="tituloTutorial">Verdadeiro ou Falso</div>
            <img class="tutorialImg" src="../assets/4.png" alt="Escolha" />
            <div class="alignLeft">
                <ol>
                    <li>Início do Jogo: O jogo começa com uma afirmação ou frase apresentada na tela.</li>
                    <li>Opções de Resposta: Abaixo da afirmação, haverá duas opções de resposta: "Verdadeiro" e "Falso".
                    </li>
                    <li> Escolha uma Opção: Leia a afirmação cuidadosamente e selecione se você acha que ela é
                        verdadeira ou
                        falsa. Isso pode ser feito clicando na opção desejada ou tocando na tela, dependendo do
                        dispositivo.
                    </li>
                    <li>Confirmar Resposta: Em alguns jogos, após escolher uma opção, você pode precisar confirmar sua
                        resposta clicando em um botão "Confirmar" ou "Enviar".</li>

                    <li>Receber Feedback: O jogo irá informar se a sua escolha está correta ou errada. Muitas vezes, uma
                        explicação adicional ou a resposta correta será exibida. </li>
                    <li>Próxima Afirmação: Após receber o feedback, você será levado à próxima afirmação e o processo se
                        repete.
                    </li>
                    <!-- <li>
                        Pontuação e Resultado: No final do jogo, sua pontuação será calculada com base no número de
                        respostas corretas. Você pode ver seu desempenho e, em alguns jogos, comparar com outros jogadores.
                    </li> -->
                </ol>
            </div>
        </div>

        <div class="boxTutorial">
            <div class="tituloTutorial">Ordenar</div>
            <img class="tutorialImg" src="../assets/3.png" alt="Escolha" />
            <div class="alignLeft">
                <ol>
                    <li>Início do Jogo: O jogo começa com uma lista de itens ou declarações apresentados na tela,
                        desordenados.</li>
                    <li>Objetivo: Seu objetivo é reorganizar os itens em ordem de importância, colocando o mais
                        importante no topo e o menos importante na parte inferior.</li>
                    <li>Reorganizar Itens: Para reorganizar, você deve clicar no item que pretende alterar posição com o
                        item que está na posição desejada.</li>
                    <li>Confirmar Ordem: Após organizar os itens na ordem desejada, você pode precisar confirmar sua
                        escolha clicando em um botão "Confirmar" ou "Enviar".</li>
                    <li>Receber Feedback: O jogo irá comparar sua ordem com a ordem correta e informar o quão bem você
                        se saiu. Muitas vezes, uma explicação adicional será fornecida.</li>


                </ol>
            </div>
        </div>

        <!-- <div class="boxTutorial">
            <div class="tituloTutorial">Alínea Correta</div>
            <img class="tutorialImg" src="../assets/2.png" alt="Escolha" />
            <div class="alignLeft">
                <ol>
                    <li>Início do Jogo: O jogo começa com uma pergunta ou situação apresentada na tela.</li>
                </ol>
            </div>
        </div> -->

    </div>

    <div>
        &nbsp;<br>
        &nbsp;<br>
        &nbsp;<br>
    </div>
</template>

<script>
import api from "../api/api.js";
export default {
    name: "BeginGame",
    data() {
        return {
            userName: null,
            showHelp: false,
        };
    },
    async created() {
        let userId = JSON.parse(localStorage.getItem("idUser"));
        if (!userId) {
            this.$router.push("/login")
        }

        this.userName = localStorage.getItem('first_name').slice(1).slice(0, -1);
        //this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        localStorage.setItem('playGame', true);
        localStorage.setItem('numberAnswersCorrect', 0);
        let answerCounter = {
            "1": 0,//"Dor": 0,
            "2": 0,//"Dispneia": 0,
            "3": 0,//"Insónia": 0,
            "4": 0,//"Fadiga": 0,
            "5": 0,//"Ansiedade": 0,
            "6": 0,//"Anorexia": 0,
            "7": 0,//"Diarreia": 0,
            "8": 0,//"Obstipação": 0,
            "9": 0,//"Vómitos": 0,
        }
        localStorage.setItem('answerCategoryCounter', JSON.stringify(answerCounter));

    },
    methods: {
        async startGame() {
            var category_id = parseInt(localStorage.getItem('tematicGame'));
            console.log(category_id)

            if (category_id > 0) {
                console.log("tematico")

                const response = await api({
                    method: 'get',
                    url: `questions/getFiveRandomQuestionsFromCategory/${category_id}`,
                    data: {}
                })
                console.log(response.data)
                localStorage.setItem('questions', JSON.stringify(response.data));
                localStorage.setItem('numberQuestion', 1);
                this.gameModeChooser(response.data[0].type_id);
            } else {
                console.log("random")
                const response = await api({
                    method: 'get',
                    url: `/questions/randomFiveQuestions`,
                    data: {}
                })
                //console.log(response.data)
                localStorage.setItem('questions', JSON.stringify(response.data));
                localStorage.setItem('numberQuestion', 1);
                this.gameModeChooser(response.data[0].type_id);
            }



            //this.$router.push("/main2")
            //console.log(JSON.parse(localStorage.getItem('questions')));
        },
        goBack() {
            this.$router.push("/main2")
        },
        gameModeChooser(nextGameMode) {
            if (nextGameMode == 1) {
                this.$router.push("/multipleChoice");
            } else if (nextGameMode == 2) {
                this.$router.push("/twoChoice");
            } else if (nextGameMode == 3) {
                this.$router.push("/dragMultipleChoice");
            } else if (nextGameMode == 4) {
                this.$router.push("/orderOptions");
            }
        }
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alignLeft {
    text-align: left;
}

.tutorialsContainer {
    margin-top: 30px;
    margin-bottom: 80px;
}

.titleContainer {
    display: flex;
    margin-top: 10px;
}

.revisionContainer {
    display: flex;
}

.revisionTextContainer {
    text-align: left;
}

.revisionImgContainer {
    margin-left: 0px;
}

.revisionImg {
    height: 125px;
}

.tutorialImg {
    height: 320px;
}

.tituloTutorial {
    margin: 10px;
    font-size: 18px;
    font-weight: 500;
}

.title {
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
}

.buttonDiv {
    display: flex;
}

.buttonNext {
    padding: 8px;
    margin-top: 10px;
    border-radius: 22px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 80%;
    margin-left: 5px;
}

.buttonBack {
    padding: 8px;
    margin-top: 10px;
    border-radius: 22px;
    background: rgb(126, 9, 9);
    background: linear-gradient(90deg, rgb(126, 17, 9) 0%, rgb(247, 84, 62) 100%);
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
}

.boxTutorial {
    padding: 3px;
    margin-top: 10px;
    border-radius: 22px;
    background: #BDECFF;
    font-size: 14px;
    border: 0;
    color: black;
    width: 90%;
    margin-left: 5px;
}

.doubts {
    margin-top: 30px;
}

.divider {
    flex-grow: 1;
    height: 1px;
    background-color: #095D7E;
    margin-top: 30px;
}

.buttonHelp{
	border-radius: 22px;
	background-color: #14967F;
	border: 0;
	color: white;
	cursor: pointer;
	font-size: 20px;
    width: 30%;
    height: 40px;
    margin-left: 2px;
}
</style>