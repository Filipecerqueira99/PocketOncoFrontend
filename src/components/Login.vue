<template>
  <form>
    <p class="title">PocketOnco</p>
    <img class="loginImg" src="../assets/loginimg.png" alt="Folder" /><br>
    Email
    <input type="text" v-model="email" placeholder=""><br>
    Senha
    <input type="password" v-model="password" placeholder=""><br>
    <button class="buttonLogin" @click.prevent="Login(this.email, this.password)">Entrar</button>
  </form>
  <div>
    Ainda não tem conta?
    <button class="buttonRegister" @click.prevent="signup()">Registe-se</button>
  </div>
  <div class="divider"></div>

    
    <button class="buttonRegister" @click.prevent="this.changePassword = !this.changePassword">Recuperar Senha</button>

    <div v-if="this.changePassword">
      <input type="text" v-model="email" placeholder=""><br>
      <button class="buttonLogin" @click.prevent="newPassword()">Email Recuperação</button>

    </div>
  <!-- <div class="mytextdiv">
    <div class="divider"></div>
    <div class="mytexttitle">
      OU
    </div>
    <div class="divider"></div>
  </div>
  <div>

    <button class="buttonGoogle" @click.prevent="Login(this.email, this.password)">
      <img class="googleImg" src="../assets/google.png" alt="Folder" />
      Login com Google
    </button> 
  </div>-->
  <div :class="this.formSent ? 'success' : 'failure'">
    <p>{{ this.showMessage }}</p>
  </div>
</template>

<script>
import api from '../api/api.js'
/* eslint-disable */
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      formSent: false,
      showMessage: "",
      changePassword: false
    }
  },
  methods: {
    async Login(email, password) {
      if (email === "" || password === "") {
        this.formSent = false
        this.showMessage = "Fill all the fields"
      } else {
        try {
          console.log(email, password)
          const response = await api({
            method: 'post',
            url: `/users/login`,
            data: {
              "email": email,
              "password": password
            }
          })
          console.log(response)
          if (response.data && response.data.accessToken !== " ") {
            var firstLoginOfTheDay = false;
            localStorage.setItem('email', JSON.stringify(response.data.email));
            localStorage.setItem('first_name', JSON.stringify(response.data.first_name));
            localStorage.setItem('last_name', JSON.stringify(response.data.last_name));
            localStorage.setItem('age', JSON.stringify(response.data.age));
            localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
            localStorage.setItem('idUser', JSON.stringify(response.data.idUser));
            localStorage.setItem('points', JSON.stringify(response.data.points));
            localStorage.setItem('streak', JSON.stringify(response.data.streak));
            localStorage.setItem('level', JSON.stringify(response.data.level));
            localStorage.setItem('today', JSON.stringify(response.data.today));
            localStorage.setItem('img', JSON.stringify(response.data.img));

            //adicionar awards caso não existam
            try {
              const res = await api({
                method: "post",
                url: `/missionawards/createUserAwards`,
                data: {
                  "idUser": response.data.idUser,
                },
              }).catch((error) => {
                console.log(error);
              });
              console.log(res.data)
            } catch (error) {
              console.log(error.response?.data)
            }

            //adicionar streak e ir para a página de sintomas caso seja o primeiro login
            var now = new Date();
            var day = now.getDate();
            if (day > response.data.today) {
              try {
                const res = await api({
                  method: "post",
                  url: `/users/updateStreakAndToday`,
                  data: {
                    "idUser": response.data.idUser,
                    "streak": parseInt(response.data.streak) + 1,
                    "today": day,
                  },
                }).catch((error) => {
                  console.log(error);
                });
                firstLoginOfTheDay = true;
                localStorage.setItem('today', day);
                console.log(res.data)
              } catch (error) {
                console.log(error.response?.data)
              }
            }



            console.log(response.data)
            if (firstLoginOfTheDay) {
              this.$router.push("/currentSymptoms")
            } else {
              this.$router.push("/main2")
            }

            this.showMessage = "login successful"
            this.formSent = true
          } else {
            this.formSent = false
            this.showMessage = response.data.message
          }
        } catch (error) {
          console.log(error.response.data)
          this.formSent = false
        }
      }
      setTimeout(() => {
        this.showMessage = ""
      }, 5000)
    },
    signup() {
      this.$router.push("/signup")
    },
    newPassword(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: Poppins;
}

.success {
  color: green;
}

.failure {
  color: red;
}

form {
  width: 100%;
  /* font-family: 'Montserrat'; */
}

form * {

  box-sizing: border-box;
  margin: 5px;
  font-size: 18px;
}

form>div {
  text-align: center;
  padding-bottom: 50px;
}

.buttonLogin {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #2C85A7;
  border: 0;
  color: white;
  cursor: pointer;
  width: 40%;
}

.buttonLogin:hover {
  opacity: 0.7;
}

.buttonRegister {
  background-color: #2c84a700;
  border: 0;
  color: #08394B;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.buttonRegister:hover {
  color: #bdecff;
}

.buttonGoogle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 10px;
  border-radius: 30px;
  border: solid 2px rgb(223, 223, 223);
  background-color: #ffffff;
  color: #08394B;
  cursor: pointer;
  width: 60%;
}

input {
  border-radius: 30px;
  padding: 10px;
  border: 1px solid #bdecff;
  font-size: 16px;
  background-color: #BDECFF;
  color: #000000;
  width: 70%;
}

.title {
  font-size: 28px;
}

.loginImg {
  width: 80px;
  height: 110px;
  margin-bottom: 20px;
}

.googleImg {
  width: 30px;
  height: 30px;
}



.mytextdiv {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.mytexttitle {
  flex-grow: 0;
  margin-left: 10px;
  margin-right: 10px;
}

.divider {
  flex-grow: 1;
  height: 1px;
  background-color: #9f9f9f;
}
</style>