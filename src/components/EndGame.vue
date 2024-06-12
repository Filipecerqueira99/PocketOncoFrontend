<template>
    <div class="titleContainer">Olá, {{ this.userName }}</div><br>
    <div class="revisionContainer">
        <div class="revisionTextContainer">
            <div class="title">Parabéns por mais uma aula feita!</div>
            <!-- <div class="buttonDiv">
                <button class="buttonBack" @click.prevent="goBack()">Voltar</button>
            </div> -->
        </div>
        <div class="revisionImgContainer">
            <img class="revisionImg" src="../assets/doctors/img4.png" alt="Boneco" />
        </div>
    </div>

    <h3>Aqui estão os teus resultados:</h3>

    <div class="blockExplanation">

        <div class="result">Conseguiste um total de: <b>{{ this.numberAnswersCorrect }}</b> respostas corretas!</div>

        <div class="answerCorrect" v-if="parseInt(this.numberAnswersCorrect) >= 4">Que resultado Fantástico! Ótimo
            trabalho!
            🎉</div>
        <div class="answerMid" v-if="parseInt(this.numberAnswersCorrect) == 3">Estás a meio caminho do sucesso! Continua
            a
            esforçar-te, cada passo é um progresso. 🚀</div>
        <div class="answerWrong" v-if="parseInt(this.numberAnswersCorrect) < 3">O resultado não foi o melhor porém estás
            no caminho certo! Continua a tentar, estás a aprender! 🌟</div>



    </div>
    <button class="buttonBack" @click.prevent="goBack()">Menu Inicial</button>

    <div>
        &nbsp;<br>
        &nbsp;<br>
        &nbsp;<br>
    </div>
</template>

<script>
import api from "../api/api.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
/* eslint-disable */
export default {
    name: "BeginGame",
    data() {
        return {
            userName: "",
            numberAnswersCorrect: "",
        };
    },
    async created() {
        let userId = JSON.parse(localStorage.getItem("idUser"));
        if (!userId){
            this.$router.push("/login")
        }
        this.userName = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.numberAnswersCorrect = parseInt(localStorage.getItem('numberAnswersCorrect'));

        var idUser = parseInt(localStorage.getItem('idUser'));
        var points = parseInt(localStorage.getItem('points'));
        points = points + this.numberAnswersCorrect;
        var level = parseInt(localStorage.getItem('level'));

        const response = await api({
            method: 'post',
            url: `users/updateUserPoints/${idUser}`,
            data: {
                "points": points,
                "level": level
            }
        })

        if (points >= 100) {
            localStorage.setItem('points', 0);
            localStorage.setItem('level', level + 1);
        } else {
            localStorage.setItem('points', points);
        }

        var texto = ""
        if (response.data > 0) {
            texto = "Recebeste " + this.numberAnswersCorrect + " pontos! Continua assim! 🎆";
        } else {
            texto = "Recebeste 0 pontos! Na próxima certamente vai correr melhor! 🍀";
        }

        toast.info(texto, {
            autoClose: 3000,
        });


        var category_id = parseInt(localStorage.getItem('tematicGame'));
        console.log(category_id)
        if (category_id != 0) {
            try {
                const res = await api({
                    method: "post",
                    url: `/missionawards/updateDailyMission`,
                    data: {
                        "idUser": idUser,
                        "category_id": category_id,
                    },
                }).catch((error) => {
                    console.log(error);
                });
                console.log(res.data)
                toast.info(res.data, {
                    autoClose: 3000,
                });

            } catch (error) {
                console.log(error.response?.data)
            }
        }

        //adicionar numero de respostas corretas para cada categoria que acertou perguntas
        var answerCategoryCounter = JSON.parse(localStorage.getItem('answerCategoryCounter'));
        console.log(answerCategoryCounter);

        for (const property in answerCategoryCounter) {
            console.log(`${property}`);
            console.log(`${answerCategoryCounter[property]}`);

            try {
                const res = await api({
                    method: "post",
                    url: `/missionawards/updateUserAwards`,
                    data: {
                        "idUser": idUser,
                        "category_id": parseInt(`${property}`),
                        "points": parseInt(`${answerCategoryCounter[property]}`),
                    },
                }).catch((error) => {
                    console.log(error);
                });
                console.log(res.data)
                /* toast.info(res.data, {
                    autoClose: 3000,
                }); */

            } catch (error) {
                console.log(error.response?.data)
            }
        }

        /* try {
            const res = await api({
                method: "post",
                url: `/missionawards/updateDailyMission`,
                data: {
                    "idUser": idUser,
                    "category_id": category_id,
                },
            }).catch((error) => {
                console.log(error);
            });
            console.log(res.data)
            toast.info(res.data, {
                autoClose: 3000,
            });

        } catch (error) {
            console.log(error.response?.data)
        } */



        //resetar caso tenha sido jogo tematico
        localStorage.setItem('tematicGame', 0);

    },
    methods: {
        goBack() {
            this.$router.push("/main2")
        },

    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blockExplanation {
    text-align: center;
    padding: 10px;
    border-radius: 22px;
    background-color: #BDECFF;
    border: 0;
    width: 90%;
}

.result {
    margin-top: 5px;
    margin-bottom: 10px;
}

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
    margin-top: 6px;
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
    margin-top: 40px;
    border-radius: 22px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 50%;
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

.answerCorrect {
    color: #CC9900;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin-bottom: 10px;
}

.answerMid {
    color: #5fcf77;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin-bottom: 10px;
}

.answerWrong {
    color: #E84558;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin-bottom: 10px;
}
</style>