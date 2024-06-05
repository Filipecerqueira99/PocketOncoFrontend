<template>
    <div class="outsideBox">
        <div class="Column1">
            <div class="left">
                <div class="titleContainer">{{ this.firstname + " " + this.lastname }}</div>
                <div class="subTitleContainer">Registado desde aaaaaaaaaa</div>
            </div>
            <div class="twoButtons">
                <button class="buttonAddFriends" @click.prevent="dailyGame()"><img class="iconImg"
                        src="../assets/icons/addFriends.png" alt="addFriends" /> Adicionar Amigos</button>
                <button class="buttonShare" @click.prevent="dailyGame()"><img class="iconImg"
                        src="../assets/icons/share.png" alt="share" /> </button>
            </div>
        </div>
    </div>

    <div class="imageBox">
        <img class="userImg" src="../assets/mainimg.png" alt="mainimg" /><br>
    </div>

    <div class="outsideBox">
        <div class="Column">
            <div class="friendName">Nível</div>
            <div class="outsideLevelPoints">
                5
            </div>
        </div>
        <div class="ColumnLine">
            <img class="lineImg" src="../assets/line.png" alt="mainimg" />
        </div>
        <div class="Column">
            <div class="friendName">Dias</div>
            <div class="outsideLevelPoints">
                3
            </div>
        </div>
        <div class="ColumnLine">
            <img class="lineImg" src="../assets/line.png" alt="mainimg" />
        </div>
        <div class="Column">
            <div class="friendName">Amigos</div>
            <div class="outsideLevelPoints">
                2
            </div>
        </div>
    </div>

    <div class="titleContainer">Sugestões de Amigos</div>

    <div class="outsideBoxFriends">
        <div class="ColumnFriends">
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
        </div>
        <div class="ColumnFriends">
            <div class="friendName">Amigo1</div>
            <img class="friendsImg" src="../assets/loginimg.png" alt="friendsImg" />
            <div class="addFriends">
                Adicionar
            </div>
        </div>
    </div>

    <div class="titleContainer">Progresso Semanal</div>

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

    <div class="subTitleContainer">Parabéns! Continua com este ritmo!</div>

    <div class="buttonOnRight">
        <button class="buttonNext" @click.prevent="settins()"><img class="iconImg" src="../assets/icons/setting.png"
                alt="setting" />  Definições</button>
    </div>


</template>

<script>
/* eslint-disable */
import { stringifyQuery } from 'vue-router';
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
            editMode: false,
        };
    },
    async created() {
        this.idUser = localStorage.getItem('idUser');
        this.email = localStorage.getItem('email').slice(1).slice(0, -1);
        this.firstname = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        this.age = localStorage.getItem('age');


    },
    methods: {
        async editProfile(email, currentPassword, newPassword, firstname, lastname, age) {
            console.log(email, currentPassword, newPassword, firstname, lastname, age)
            if (email === "" || firstname === "" || lastname === "" || age === "") {
                toast.warn("Porfavor preencha todos os campos.", {
                    autoClose: 3000,
                });
            } else {
                try {
                    const res = await api({
                        method: "post",
                        url: `/users/editprofile`,
                        data: {
                            "idUser": this.idUser,
                            "email": email,
                            "currentPassword": currentPassword,
                            "newPassword": newPassword,
                            "first_name": firstname,
                            "last_name": lastname,
                            "age": age,
                        },
                    }).catch((error) => {
                        console.log(error);
                    });
                    if (typeof res.data === "object") {
                        toast.success("Utilizador atualizado com sucesso!", {
                            autoClose: 3000,
                        });
                        localStorage.setItem('email', email);
                        localStorage.setItem('first_name', firstname);
                        localStorage.setItem('last_name', lastname);
                        localStorage.setItem('age', age);
                    } else {
                        toast.warn(res.data, {
                            autoClose: 3000,
                        });
                    }

                } catch (error) {
                    toast.warn(error.response?.data, {
                        autoClose: 3000,
                    });
                }
            }
            setTimeout(() => {
            }, 5000);
        },
        settins(){
            this.$router.push("/userProfile")
        }
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.buttonOnRight{
    text-align: right;
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
    width: 40%;
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
    width: 50px;
    height: 70px;
    margin-bottom: 0px;
}

.addFriends {
    background-color: #4897B6;
    color: white;
    border-radius: 20px;
    margin: 4px;
    font-size: 15px;
}

.ColumnFriends {
    display: table-cell;
    background-color: #BDECFF;
    border-radius: 20px;
    box-shadow: 0px 3px 1px 1px #abbec6;
}

.outsideBoxFriends {
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
    width: 50px;
    height: 80px;
    margin-left: 30px;
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
    width: 50%;
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