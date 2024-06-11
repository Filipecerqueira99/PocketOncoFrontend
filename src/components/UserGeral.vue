<template>
    <div class="outsideBox">
        <div class="Column1">
            <div class="left">
                <div class="titleContainer">{{ this.firstname + " " + this.lastname }}</div>
                <div class="subTitleContainer">Registado desde 2024</div>
            </div>
            <div class="twoButtons">
                <button class="buttonAddFriends" @click.prevent="addFriendsLabel = !addFriendsLabel"><img
                        class="iconImg"  src="../assets/icons/share.png" alt="addFriends" /> Adicionar
                    Amigos</button>
                <button class="buttonShare" @click.prevent="dailyGame()"><img class="iconImg"
                        src="../assets/icons/share.png" alt="share" /> </button>
            </div>
        </div>
    </div>

    <div v-if="addFriendsLabel" class="friendsBox">
        <input type="text" v-model="emailAdd" placeholder="email">
        <button class="buttonAddFriend" @click.prevent="sendFriendRequest(emailAdd)">Adicionar</button>
    </div>

    <div class="imageBox" @click.prevent="changeImgProfile = !changeImgProfile">
        <img class="userImg" :src="require(`../assets/profile/` + img + `.png`)" alt="mainimg" /><br>
    </div>

    <div class="allImageBox" v-if="changeImgProfile">
        <br>
        Escolhe uma imagem de perfil:<br><br>
        <img class="selectUserImg" src="../assets/profile/img1.png" alt="mainimg" @click.prevent="changeProfileImage('img1')" />
        <img class="selectUserImg" src="../assets/profile/img2.png" alt="mainimg" @click.prevent="changeProfileImage('img2')" />
        <img class="selectUserImg" src="../assets/profile/img3.png" alt="mainimg" @click.prevent="changeProfileImage('img3')" /><br>
        <img class="selectUserImg" src="../assets/profile/img4.png" alt="mainimg" @click.prevent="changeProfileImage('img4')"  />
        <img class="selectUserImg" src="../assets/profile/img5.png" alt="mainimg" @click.prevent="changeProfileImage('img5')" />
        <img class="selectUserImg" src="../assets/profile/img6.png" alt="mainimg" @click.prevent="changeProfileImage('img6')" /><br>
        <img class="selectUserImg" src="../assets/profile/img7.png" alt="mainimg" @click.prevent="changeProfileImage('img7')" />
        <img class="selectUserImg" src="../assets/profile/img8.png" alt="mainimg" @click.prevent="changeProfileImage('img8')" />
        <img class="selectUserImg" src="../assets/profile/img9.png" alt="mainimg" @click.prevent="changeProfileImage('img9')" /><br>
        <img class="selectUserImg" src="../assets/profile/img10.png" alt="mainimg" @click.prevent="changeProfileImage('img10')"  />
        <img class="selectUserImg" src="../assets/profile/img11.png" alt="mainimg" @click.prevent="changeProfileImage('img11')" />
        <img class="selectUserImg" src="../assets/profile/img12.png" alt="mainimg" @click.prevent="changeProfileImage('img12')" /><br>
    </div>

    <div class="outsideBox">
        <div class="Column">
            <div class="friendName">Dias</div>
            <div class="outsideLevelPoints">
                {{ this.streak }}
            </div>
        </div>
        <div class="ColumnLine">
            <img class="lineImg" src="../assets/line.png" alt="mainimg" />
        </div>
        <div class="Column">
            <div class="friendName">Nível</div>
            <div class="outsideLevelPoints">
                {{ this.level }}
            </div>
        </div>
        <div class="ColumnLine">
            <img class="lineImg" src="../assets/line.png" alt="mainimg" />
        </div>
        <div class="Column">
            <div class="friendName">Pontos</div>
            <div class="outsideLevelPoints">
                {{ this.points }}
            </div>
        </div>
    </div>

    <div class="titleContainer">Sugestões de Amigos
        <div class="buttonListRequests">
            <button class="buttonListRequestsFriends" @click.prevent="listFriendRequests()">Ver
                pedidos Amizade</button>
        </div>
    </div>

    <div class="backgroundFriendsRequests" v-if="friendsRequestsLabel">
        <div class="titleRequestsContainer">Pedidos de amizade:</div>
        <!-- v-if="friendsRequestsLabel" -->
        <div v-for="friend in this.friendsRequestsList" :key="friend.idUserFriendsRequests">
            <div class="friendRequestsContainer">
                <button class="buttonListRequestsFriendsAdd" @click.prevent="addFriend(friend.email)">Adicionar</button>
                {{ friend.email }}
            </div>
        </div>
    </div>

    <div class="outsideBoxFriends">
        <div class="ColumnFriends" v-for="friend in this.friendsSugestionList" :key="friend.idUser">
            <div class="friendName">{{ friend.first_name }}</div>
            <img class="friendsImg" :src="require(`../assets/profile/` + friend.img + `.png`)" alt="friendsImg" />
            <div class="addFriends" @click.prevent="sendFriendRequest(friend.email)">
                Adicionar
            </div>
        </div>
        <!-- <div class="ColumnFriends">
            <div class="friendName">Amigo1</div>
            <img class="friendsImg" src="../assets/loginimg.png" alt="friendsImg" />
            <div class="addFriends">
                Adicionar
            </div>
        </div>
        <div class="ColumnFriends">
            <div class="friendName">Amigo1</div>
            <img class="friendsImg" src="../assets/loginimg.png" alt="friendsImg" />
            <div class="addFriends">
                Adicionar
            </div>
        </div> -->
    </div>



    <!-- <div class="titleContainer">Progresso Semanal</div>

    <table>
        <tr>
            <th></th>
            <th></th>
            <th class="header">Pontos</th>
            <th class="header">Corretos</th>
            <th class="header">Erros</th>
        </tr>
        <tr>
            <td class="thisWeek">Esta<br>Semana</td>
            <td class="lineTD"><img class="lineImgTable" src="../assets/line.png" alt="mainimg" /></td>
            <td><b>2</b></td>
            <td><b>2</b></td>
            <td><b>2</b></td>
        </tr>
        <tr>
            <td class="lastWeek">Semana<br>Passada</td>
            <td><img class="lineImgTable" src="../assets/line.png" alt="mainimg" /></td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
        </tr>
    </table>

    <div class="subTitleContainer">Parabéns! Continua com este ritmo!</div> -->

<div class="twoButtons">
    <div class="buttonOnLeft">
        <button class="buttonNext" @click.prevent="symptoms()"><img class="iconImg" src="../assets/icons/setting.png"
                alt="setting" /> Sintomas</button>
    </div>

    <div class="buttonOnRight">
        <button class="buttonNext" @click.prevent="settings()"><img class="iconImg" src="../assets/icons/setting.png"
                alt="setting" /> Definições</button>
    </div>
</div>
    <div>
        &nbsp;<br>
        &nbsp;<br>
        &nbsp;<br>
    </div>
</template>

<script>
/* eslint-disable */
import api from '../api/api.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "UserProfile", data() {
        return {
            idUser: "",
            email: "",
            currentPassword: "",
            newPassword: "",
            firstname: "",
            lastname: "",
            age: "",
            img: "",
            editMode: false,
            points: 0,
            streak: 0,
            level: 0,
            addFriendsLabel: false,
            friendsRequestsLabel: false,
            emailAdd: "",
            friendsRequestsList: {},
            friendsSugestionList: {},
            changeImgProfile: false,
        };
    },
    async created() {
        this.idUser = localStorage.getItem('idUser');
        this.email = localStorage.getItem('email').slice(1).slice(0, -1);
        this.firstname = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        this.age = localStorage.getItem('age');
        this.points = JSON.parse(localStorage.getItem("points"));
        this.streak = JSON.parse(localStorage.getItem("streak"));
        this.level = JSON.parse(localStorage.getItem("level"));
        this.img = localStorage.getItem('img').slice(1).slice(0, -1);

        try {
            const res = await api({
                method: "post",
                url: `/users/getSugestedNewFriends`,
                data: {
                    "idUser": this.idUser,
                },
            }).catch((error) => {
                console.log(error);
            });
            console.log(res.data)
            this.friendsSugestionList = res.data;
        } catch (error) {
            console.log(error.response?.data)
        }

    },
    methods: {
        settings() {
            this.$router.push("/userProfile")
        },
        symptoms(){
            this.$router.push("/currentSymptoms")
        },
        async sendFriendRequest(email) {
            if (email != "") {
                try {
                    const res = await api({
                        method: "post",
                        url: `/users/sendFriendRequest`,
                        data: {
                            "idUser1": this.idUser,
                            "email": email,
                        },
                    }).catch((error) => {
                        console.log(error);
                    });
                    console.log(res.data)
                    toast.info(res.data, {
                        autoClose: 3000,
                    });
                } catch (error) {
                    toast.warn(error.response?.data, {
                        autoClose: 3000,
                    });
                }
            }
        },
        async addFriend(email) {
            if (email != "") {
                try {
                    const res = await api({
                        method: "post",
                        url: `/users/addFriend`,
                        data: {
                            "idUser1": this.idUser,
                            "email": email,
                        },
                    }).catch((error) => {
                        console.log(error);
                    });
                    console.log(res.data)
                    toast.info(res.data, {
                        autoClose: 3000,
                    });
                } catch (error) {
                    toast.warn(error.response?.data, {
                        autoClose: 3000,
                    });
                }
            }
        },
        async listFriendRequests() {
            this.friendsRequestsLabel = !this.friendsRequestsLabel;
            try {
                const res = await api({
                    method: "post",
                    url: `/users/getFriendRequest`,
                    data: {
                        "idUser": this.idUser,
                    },
                }).catch((error) => {
                    console.log(error);
                });
                this.friendsRequestsList = res.data;
                console.log(this.friendsRequestsList)

            } catch (error) {
                toast.warn(error.response?.data, {
                    autoClose: 3000,
                });
            }
        },
        async changeProfileImage(imgRecieved){
            try {
                const res = await api({
                    method: "post",
                    url: `/users/editImgProfile`,
                    data: {
                        "idUser": this.idUser,
                        "img": imgRecieved,
                    },
                }).catch((error) => {
                    console.log(error);
                });
                toast.info(res.data, {
                        autoClose: 3000,
                    });
                this.changeImgProfile = false
                localStorage.setItem('img', JSON.stringify(imgRecieved));
                this.img = imgRecieved
                console.log(this.img)
            } catch (error) {
                toast.warn(error.response?.data, {
                    autoClose: 3000,
                });
            }
        }
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friendsBox {
    display: block ruby;
}

input {
    border-radius: 30px;
    padding: 6px;
    border: 1px solid #bdecff;
    font-size: 14px;
    background-color: #BDECFF;
    color: #000000;
    width: 50%;
}

.buttonAddFriend {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-top: 10px;
    border-radius: 22px;
    background: #2C85A7;
    font-size: 12px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 25%;
    margin-left: 5px;
}

.twoButtons{
    display: flex;
}

.buttonOnLeft{
    text-align: left;
}

.buttonOnRight {
    text-align: right;
    margin-left: 35%;
    margin-bottom: 200px
}

.buttonNext {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    margin-top: 10px;
    border-radius: 22px;
    background: #14967F;
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 90%;
}

.lineTD {
    vertical-align: middle;
}

.header {
    font-weight: 500;
    width: 70px;
}

.lastWeek {
    color: #3b3b3b;
}

.thisWeek {
    font-weight: bold;
}

.friendsImg {
    width: 80px;
    height: 80px;
    margin-bottom: 0px;
}

.addFriends {
    background-color: #4897B6;
    color: white;
    border-radius: 20px;
    margin: 4px;
    font-size: 15px;
    cursor: pointer;
}

.allImageBox{
    margin-top: 10px;
    margin-bottom: 10px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    color: white;
    border-radius: 20px;
    box-shadow: 0px 3px 1px 1px #abbec6;
}

.selectUserImg{
    width: 80px;
    height: 80px;
    margin-right: 10px;
    margin-left: 10px;
    /*background-color: #BDECFF;*/
    border-radius: 20px;
}

.backgroundFriendsRequests {
    margin-top: 10px;
    margin-bottom: 10px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    color: white;
    border-radius: 20px;
    box-shadow: 0px 3px 1px 1px #abbec6;
    padding: 10px;
}

.ColumnFriends {
    background-color: #BDECFF;
    border-radius: 30px;
    box-shadow: 0px 3px 1px 1px #abbec6;


    flex: 0 0 auto; /* Prevent resizing and ensure all items have the same width */
    width: 130px; /* Fixed width for each item */
    height: 150px; /* Fixed height for each item */
    margin: 10px;
    background-color: lightblue;
    /*display: flex;*/
    align-items: center;
    justify-content: center;

}

.outsideBoxFriends{
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


.imageBox {
    position: absolute;
    top: 35px;
    right: 20px;

    width: 110px;
    height: 110px;

    background-color: #BDECFF;
    box-shadow: 0px 3px 1px 1px #abbec6;
    border-radius: 30px;

    display: inline-flex;
    align-items: center;
}

.userImg {
    width: 80px;
    height: 80px;
    margin-left: 15px;
}

.lineImg {
    width: 10px;
    height: 50px;
}

.lineImgTable {
    width: 8px;
    height: 60px;
}

.ColumnLine {
    display: table-cell;
    width: 0px;
    vertical-align: bottom;
}

.outsideBox {
    margin-bottom: 30px;
    display: table;
    width: 100%;
    table-layout: fixed;

}

.friendName {
    margin-top: 5px;
}

.outsideLevelPoints {
    border-radius: 20px;
    margin: 5px;
    font-size: 20px;
    font-weight: bold;
}

.Column {
    display: table-cell;
    border-radius: 30px;
}


.Column1 {
    display: table-cell;
}

.Column2 {
    display: table-cell;
    background-color: #BDECFF;
    border-radius: 30px;
    box-shadow: 0px 3px 1px 1px #abbec6;
}


.profileImg {
    width: 100px;
    height: 100px;
}

.iconImg {
    width: 20px;
    height: 20px;
}

.twoButtons {
    display: flex;
}

.buttonListRequests {
    display: flex;
    justify-content: flex-end;
}

.buttonListRequestsFriends {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
    background: #2C85A7;
    font-size: 12px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 85%;
}

.buttonListRequestsFriendsAdd {
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
    background: #2C85A7;
    font-size: 12px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 25%;
}


.buttonShare {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-top: 10px;
    margin-left: 5px;
    border-radius: 22px;
    background: #2C85A7;
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 15%;
}



.buttonAddFriends {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-top: 10px;
    border-radius: 22px;
    background: #2C85A7;
    font-size: 12px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 45%;
}


.left {
    text-align: left;
}



.titleContainer {
    display: flex;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 600;
}

.titleRequestsContainer {
    display: flex;
    margin-top: 10px;
    font-weight: 500;
}

.friendRequestsContainer {
    display: flex;
    margin-top: 10px;
}

.subTitleContainer {
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 100;
    color: #3f3f3f;
}


.buttonRegister {
    margin-top: 30px;
    padding: 10px;
    border-radius: 22px;
    background-color: #2C85A7;
    border: 0;
    color: white;
    cursor: pointer;
    width: 50%;
    font-size: 18px;
}

.buttonRegister:hover {
    color: #bdecff;
}

.buttonCancel {
    margin-top: 30px;
    padding: 5px;
    border-radius: 22px;
    background-color: #a72c2c;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
    font-size: 17px;
}

.buttonConfirm {
    margin-top: 30px;
    padding: 5px;
    border-radius: 22px;
    background-color: #2ca782;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
    font-size: 17px;
}

.buttonDelete {
    margin-top: 30px;
    padding: 5px;
    border-radius: 22px;
    background-color: #501010;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
    font-size: 17px;
}
</style>