<template>
    <div>
        <div class="heyUser">Olá, {{ this.userName }}</div>
        <!-- <div class="topImg"><img class="iconImg" src="../assets/doctors/img2.png" alt="doctor" /></div> -->
    </div>


    <h4>Selecione o que lhe preocupa mais hoje</h4>
    <div class="outsideBox">
        Legenda:<br>
        <button class="buttonSel green ">Selecionado</button><br>
        <button class="buttonSel blue ">Não Selecionado</button>
        <p></p>
        <div class="threelineBox">
            <button class="buttonNav " @click.prevent="addToSymptomList(1)"
                :style="{ backgroundColor: this.symptom[1] == true ? '#03435c' : '#4ab195' }">Dor<br>
                <img class="iconImg" src="../assets/symptoms/Dor.png" alt="Dor" />
            </button>
            <button class="buttonNav" @click.prevent="addToSymptomList(2)"
                :style="{ backgroundColor: this.symptom[2] == true ? '#03435c' : '#4ab195' }">Dispneia<br>
                <img class="iconImg" src="../assets/symptoms/Dispneia.png" alt="Dispneia" />
            </button>
            <button class="buttonNav" @click.prevent="addToSymptomList(3)"
                :style="{ backgroundColor: this.symptom[3] == true ? '#03435c' : '#4ab195' }">Insónia<br>
                <img class="iconImg" src="../assets/symptoms/Insonia.png" alt="Insonia" />
            </button>
        </div>
        <div class="threelineBox">
            <button class="buttonNav " @click.prevent="addToSymptomList(4)"
                :style="{ backgroundColor: this.symptom[4] == true ? '#03435c' : '#4ab195' }">Fadiga<br>
                <img class="iconImg" src="../assets/symptoms/Fadiga.png" alt="Fadiga" />
            </button>
            <button class="buttonNav" @click.prevent="addToSymptomList(5)"
                :style="{ backgroundColor: this.symptom[5] == true ? '#03435c' : '#4ab195' }">Ansiedade<br>
                <img class="iconImg" src="../assets/symptoms/Ansiedade.png" alt="Ansiedade" />
            </button>
            <button class="buttonNav" @click.prevent="addToSymptomList(6)"
                :style="{ backgroundColor: this.symptom[6] == true ? '#03435c' : '#4ab195' }">Anorexia<br>
                <img class="iconImg" src="../assets/symptoms/Anorexia.png" alt="Anorexia" />
            </button>
        </div>
        <div class="threelineBox">
            <button class="buttonNav" @click.prevent="addToSymptomList(7)"
                :style="{ backgroundColor: this.symptom[7] == true ? '#03435c' : '#4ab195' }">Diarreia<br>
                <img class="iconImg" src="../assets/symptoms/Diarreia.png" alt="Diarreia" />
            </button>
            <button class="buttonNav " @click.prevent="addToSymptomList(8)"
                :style="{ backgroundColor: this.symptom[8] == true ? '#03435c' : '#4ab195' }">Obstipação<br>
                <img class="iconImg" src="../assets/symptoms/Obstipação.png" alt="Obstipação" />
            </button>
            <button class="buttonNav " @click.prevent="addToSymptomList(9)"
                :style="{ backgroundColor: this.symptom[9] == true ? '#03435c' : '#4ab195' }">Vómitos<br>
                <img class="iconImg" src="../assets/symptoms/Vómitos.png" alt="Vómitos" />
            </button>
        </div>
    </div>
    <button class="buttonNext" @click.prevent="registerSymptoms()">Atualizar</button>
    <p></p>
    <button class="buttonBack" @click.prevent="goBack()">Voltar</button>

</template>

<script>
import api from '../api/api.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

/* eslint-disable */
export default {
    name: "CurrentSymptoms",
    data() {
        return {
            userName: "",
            symptom: [],
        };
    },
    async created() {
        let userId = JSON.parse(localStorage.getItem("idUser"));
        if (!userId) {
            this.$router.push("/login")
        }

        this.userName = localStorage.getItem('first_name').slice(1).slice(0, -1);

        try {
            const res = await api({
                method: "post",
                url: `/users/getUserSymptoms`,
                data: {
                    "idUser": userId,
                },
            }).catch((error) => {
                console.log(error);
            });
            console.log(res.data)
            for (let index = 0; index < res.data.length; index++) {
                this.symptom[res.data[index].questionCategory_id] = true;
            }
            
        } catch (error) {
            console.log(error.response?.data)
        }


    },
    methods: {
        addToSymptomList(symtomNumber) {
            //console.log(symtomNumber)
            this.symptom[symtomNumber] = !this.symptom[symtomNumber]
            //console.log(this.symptom)
        },
        async registerSymptoms() {
            let userId = JSON.parse(localStorage.getItem("idUser"));
            try {
                const res = await api({
                    method: "post",
                    url: `/users/createUserConditions`,
                    data: {
                        "idUser": userId,
                        "conditions": this.symptom,
                    },
                }).catch((error) => {
                    console.log(error);
                });
                
                toast.info(res.data, {
                    autoClose: 3000,
                });

                console.log(res.data)
            } catch (error) {
                console.log(error)
            }

            //this.$router.push("/main2")
        },
        goBack() {
            this.$router.push("/main2")
        }
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heyUser {
    margin-left: 1%;
    text-align: left;
    font-size: 23px;
}

.topImg {
    text-align: right;
    margin-top: -10%;
    margin-right: 20%;
}

.threelineBox {
    margin-bottom: 20px;
}

.buttonNav {
    margin: 5px;
    width: 30%;
    height: 110px;
    background-color: #2C85A7;
    border: none;
    border-radius: 20px;
    box-shadow: #cfcfcf75 2px 2px;
    color: white;
}

.buttonSel{
    margin: 2px;
    width: 50%;
    height: 30px;
    background-color: #2C85A7;
    border: none;
    border-radius: 20px;
    box-shadow: #cfcfcf75 2px 2px;
    color: white;
}

.blue{
    background-color: #03435c;

}
.green{
    background-color: #4ab195;
}

.selected {
    background-color: #03435c;
    box-shadow: #0b506b8c 2px 2px;
    color: white;
}

.iconImg {
    /* width: 105px; */
    height: 75px;
}

.buttonNext {
    padding: 10px;
    border-radius: 22px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    font-size: 16px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 40%;
}

.buttonBack {
    padding: 10px;
    border-radius: 22px;
    background-color: #a72c2c;
    font-size: 16px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 40%;
}
</style>