<template>
  <div id="index-page">
    <div id="login-box">
      <img id="logo-image-login" src="../assets/logo_Prescrypt.png" alt="Prescrypt logo">
      <p style="font-size: 26px; margin: 0; margin-bottom: 15px;">J'accède à mon <b>compte Prescrypt</b></p>
      <span id="error-span"></span>
      <form>
        <div class="user-box">
          <input id="username" class="bottomInput" type="text" placeholder="Mon adresse" name="" required=""
            checked="checked">
        </div>
        <div class="user-box">
          <input id="password" class="bottomInput" type="password" placeholder="Mot de passe" name="" required="">
        </div>

        <div class="toggle">
            <input type="radio" id="doctor" class="job" name="jobView" value="doctor" v-model="selectedOption" checked/>
            <label for="doctor">Médecins</label>
            <input type="radio" id="pharmacist" class="job" name="jobView" value="pharmacist" v-model="selectedOption"/>
            <label for="pharmacist">Pharmaciens</label>
            <input type="radio" id="administrator" class="job" name="jobView" value="administrator" v-model="selectedOption"/>
            <label for="administrator">Administrateurs</label>
        </div>

        <button id="connexion-button" v-on:click.prevent="authenticate">Me Connecter</button>
      </form>
    </div>
    <div id="doctor-box">
      <img id="doctor-image" src="../assets/doctor.png" alt="Doctor smiling">
      <div class="centered">
        <p id="slogan">Votre vérificateur d’ordonnances</p>
        <p id="secured">100% sécurisé</p>
        <img id="zigouigoui" src="../assets/zigouigoui.png" alt="Zigouigoui secured">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AuthentificationComponent',
    props: {},
    data() {
      return {
          selectedOption: 'doctor'
      };
    },
    methods: {
      async authenticate() {
        var job = "";

        switch(this.selectedOption) {
          case "doctor":
            job = "doctor";
            console.log("Authentification en tant que médecin");
            break;
          case "pharmacist":
            job = "pharmacist";
            console.log("Authentification en tant que pharmacien");
            break;
          case "administrator":
            job = "admin";
            console.log("Authentification en tant qu'administrateur");
            break;
        }

      try {
        let handleAuth = await fetch("http://localhost:9000/api/auth/" + job, {
          method: 'POST',
          body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });
        let userData = await handleAuth.json();
        userData.type = job;
        if (handleAuth.status == 200) {
          localStorage.setItem('user', JSON.stringify(userData));
          location.href = job + ".html";
        }
        let response = await handleAuth.json();
        console.log(response);

        if (handleAuth.status == 200) {
          if (job == "doctor") {
            document.cookie = "id=" + response.id + "; path=/doctor.html";
          }
          //location.href = job + ".html?"+ response.id;
          location.href = job + ".html";
        }
        else {
          console.log("User not registered");
          document.getElementById("error-span").innerHTML = "Nom d'utilisateur ou mot de passe incorrect";
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index-page {
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: right;
}

#login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 100vh;
}

.bottomInput {
  border: none;
  border-bottom: 2px solid #1817BA;
  width: 300px;
  padding: 8px;
}

#connexion-button {
  padding: 15px 25px 15px 25px;
  background: rgba(24, 23, 186, 0.46);
  border: none;
  color: white;
  font-variant: small-caps;
  font-size: 20px;
  cursor: pointer;
}

input::placeholder {
  font-size: 18px;
}

input {
  font-size: 18px;
  margin-bottom: 30px;
}

#error-span {
  font-size: 20px;
  color: red;
  font-style: italic;
  margin-bottom: 5px;
  height: 20px;
}

#logo-image-login {
  width: 350px;
  margin-bottom: 40px;
}

.radio {
  display: inline-block;
  margin: 10px;
}

.centered {
  position: absolute;
  width: 100%;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

#slogan {
  color: white;
  font-size: 3vw;
  font-weight: 600;
}

#secured {
  color: black;
  font-size: 2vw;
  font-weight: 600;
  padding: 0;
  margin: 0;
  margin-top: 10px;
}

#zigouigoui {
  margin: 0;
  padding-left: 80px;
  width: 89px;
  height: 20px;
  transform: translateY(-5px);
}

#doctor-box {
  position: relative;
  margin: 0;
  display: flex;
}

#doctor-image {
  width: 40vw;
  height: 100vh;
  z-index: -1;
  max-width: 100%;
}

  #doctor-image {
    width: 40vw;
    height : 100vh;
    z-index: -1;
    max-width: 100%;
  }

  .toggle {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  input[type="radio"].job {
    display: none;
    cursor: pointer;
    outline: none;
    transition: all .3s ease;
  }

  input[type="radio"].job + label {
    position: relative;
    text-align: center;
    font-size: 20px;
    font-variant: small-caps;
    background: rgba(24,23,186,0.05);
    border: none;
    width: 150px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    transition: all .3s ease;
  }

  #doctor + label {
    border-left: 2px solid rgba(24,23,186,0.63);
    border-top: 2px solid rgba(24,23,186,0.63);
    border-bottom: 2px solid rgba(24,23,186,0.63);
  } 

  #pharmacist + label {
    border: 2px solid rgba(24,23,186,0.63);
  }

  #administrator + label {
    border-right: 2px solid rgba(24,23,186,0.63);
    border-top: 2px solid rgba(24,23,186,0.63);
    border-bottom: 2px solid rgba(24,23,186,0.63);
  }

  input[type="radio"].job:checked + label {
    background: rgba(24,23,186,0.63);
    background-clip: padding-box;
    color: white;
  }

/*331 */
@media screen and (max-width:1200px) {
  #doctor-box {
    display: none;
  }

  #index-page {
    justify-content: center;
  }
}

@media screen and (max-height:600px) {
  #doctor-box {
    display: none;
  }

  #index-page {
    justify-content: center;
  }
}
</style>
