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
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imageBox {
    position: fixed;
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

.userImg{
    width: 50px;
    height: 80px;
    margin-left: 30px;
}

.outsideBox {
    margin-bottom: 30px;
    display: table;
    width: 100%;
    table-layout: fixed;
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