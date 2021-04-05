<template>
  <div id="app">
    <nav class="navbar-expand navbar row">
      <div class="col-lg-3 col-sm-6 navbar-logo">
        <router-link to="/" class="logo-link">
          <img
            src="../public/icon-left-font-monochrome-black.svg"
            alt="logo de l'entreprise"
          />
        </router-link>
      </div>
      <div class="navbar-nav mr-auto col-lg-9 col-sm-12">
        <li class="nav-item" v-if="isLogged">
          <router-link to="/posts" class="nav-link btn-2">
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            Articles</router-link
          >
        </li>
        <li class="nav-item" v-if="isLogged">
          <router-link to="/add-post" class="nav-link">Add article</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link" v-if="!isLogged"
            >Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" v-if="!isLogged"
            >Log in</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="'/user/' + userId" class="nav-link" v-if="isLogged"
            >My account</router-link
          >
        </li>
        <li class="nav-item d-flex align-items-center" v-if="isLogged">
          <a class="nav-link" @click="logout">Logout</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isLogged: false,
      userId: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      this.$router.push("/login");
    },
  },
  updated() {
    const token = localStorage.getItem("jwt");
    this.userId = localStorage.getItem("userId");

    if (token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
  },
};
</script>

<style lang="scss">
@import "./assets/custom.scss";
.container-fluid {
  padding-top: 0 !important;
}
#app {
  font-family: $font-family-serif;

  .cta-success {
    background-color: #228539;
    color: white;
  }

  .cta-primary {
    background-color: #0e529b;
    color: white;
  }

  .navbar {
    background-color: $dark-blue;
    color: $white;
    position: sticky;
    width: 100%;
    margin: 0;
    top: 0;
    z-index: 1;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .navbar-logo {
      text-align: center;

      img {
        width: 70%;

        @media (max-width: 768px) {
          width: 60%;
          margin: 1rem 0;
        }
      }
    }

    .navbar-nav {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: center;
        font-size: 0.8rem;
      }

      @media (max-width: 426px) {
        flex-direction: column;
        align-items: center;
      }

      .nav-item {
        .nav-link {
          color: $white;
          margin: 0 1rem;
          letter-spacing: 0;

          @media (max-width: 426px) {
            padding: 0;
          }

          svg {
            width: 0;
            height: 0;
          }

          &:after,
          &:before {
            backface-visibility: hidden;
            border: 1px solid rgba(#fff, 0);
            bottom: 0px;
            content: " ";
            display: block;
            margin: 0 auto;
            position: relative;
            transition: all 280ms ease-in-out;
            width: 0;
          }

          &:hover:after,
          &:hover:before {
            border-color: #fff;
            transition: width 350ms ease-in-out;
            width: 100%;
          }

          &:focus:after,
          &:focus:before {
            border-color: #fff;
            width: 100%;
          }

          &:hover:before {
            bottom: auto;
            top: 0;
            width: 100%;
          }
        }
      }
    }
  }

  h1 {
    font-family: $font-title;
    margin: 4rem auto;
  }

  .title {
    font-family: $font-title;
    margin: 2rem 0;
  }

  .articles-datas {
    font-size: 0.8rem;

    .author-name {
      b {
        font-family: $font-author;
        font-weight: 900;
      }
    }
  }

  .data {
    font-size: 0.8rem;
  }

  .articles-content {
    background-color: #f9f8f8;
    box-shadow: 0 45px 55px -35px #3a5275;
    padding: 2rem;
    border-radius: 10px;
    margin: 4rem 0;

    @media (max-width: 426px) {
      padding: 1rem 0.5rem;
    }

    &:hover {
      background: #fff;
      box-shadow: 0px 15px 26px rgba(0, 0, 0, 0.5);
      transition: all 0.2s ease-in;
      margin-top: 50px;
    }

    .articles {
      a {
        color: rgb(4, 4, 238);
        text-decoration: underline;
      }
    }
  }

  .single-post {
    button {
      font-size: 0.7rem;

      &:last-of-type {
        margin-top: 1rem;
      }
    }
  }

  .modal-content {
    padding: 1.5rem;
    margin-top: 15rem;

    .modal-header {
      padding: 0;
      display: flex;
      flex-direction: column;

      label {
        font-size: 1rem;
      }

      .close {
        font-size: 1rem !important;
        position: absolute;
        right: 1rem;
        top: -0.2rem;
        padding: 0.5rem !important;
        margin-top: 0 !important;
        outline: none !important;

        &:hover {
          color: black;
        }
      }
    }

    .modal-body {
      padding: 1.5rem 0 0;

      label {
        font-size: 1rem;
      }

      .content-comment {
        font-size: 0.8rem;
      }
    }

    .modal-footer {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>
