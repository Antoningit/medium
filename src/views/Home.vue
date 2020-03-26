<template>
  <div>
    <div class="container">
      <div class="card" v-for="(post, index) in POSTS" :key="post.id">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{post.title}}</p>
              <!-- <p class="subtitle is-6">@johnsmith</p> -->
            </div>
          </div>
          <div class="content">
            {{post.description}}
            <br />
            <time datetime="2016-1-1">{{post.createdAt}}</time>
          </div>
          <b-button v-if="isReader" @click="claps(index)">Like {{post.claps}}</b-button>
          <b-button v-if="isWriter" @click="editPost(index)">Изменить</b-button>
          <b-button class="m-l-1" v-if="isWriter" @click="deletePost(index)">Удалить</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["GET_POSTS_FROM_API"]),
    claps(index) {
      this.$store.dispatch("claps", index);
    },
    deletePost(index) {
      this.$store.dispatch("deletePost", index);
    },
    editPost(index) {
      this.$router.push({ path: "/create", query: { index } });
    }
  },
  computed: {
    ...mapGetters(["POSTS", "isReader", "isWriter"])
  },
  mounted() {
    this.GET_POSTS_FROM_API();
  }
};
</script>
<style scoped>
.m-l-1 {
  margin-left: 10px;
}
</style>