<template>
    <div class="titleContainer">Os teus resultados:</div>
    <div class="left">Nível {{ level }}</div>
    <div class="outsideBox">
        <div class="insideBox" :style="{ width: points + '%'}">
            <div class="boxText">{{ points }}%</div>
        </div>
    </div>
    <div class="right">{{ (100 - points) + "% até nível " + (level + 1) }}</div>
    <div class="missionDay left">Missões do Dia</div>

    <div class="outsideBoxMission">
        <div class="Column" v-for="mission in this.missions" :key="mission.idMission" :style="{ backgroundColor: mission.current_value == mission.goal ? '#2C85A7' : '#BDECFF' }">
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

    <div class="achievements left">Conquistas</div>
    <div>
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
        };
    },
    async created() {
        this.idUser = localStorage.getItem('idUser');
        this.email = localStorage.getItem('email').slice(1).slice(0, -1);
        this.firstname = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        this.age = localStorage.getItem('age');
        this.points = parseInt(JSON.parse(localStorage.getItem("points")));
        this.streak = JSON.parse(localStorage.getItem("streak"));
        this.level = JSON.parse(localStorage.getItem("level"));

        //friends levels and points
        try {
             const res = await api({
                 method: "post",
                 url: `/users/getDailyMissions`,
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

    },
    methods: {

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
    background: #095D7E;
    border-radius: 20px;
}

.insideBox {
    height: 24px;
    width: 70%;
    background: #BDECFF;
    border-radius: 20px;
    margin-right: 10px;
    text-align: right;
}

.boxText {
    margin-right: 10px;
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

.outsideLevelPoints{
    width: 20%;
    display: flex;
    align-items: center;
}

</style>