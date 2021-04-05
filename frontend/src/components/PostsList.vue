<template>
  <div>
    <h1>Here is the list of all articles</h1>
    <div
      v-for="post in posts"
      v-bind:key="post.id"
      class="row articles-content"
    >
      <div class="col-lg-10 offset-lg-1 articles">
        <h2 class="title">{{ post.title }}</h2>

        <p class="articles-datas">
          <span class="author-name"
            >Written by
            <b
              ><em
                >{{ post.author.firstName }} {{ post.author.lastName }}</em
              ></b
            ></span
          >,<span class="data"> {{ formatDate(post.createdAt) }}</span>
        </p>
        <p v-if=" post.content.lenght > 10 ">{{ post.content | truncate 10 '....' }}</p>
        <p v-else>{{ post.content }}</p>
        <a :href="'http://localhost:8080/post/' + post.id" class="see-more"
          ><em>See the article...</em></a
        >
      </div>
    </div>
    <ul class="pagination">
      <li
        v-for="n in pageNumbers"
        :key="n"
        @click="getPosts(n)"
        :class="n === page ? 'page-active' : 'page-inactive'"
      >
        {{ n }}
      </li>
    </ul>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "PostsList",
  data() {
    return {
      posts: [],
      userId: null,
      isAdmin: false,
      postsCount: 0,
      page: 1,
      pageNumbers: 0,
    };
  },
  methods: {
    getPosts(page) {
      this.page = page;

      PostDataService.getAll(page)
        .then((response) => {
          this.posts = response.data.posts.rows;
          this.postsCount = response.data.posts.count;
          this.pageNumbers = Math.ceil(response.data.posts.count / 5);
        })
        .catch((e) => {
          console.log("error", e);
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
  },
  mounted() {
    this.getPosts(this.page);
    this.userId = localStorage.getItem("userId");
    this.isAdmin = localStorage.getItem("role") === "admin";
  },
};
</script>

<style lang="scss">
@import "../assets/custom.scss";

h1 {
  text-align: center;
}

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

img {
  width: 100%;
}

.pagination {
  display: flex;
  justify-content: center;

  .page-active {
    background-color: $grey;
  }

  li {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2px;
    margin: 1rem;
    text-align: center;
  }
}
</style>
