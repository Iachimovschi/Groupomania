<template>
  <form class="form-signin" id="app">
    <h1 style="text-align: center; margin-bottom: 4rem">
      Welcome to Groupomania!
    </h1>
    <div class="col-lg-6 col-md-8 col-sm-12 m-auto">
      <div class="mb-3">
        <label for="email">Email</label>
        <div class="input-group">
          <input
            name="email"
            type="email"
            id="email"
            class="form-control"
            v-model="user.email"
            placeholder="Ex: alexandre.dupon@gmail.com"
            required
            @keyup="resetErrors"
          />
        </div>
        <p class="error-message">{{ errors.email }}</p>
      </div>
      <div class="mb-3">
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-group" id="show_hide_password">
            <input
              name="password"
              id="password"
              class="form-control"
              v-model="user.password"
              placeholder=""
              required
              type="password"
              @keyup="resetErrors"
            />
          </div>
          <p class="error-message">{{ errors.password }}</p>
        </div>
      </div>
      <p class="error-message error-message-gen">{{ message }}</p>
      <button
        class="d-flex justify-content-center m-auto col-lg-3 col-md-4 col-sm-12 btn cta-success"
        type="submit"
        @click="login"
      >
        Log in
      </button>
    </div>
  </form>
</template>

<script>
import AuthentificationDataService from "../services/AuthentificationDataService";
import validator from "validator";

export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
      loggedIn: false,
      submitted: true,
      message: "",
    };
  },
  methods: {
    validateUserData() {
      const errors = {};
      if (this.user.email.length === 0) {
        errors.email = "Please fill in an email";
      }

      console.log(validator.isEmail(this.user.email));
      if (this.user.email.length !== 0 && !validator.isEmail(this.user.email)) {
        errors.email = "Please enter a correct email address";
      }

      if (this.user.password.length === 0) {
        errors.password = "Please enter a password";
      }

      return errors;
    },
    login(event) {
      event.preventDefault();
      const errors = this.validateUserData();
      if (Object.keys(errors).length) {
        this.errors = errors;
        return;
      }

      const data = {
        email: this.user.email,
        password: this.user.password,
      };

      AuthentificationDataService.connectUser(data)
        .then((response) => {
          localStorage.setItem("userId", JSON.stringify(response.data.userId));
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("role", response.data.role);

          if (localStorage.getItem("jwt") != null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("/posts");
            }
          }
        })
        .catch((error) => {
          this.message = "Incorrect password or email";
          console.log("error", error);
        });
    },
    resetErrors(e) {
      this.errors[e.target.name] = "";
    },
  },
};
</script>

<style lang="scss">
@import "../assets/custom.scss";

.form-connexion {
  margin: 4rem auto;
}

.error-message {
  font-size: 0.8rem;
  font-weight: bold;
  color: red;
}

.error-message-gen {
  text-align: center !important;
}
</style>
