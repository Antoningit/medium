<template>
  <div class="container" style="max-width: 800px">
    <b-field label="Title">
      <b-input v-model="title"></b-input>
    </b-field>
    <b-field label="Description">
      <b-input type="textarea" v-model="description"></b-input>
    </b-field>
    <b-button type="is-primary" @click="savePost">Save</b-button>
    <div class="hidden">
    {{editPost}}
    </div>
  </div>
</template>
<script>
export default {
  props: ["editPost"],
  updated() {
    //console.log("editPost QUERY INDEX ", this.editPost)
    if (this.editPost != null && this.title == "" && this.description == "") {
      const post = this.$store.getters.getPost(this.editPost);
      //console.log(post)
      this.oldPost = post;
      this.title = post.title;
      this.description = post.description;
    }
  },
  data() {
    return {
      oldPost: null,
      title: "",
      description: ""
    };
  },
  methods: {
    async savePost() {
      if (this.editPost != null) {
        console.log("Обновляем статью ", this.editPost);

        let doc = {
          ...this.oldPost
        };

        doc.title = this.title
        doc.description = this.description
        doc.updateAt = new Date()

        await this.$store.dispatch("updatePost", {
          index: this.editPost,
          post: doc
        });
        await this.$router.push("/");
      } else {
        console.log("Создаём статью");
        
        let doc = {
          id: new Date().getTime(),
          title: this.title,
          description: this.description,
          claps: 0,
          createdAt: new Date(),
          userId: this.$store.getters.authUser.id
        };
        
        console.log("Статья ", doc);

        await this.$store.dispatch("createPost", doc);
        await this.$router.push("/");
      }
    }
  }
};
</script>
<style scoped>
  .hidden {
    display: none;
  }
</style>