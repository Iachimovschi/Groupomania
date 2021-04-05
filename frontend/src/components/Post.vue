<template>
  <div class="container" id="single-post">
    <div class="post">
      <h1 class="title">{{ post.title }}</h1>
      <p class="articles-datas">
        <span class="author-name"
          >Written by
          <b
            ><em>{{ post.author.firstName }} {{ post.author.lastName }}</em></b
          ></span
        >,
        {{ formatDate(post.createdAt) }}
      </p>
      <p>{{ post.content }}</p>

      <div v-if="userId == post.userId || isAdmin">
        <button
          type="button"
          class="btn cta-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Edit
        </button>
        <button @click="removePost(post.id)" class="btn-danger btn">
          Remove
        </button>
      </div>
    </div>
    <div v-if="post.comments.length" class="mt-5">
      <h2><b>Comments</b></h2>
      <hr />
      <div
        v-for="comment in post.comments"
        v-bind:key="comment.id"
        class="comment"
      >
        <p>
          <font-awesome-icon icon="user" class="icon-user" /><span
            >{{ comment.author.firstName }} {{ comment.author.lastName }}</span
          >
        </p>
        <p class="data">
          {{ formatDate(comment.createdAt) }}
        </p>
        <p class="content-comment">
          <em>{{ comment.content }}</em>
        </p>
        <button
          v-if="userId == comment.userId"
          class="btn-danger btn"
          @click="removeComment(comment.id)"
        >
          Delete
        </button>
        <hr />
      </div>
    </div>

    <div class="mt-5 mb-5 create-comment-box">
      <label for="comment-section"><b>Comment</b></label>
      <textarea
        name="commentContent"
        id="comment-section"
        class="col-lg-6 col-md-12 form-control"
        cols="84"
        rows="5"
        v-model="newComment.content"
        @keyup="resetErrors"
      ></textarea>
      <button @click="addComment" class="cta-success btn">Add comment</button>
      <p class="message-error">{{ message }}</p>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <label for="post-title">Article title</label>
            <textarea
              name="post-title"
              id="post-title"
              class="form-control"
              v-model="post.title"
            ></textarea>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body flex-sirection column">
            <label for="content-post">Article content</label>
            <textarea
              id="content-post"
              name="post-content"
              class="form-control"
              v-model="post.content"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn cta-primary"
              data-dismiss="modal"
              @click="updatePost"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: "PostsList",
  data() {
    return {
      post: {
        author: {},
        comments: [],
      },
      newComment: {
        id: null,
        content: "",
        postId: null,
        userId: null,
      },
      userId: null,
      submitted: false,
      isAdmin: false,
      errors: {
        content: "",
      },
      message: "",
    };
  },
  methods: {
    getPostById() {
      const id = this.$route.params.id;

      PostDataService.getById(id)
        .then((response) => {
          this.post = response.data.post;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePost() {
      const id = this.$route.params.id;
      let data = {
        title: this.post.title,
        content: this.post.content,
        userId: this.post.userId,
      };

      PostDataService.update(id, data)
        .then((response) => {
          this.post.id = response.data.id;
          this.submitted = true;
          window.location.reload();
        })
        .catch(() => {
          console.log("error");
        });
    },
    removePost(id) {
      PostDataService.delete(id)
        .then(() => {
          this.$router.push("/posts");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addComment() {
      let data = {
        content: this.newComment.content,
        postId: this.$route.params.id,
        userId: Number(localStorage.getItem("userId")),
      };
      if (data.content.length !== 0) {
        CommentDataService.create(data).then((response) => {
          this.submitted = true;
          console.log(response);
          window.location.reload();
        });
      } else {
        this.message = "Please enter your text";
      }
    },
    removeComment(id) {
      CommentDataService.delete(id)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    resetErrors() {
      this.message = "";
    },
  },
  mounted() {
    this.getPostById();
    this.userId = localStorage.getItem("userId");
    this.isAdmin = localStorage.getItem("role") === "admin";
  },
};
</script>

<style lang="scss">
@import "../assets/custom.scss";

#single-post {
  .post {
    padding: 2rem;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 10px;
    margin-top: 4rem;
    background-color: aliceblue;
    min-height: 30px;
    font-size: 1.3rem;

    @media (max-width: 426px) {
      padding: 1rem;
    }

    h1 {
      font-size: 3rem;
    }
  }

  .btn {
    font-size: 0.8rem;
    margin-top: 1rem;

    &:first-child {
      margin-right: 1rem;
    }
  }

  hr {
    margin: 2rem 0;
  }

  h2 {
    font-size: 1.5rem !important;
  }

  .comment {
    .icon-user {
      font-size: 1.5rem;
      color: $darck-grey;
      margin-right: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .author-comment {
      font-size: 1rem;
      text-transform: capitalize;
    }

    .content-comment {
      font-size: 0.7rem;
    }
  }

  label {
    font-size: 1.5rem;
  }

  .message-error {
    color: red;
    font-size: 0.8rem;
    margin: 1rem 0 0;
  }
}
</style>
