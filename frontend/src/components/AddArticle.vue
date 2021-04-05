<template>
  <div class="add-post-page container">
    <div class="add-post-form col-lg-8 col-sm-12">
      <h1>Please write your article</h1>
      <div>
        <div class="form-group">
          <label for="title">Title article</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="post.title"
            name="title"
            @keyup="resetErrors"
          />
          <p class="error-mesage">{{ errors.title }}</p>
        </div>

        <div class="form-group">
          <label for="description">Description article</label>
          <textarea
            class="form-control"
            id="description"
            required
            v-model="post.description"
            name="description"
            @keyup="resetErrors"
          />
          <p class="error-mesage">{{ errors.description }}</p>
        </div>
        <p class="text-success mesage-succes" v-html="legacySystemHTML"></p>

        <button
          @click="savePost"
          class="btn cta-success col-lg-3 col-md-4 col-sm-12 m-auto d-flex justify-content-center"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "post",
  data() {
    return {
      post: {
        title: "",
        description: "",
      },
      errors: {
        title: "",
        description: "",
      },
      legacySystemHTML: "",
      submitted: false,
    };
  },
  methods: {
    validateUserData() {
      const errors = {};
      if (this.post.title.length === 0) {
        errors.title = "Please complete all fields";
      }
      if (this.post.description.length === 0) {
        errors.description = "Please complete all fields";
      }

      return errors;
    },
    savePost() {
      const errors = this.validateUserData();
      if (Object.keys(errors).length) {
        this.errors = errors;
        return;
      }

      let data = {
        title: this.post.title,
        content: this.post.description,
        userId: Number(localStorage.getItem("userId")),
      };

      PostDataService.create(data)
        .then((response) => {
          console.log(response);
          this.submitted = true;
          this.post = {};
          this.legacySystemHTML = `Your article has been created successfully <em><a href="http://localhost:8080/post/${response.data.post.id}">See the article</a><em>`;
        })
        .catch((e) => {
          console.log(e);
          this.submitted = false;
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

.add-post-page {
  background-color: #f9f8f8;
  box-shadow: 0 45px 55px -35px #3a5275;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0 4rem;

  .add-post-form {
    margin: 0 auto;

    h1 {
      text-align: center;
      margin: 0 auto 4rem;
    }

    textarea {
      min-height: 10rem;
    }

    .error-mesage {
      font-size: 0.8rem;
      color: red;
    }

    .mesage-succes {
      font-size: 1rem;
      text-align: center;
      margin: 2rem 0;

      a {
        color: #5a80bd;
        margin-left: 0.5rem;
        text-decoration: underline;
      }
    }

    .btn {
      margin: 0 auto;
    }
  }
}
</style>
