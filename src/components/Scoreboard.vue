<template>
    <div class="titleContainer">Social</div>
    <div class="subTitleContainer">Como estão os teus amigos:</div>
    <div class="subtitle" v-if="!this.userResultsList">Adiciona amigos para veres como eles estão!</div>

    <div class="outsideBox" v-if="this.friendsValues">
        <div class="Column" v-for="friend in this.friendsValues" :key="friend.idUser">
            <div class="friendName">{{ friend.name }}</div>
            <img class="loginImg" :src="require(`../assets/profile/` + friend.img + `.png`)" alt="friend" />
            <div class="outsideLevelPoints">
                <div class="detailsFriend">nivel {{ friend.level }}</div>
                <div class="detailsFriend">{{ friend.streak }} dias</div>
            </div>
        </div>
<!--         <div class="Column">
            <div class="friendName">Amigo1</div>
            <img class="loginImg" src="../assets/loginimg.png" alt="Folder" />
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
                <div>Pontos: </div>
            </div>
        </div>
        <div class="Column">
            <div class="friendName">Amigo1</div>
            <img class="loginImg" src="../assets/loginimg.png" alt="Folder" />
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
                <div>Pontos: </div>
            </div>
        </div> -->
    </div>

    <div class="title">Tabela de Pontos</div>
    <div class="subtitle" v-if="this.userResultsList">Semanal</div>
    <div class="subtitle" v-if="!this.userResultsList">Adiciona amigos para veres como eles estão esta semana!</div>
    <div v-if="this.userResultsList">
        <div class="scoreboardTable">
            <div class="scoreboard" v-for="friend in this.userResultsList" :key="friend.idUser">
                <div class="score-row">
                    <div class="position">{{ friend.position }}º</div>
                    <div class="name">{{ friend.name }}</div>
                    <div class="points">{{ friend.weekly_points }}pts</div>
                </div>
                <!--             <div class="score-row">
                <div class="position">2</div>
                <div class="name">Jane Smith</div>
                <div class="points">90pts</div>
            </div>
            <div class="score-row yourself">
                <div class="position">3</div>
                <div class="name">You</div>
                <div class="points">90pts</div>
            </div>
            <div class="score-row">
                <div class="position">4</div>
                <div class="name">Jane Smith</div>
                <div class="points">90pts</div>
            </div> -->
                <!-- Add more rows as needed -->
            </div>
        </div>
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
    name: "Scoreboard", data() {
        return {
            idUser: "",
            email: "",
            firstname: "",
            lastname: "",
            age: "",
            points: 0,
            streak: 0,
            level: 0,
            userResultsList: 0,
            friendsValues: 0
        };
    },
    async created() {
        this.idUser = localStorage.getItem('idUser');
        if (!this.idUser){
            this.$router.push("/login")
        }
        this.email = localStorage.getItem('email').slice(1).slice(0, -1);
        this.firstname = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        this.age = localStorage.getItem('age');
        this.points = JSON.parse(localStorage.getItem("points"));
        this.streak = JSON.parse(localStorage.getItem("streak"));
        this.level = JSON.parse(localStorage.getItem("level"));


        //friends levels and points
        try {
             const res = await api({
                 method: "post",
                 url: `/users/getFriendsLevelPoints`,
                 data: {
                     "idUser": this.idUser,
                 },
             }).catch((error) => {
                 console.log(error);
             });
             
             console.log(res.data)
             this.friendsValues = res.data;
             
         } catch (error) {
             console.log(error.response?.data)
         }


        //scoreboard
         try {
             const res = await api({
                 method: "post",
                 url: `/users/getFriendsWeeklyResults`,
                 data: {
                     "idUser": this.idUser,
                 },
             }).catch((error) => {
                 console.log(error);
             });
             
            
             res.data.sort((a, b) => b.weekly_points - a.weekly_points);
            
             let i = 0;
             res.data.forEach(element => {
                 res.data[i].position = i + 1;
                 i++;
             });
             console.log(res.data)
             this.userResultsList = res.data;
             
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


.detailsFriend{
    margin-top: -5px;
    font-size: 14px;
}

.scoreboard {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
}

.score-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #fff;
    color: white;
}

.yourself {
    background-color: #14967FA3;
    border-radius: 18px;
}

.position {
    width: 10%;
    text-align: left;
}

.name {
    width: 60%;
    text-align: center;
}

.points {
    width: 30%;
    text-align: right;
}

.scoreboardTable {
    background-color: #14967e75;
    border-radius: 30px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 30px;
}

.title {
    font-size: 20px;
    font-weight: 600;
}

.subtitle {
    font-size: 16px;
    font-weight: 400;
}

.subTitleContainer {
    display: flex;
    margin-bottom: 10px;
}

.titleContainer {
    display: flex;
    font-size: 20px;
    font-weight: 600;
}

.loginImg {
    width: 80px;
    height: 80px;
    margin-bottom: 0px;
}

.outsideBox {
    background-color: #DEF6FF;
    box-shadow: 0px 8px 5px 5px #abbec6;
    margin-bottom: 30px;
    border-radius: 30px;

    display: table;
    width: 100%;
    /*Optional*/
    table-layout: fixed;
    /*Optional*/
    border-spacing: 10px;
    /*Optional*/

    display: flex;
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevents the items from wrapping to the next line */
}


.Column {
    background-color: #BDECFF;
    border-radius: 30px;
    box-shadow: 0px 3px 1px 1px #abbec6;


    flex: 0 0 auto; /* Prevent resizing and ensure all items have the same width */
    width: 140px; /* Fixed width for each item */
    height: 170px; /* Fixed height for each item */
    margin: 7px;
    background-color: lightblue;
    /*display: flex;*/
    align-items: center;
    justify-content: center;

}

.friendName {
    margin-top: 5px;
    font-size: 15px;
    padding: 5px;
    font-weight: 400;
}

.outsideLevelPoints {
    background-color: #4897B6;
    color: white;
    border-radius: 20px;
    margin: 5px;
}
</style>