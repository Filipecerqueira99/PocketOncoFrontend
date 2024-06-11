<template>
    <div>
        <div class="heyUser">Olá, {{ this.userName }}</div>
        <!-- <div class="topImg"><img class="iconImg" src="../assets/doctors/img2.png" alt="doctor" /></div> -->
    </div>
    
    
   <h4>Selecione o que lhe preocupa mais hoje</h4>
   <div class="outsideBox">
    <div class="threelineBox">
        <button class="buttonNav " @click.prevent="addToSymptomList(1)" :style="{ backgroundColor: this.symptom[1] == true ? '#03435c' : '#2C85A7' }">Dor<br>
            <img class="iconImg" src="../assets/symptoms/Dor.png" alt="Dor" />
        </button>
        <button class="buttonNav" @click.prevent="addToSymptomList(2)" :style="{ backgroundColor: this.symptom[2] == true ? '#03435c' : '#2C85A7' }">Dispneia
            <img class="iconImg" src="../assets/symptoms/Dispneia.png" alt="Dispneia" />
        </button>
        <button class="buttonNav" @click.prevent="addToSymptomList(3)" :style="{ backgroundColor: this.symptom[3] == true ? '#03435c' : '#2C85A7' }">Insónia
            <img class="iconImg" src="../assets/symptoms/Insonia.png" alt="Insonia" />
        </button>
    </div>
    <div class="threelineBox">
        <button class="buttonNav " @click.prevent="addToSymptomList(4)" :style="{ backgroundColor: this.symptom[4] == true ? '#03435c' : '#2C85A7' }">Fadiga
            <img class="iconImg" src="../assets/symptoms/Fadiga.png" alt="Fadiga" />
        </button>
        <button class="buttonNav" @click.prevent="addToSymptomList(5)" :style="{ backgroundColor: this.symptom[5] == true ? '#03435c' : '#2C85A7' }">Ansiedade
            <img class="iconImg" src="../assets/symptoms/Ansiedade.png" alt="Ansiedade" />
        </button>
        <button class="buttonNav" @click.prevent="addToSymptomList(6)" :style="{ backgroundColor: this.symptom[6] == true ? '#03435c' : '#2C85A7' }">Anorexia
            <img class="iconImg" src="../assets/symptoms/Anorexia.png" alt="Anorexia" />
        </button>
    </div>
    <div class="threelineBox">
        <button class="buttonNav" @click.prevent="addToSymptomList(7)" :style="{ backgroundColor: this.symptom[7] == true ? '#03435c' : '#2C85A7' }">Diarreia
            <img class="iconImg" src="../assets/symptoms/Diarreia.png" alt="Diarreia" />
        </button>
        <button class="buttonNav " @click.prevent="addToSymptomList(8)" :style="{ backgroundColor: this.symptom[8] == true ? '#03435c' : '#2C85A7' }">Obstipação
            <img class="iconImg" src="../assets/symptoms/Obstipação.png" alt="Obstipação" />
        </button>
        <button class="buttonNav " @click.prevent="addToSymptomList(9)" :style="{ backgroundColor: this.symptom[9] == true ? '#03435c' : '#2C85A7' }">Vómitos
            <img class="iconImg" src="../assets/symptoms/Vómitos.png" alt="Vómitos" />
        </button>
    </div>
   </div>
   <button class="buttonNext" @click.prevent="registerSymptoms()">Seguinte</button>
</template>

<script>
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
        if (!userId){
            this.$router.push("/login")
        }
        
        this.userName = localStorage.getItem('first_name').slice(1).slice(0, -1);
       

    },
  methods: {
    addToSymptomList(symtomNumber){
        console.log(symtomNumber)
        this.symptom[symtomNumber] = !this.symptom[symtomNumber]
        
    },
    registerSymptoms(){
        this.$router.push("/main2")
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .heyUser{
        margin-left: 1%;
        text-align: left;
        font-size: 23px;
    }
    .topImg{
        text-align: right;
        margin-top: -10%;
        margin-right: 20%;
    }

    .threelineBox{
        margin-bottom: 20px;
    }

    .buttonNav{
        margin: 5px;
        width: 30%;
        height: 110px;
        background-color: #2C85A7;
        border: none;
        border-radius: 20px;
        box-shadow: #cfcfcf75 2px 2px;
        color: white;
    }

    .selected{
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
</style>