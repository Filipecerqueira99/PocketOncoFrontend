<template>
    <div class="titleContainer">Os teus resultados:</div>
    <div class="left">Nível {{ level }}</div>
    <div class="outsideBox">
        <div class="insideBox" :style="{ width: points + '%' }">
            <div class="boxText">{{ points }}%</div>
        </div>
    </div>
    <div class="right">{{ (100 - points) + "% até nível " + (level + 1) }}</div>
    <div class="missionDay left">Missões do Dia</div>

    <div class="outsideBoxMission">
        <div class="Column" v-for="mission in this.missions" :key="mission.idMission"
            :style="{ backgroundColor: mission.current_value == mission.goal ? '#14967FA3' : '#E2FCD6' }">
            <div class="friendName">{{ mission.description }}</div>
            <div class="outsideLevelPoints">
                <b>{{ mission.current_value }}/{{ mission.goal }}</b>
            </div>
        </div>
        <!-- <div class="Column">
            <div class="friendName">Missão 2</div>
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
            </div>
        </div>
        <div class="Column">
            <div class="friendName">Missão 3</div>
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
            </div>
        </div> -->
    </div>
    <!-- <div>Missões todas concluidas!</div> -->

    <div class="flexLine">
        <div class="achievements left">Conquistas</div>
        <div class="achievementsHelp left" @click.prevent="this.help = !this.help">Dúvidas?</div>
    </div>
    <div v-if="this.help" class="achievementsExplanation left"><b>
            <p>Como é que funcionam as conquistas?</p>
        </b>
        As conquistas funcionam pela quantidade de perguntas que acerta para cada temática. Se fizer uma lição na
        temática "Dor" e acertar as 5 questões, irá receber 5 pontos para esta barra.<br>
        Quando atinge um número de questões certas por cada temática sobre de nível. Os níveis atuais existentes são:
        <ol>1. Principiante</ol>
        <ol>2. Competente</ol>
        <ol>3. Perito</ol>
        <ol>4. Mestre</ol>
        Acerte questões nos diferentes modos de jogo para se tornar Mestre em todas as temáticas ✨
    </div>
    <div v-for="award in this.awards" :key="award.award_id">
        <div class="left">{{ award.categoryName }} - {{ award.levelDesc }}</div>
        <div class="outsideBoxAwards" :style="{ backgroundColor: award.color }">
            <div class="insideBox" :style="{ width: Math.round(award.current_value * 100 / award.goal) + '%' }">
                <div class="boxText">{{ Math.round(award.current_value * 100 / award.goal) }}%</div>
            </div>
        </div>
    </div>
    <!-- <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div> -->

    <div class="BottomBaroutsideBox">
        <button class="BottomBarbuttonNav BottomBarmarginLeftNo" @click="action('/main2')">
            <img class="BottomBariconImg" src="../assets/icons/home.png" alt="Home" />
        </button>
        <button class="BottomBarbuttonNav BottomBarselected" @click="action('/userStatus')">
            <img class="BottomBariconImg BottomBaraward" src="../assets/icons/award.png" alt="Userstatus" />
        </button>
        <!-- <button class="buttonNav" @click.prevent="action("main")">
                <img class="iconImg" src="../assets/icons/ticket-detailed.png" alt="Home" />
            </button> -->
        <button class="BottomBarbuttonNav" @click="action('/scoreboard')">
            <img class="BottomBariconImg" src="../assets/icons/scoreboard.png" alt="Social" />
        </button>
        <button class="BottomBarbuttonNav" @click="action('/userGeral')">
            <img class="BottomBariconImg" src="../assets/icons/user.png" alt="Profile" />
        </button>
    </div>

    <div>
        &nbsp;<br>
        &nbsp;<br>
        &nbsp;<br>
    </div>
</template>

<script>
import api from '../api/api.js'
/* eslint-disable */
export default {
    name: "UserStatus", data() {
        return {
            idUser: "",
            email: "",
            firstname: "",
            lastname: "",
            age: "",
            points: 0,
            streak: 0,
            level: 0,
            missions: {},
            awards: {},
            help: false,
        };
    },
    async created() {
        this.idUser = localStorage.getItem('idUser');
        if (!this.idUser) {
            this.$router.push("/login")
        }
        this.email = localStorage.getItem('email').slice(1).slice(0, -1);
        this.firstname = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        this.age = localStorage.getItem('age');
        this.points = parseInt(JSON.parse(localStorage.getItem("points")));
        this.streak = JSON.parse(localStorage.getItem("streak"));
        this.level = JSON.parse(localStorage.getItem("level"));

        //create daily missions if needed
        //var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        //console.log(utc);
        try {
            const res = await api({
                method: "post",
                url: `/missionawards/createDailyMissions`,
                data: {
                    "idUser": this.idUser,
                },
            }).catch((error) => {
                console.log(error);
            });
            console.log(res.data)

        } catch (error) {
            console.log(error.response?.data)
        }

        //getDailyMissions
        try {
            const res = await api({
                method: "post",
                url: `/missionawards/getDailyMissions`,
                data: {
                    "idUser": this.idUser,
                },
            }).catch((error) => {
                console.log(error);
            });

            console.log(res.data)
            this.missions = res.data;

        } catch (error) {
            console.log(error.response?.data)
        }

        //user awards
        try {
            const res = await api({
                method: "post",
                url: `/missionawards/getUserAwards`,
                data: {
                    "idUser": this.idUser,
                },
            }).catch((error) => {
                console.log(error);
            });

            //console.log(res.data)

            this.awards = res.data;

            for (let index = 0; index < this.awards.length; index++) {
                const element = this.awards[index];
                console.log(element.categoryName)
                if (element.categoryName == "Dor") {
                    this.awards[index].color = "#98d7b7"
                } else if (element.categoryName == "Dispneia") {
                    this.awards[index].color = "#77c7a8"
                } else if (element.categoryName == "Insónia") {
                    this.awards[index].color = "#4ab195"
                } else if (element.categoryName == "Fadiga") {
                    this.awards[index].color = "#35a68c"
                } else if (element.categoryName == "Ansiedade") {
                    this.awards[index].color = "#14967F"
                } else if (element.categoryName == "Anorexia") {
                    this.awards[index].color = "#128b7f"
                } else if (element.categoryName == "Diarreia") {
                    this.awards[index].color = "#10807f"
                } else if (element.categoryName == "Obstipação") {
                    this.awards[index].color = "#0e767f"
                } else if (element.categoryName == "Vómitos") {
                    this.awards[index].color = "#0c6b7f"
                }
            }

            console.log(this.awards)

        } catch (error) {
            console.log(error.response?.data)
        }

    },
    methods: {
        action(value) {
            this.selectedPage = value;
            console.log(this.selectedPage)
            this.$router.push(value)
        },
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
    text-align: left;
}

.right {
    text-align: right;
}

.titleContainer {
    display: flex;
    font-size: 20px;
    font-weight: 600;
}

.outsideBox {
    margin-top: 10px;
    background: #BDECFF;
    border-radius: 20px;
}

.outsideBoxAwards {
    margin-bottom: 10px;
    background: #BDECFF;
    border-radius: 20px;
}

.insideBox {
    height: 24px;
    width: 70%;
    background: #095D7E;
    border-radius: 20px;
    margin-right: 10px;
    text-align: right;
}

.boxText {
    margin-right: 10px;
    color: white;
}


.missionDay {
    font-size: 18px;
    font-weight: 600;
}

.achievements {
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 5px;
}

.flexLine {
    display: flex;
}

.achievementsHelp {
    font-size: 14px;
    background-color: #095D7E;
    color: white;
    border-radius: 20px;
    padding: 5px;
    width: 18%;
    margin-bottom: 0px;
    height: 22px;
    margin-top: 18px;
    margin-left: 10px;
}

.achievementsExplanation {
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #095D7E;
    color: white;
    border-radius: 20px;
    padding: 5px;
}

.outsideBoxMission {
    margin-bottom: 0px;
    border-radius: 30px;

    /* display: table; */
    width: 100%;
    /*Optional*/
    table-layout: fixed;
    /*Optional*/
    border-spacing: 10px;
    /*Optional*/
}

.Column {
    display: flex;
    background-color: #BDECFF;
    border-radius: 20px;
    box-shadow: 0px 3px 1px 1px #abbec6;
    font-size: 15px;
    margin-top: 20px;

}

.friendName {
    margin-top: 5px;
    font-weight: 500;
    width: 80%;
}

.outsideLevelPoints {
    width: 20%;
    display: flex;
    align-items: center;
}
</style>