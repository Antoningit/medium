<template>
  <div class="container" style="max-width: 800px">
    <h1>Create/Edit post</h1>
    <PostForm :editPost="postIndex" />
  </div>
</template>

<script>
import PostForm from "../components/PostForm";
export default {
  data() {
    return {
      postIndex: null
    };
  },
  components: {
    PostForm
  },
  mounted() {
    if (!this.$store.getters.authStatus) {
      this.$router.push("/");
    }

    if (this.$route?.query?.index >= 0) {
      this.postIndex = +this.$route.query.index;
    }
    console.log("QUERY INDEX ", this.postIndex);
  }
};
</script>
