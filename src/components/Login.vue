<template>
  <p class="title">PocketOnco</p>
  <img class="loginImg" src="../assets/loginimg.png" alt="Folder" /><br>
  <form v-if="!this.newPassword">
    Email
    <input type="text" v-model="email" placeholder=""><br>
    Senha
    <input type="password" v-model="password" placeholder=""><br>
    <button class="buttonLogin" @click.prevent="Login(this.email, this.password)">Entrar</button>
  </form>
  <div v-if="!this.newPassword">
    Ainda não tem conta?
    <button class="buttonRegister" @click.prevent="signup()">Registe-se</button>
    <div class="divider"></div>
  </div>



  <button v-if="this.newPassword == false" class="buttonRegister"
    @click.prevent="this.changePassword = !this.changePassword">Recuperar Senha</button>

  <div v-if="this.changePassword && this.newPassword == false">
    <input type="text" v-model="emailNewPassword" placeholder=""><br>
    <button class="buttonNewPassword" @click.prevent="sendEmail()">Email Recuperação</button>

  </div>

  <div v-if="this.newPassword">
    <div class="title">Alterar Senha<br></div>
    Código:<br>
    <input type="text" v-model="code" placeholder=""><br>
    Nova senha:
    <input type="password" v-model="passwordNew" placeholder=""><br>
    Confirmar senha:
    <input type="password" v-model="passwordNew2" placeholder=""><br>
    <button class="buttonNewPassword" @click.prevent="changeToNewPassword()">Alterar</button><br>
    <button class="buttonLogin" @click.prevent="this.newPassword = false; this.changePassword = false;">Voltar</button>

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
<!--   <div :class="this.formSent ? 'success' : 'failure'">

  </div> -->
</template>

<script>
import api from '../api/api.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
/* eslint-disable */
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      formSent: false,

      changePassword: false,
      newPassword: false,
      emailNewPassword: "",
      passwordNew: "",
      passwordNew2: "",
      code: "",
    }
  },
  methods: {
    async Login(email, password) {
      if (email === "" || password === "") {
        this.formSent = false
        toast.info("Preenche os campos todos!", {
              autoClose: 3000,
            });
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


            toast.info("Login com sucesso!", {
              autoClose: 3000,
            });
            this.formSent = true
          } else {
            this.formSent = false
            toast.error(response.data.message, {
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.log(error.response.data)
          this.formSent = false
        }
      }
      setTimeout(() => {
      }, 5000)
    },
    signup() {
      this.$router.push("/signup")
    },
    async sendEmail() {
      try {
        const res = await api({
          method: "post",
          url: `/users/updateToNewPassword`,
          data: {
            "email": this.emailNewPassword
          },
        }).catch((error) => {
          console.log(error);
        });

        toast.info(res.data, {
          autoClose: 3000,
        });

        if (res.data == "Email Enviado!") {
          this.newPassword = true;
        }
      } catch (error) {
        console.log(error.response?.data)
      }
    },
    async changeToNewPassword() {
      if (this.passwordNew == this.passwordNew2) {
        try {
          const res = await api({
            method: "post",
            url: `/users/updatePasswordReset`,
            data: {
              "email": this.emailNewPassword,
              "password": this.passwordNew,
              "code": this.code,
            },
          }).catch((error) => {
            console.log(error);
          });
          this.newPassword = false;
          this.changePassword = false;
          toast.info(res.data, {
            autoClose: 3000,
          });
        } catch (error) {
          console.log(error.response?.data)
        }
      } else {
        toast.info("Senhas têm de ser iguais.", {
          autoClose: 3000,
        });
      }
    },
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

.buttonNewPassword {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #14967F;
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