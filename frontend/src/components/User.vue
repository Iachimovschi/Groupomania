<template>
  <div id="user-page">
    <h1>Hello {{ user.firstName }} {{ user.lastName }}<br /></h1>
    <h2>Here is your data:</h2>
    <div class="col-lg-8 col-md-12 offset-lg-2 user-data">
      <p class="row">
        <span class="col-lg-6 col-4">First name :</span
        ><span class="col-lg-6 col-8"
          ><em>{{ user.firstName }}</em></span
        >
      </p>
      <p class="row">
        <span class="col-lg-6 col-4">Last name : </span
        ><span class="col-lg-6 col-8"
          ><em>{{ user.lastName }}</em></span
        >
      </p>
      <p class="row">
        <span class="col-lg-6 col-4">Email : </span
        ><span class="col-lg-6 col-8"
          ><em>{{ user.email }}</em></span
        >
      </p>
    </div>
    <button
      class="btn btn-danger d-flex"
      type=""
      @click="removeUser($event, user.id)"
    >
      Delete my account
    </button>
  </div>
</template>

<script>
import AuthentificationDataService from "../services/AuthentificationDataService";

export default {
  name: "User",

  data() {
    return {
      user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      submitted: false,
      readonly: true,
      theme: "",
    };
  },
  methods: {
    getUserById() {
      const id = this.$route.params.id;

      AuthentificationDataService.getProfilUser(id)
        .then((response) => {
          this.user = response.data.user;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeUser(e, id) {
      e.preventDefault();
      AuthentificationDataService.deleteUser(id)
        .then(() => {
          localStorage.removeItem("userId");
          localStorage.removeItem("jwt");
          localStorage.removeItem("role");
          this.$router.push("/register");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUserById();
  },
};
</script>

<style lang="scss">
@import "../assets/custom.scss";

#user-page {
  background-color: #f9f8f8;
  box-shadow: 0 45px 55px -35px #3a5275;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0 4rem;

  @media (max-width: 426px) {
    padding: 0.5rem;
  }

  h1 {
    margin: 2rem 0;
    text-align: center;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .user-data {
    background-color: white;
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 5px;

    p {
      font-size: 1.2rem;

      @media (max-width: 426px) {
        font-size: 1rem;
      }

      @media (max-width: 320px) {
        font-size: 0.8rem;
      }

      span {
        &:first-child {
          text-align: right;
        }
        &:nth-child(2) {
          //font-style: oblique;
          font-weight: 700;
        }
      }
    }
  }

  .btn {
    margin: 2rem auto;
  }
}
</style>
