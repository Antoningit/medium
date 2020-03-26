<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item>
          <router-link to="/">Home</router-link>
        </b-navbar-item>
        <b-navbar-item v-if="!auth">
          <router-link to="/login">Login</router-link>
        </b-navbar-item>
        <b-navbar-item v-if="isWriter">
          <router-link to="/create">Create</router-link>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div" v-if="!auth">
          <div class="buttons">
            <!-- <a class="button is-primary">
              <strong>Sign up</strong>
            </a>-->
            <a class="button is-light">
              <router-link to="/login">Log in</router-link>
            </a>
          </div>
        </b-navbar-item>
        <template v-else>
          <b-navbar-item tag="div">
            <div>{{userLogin}}</div>
          </b-navbar-item>
          <b-navbar-item tag="div" @click="logOut">
            <a class="button is-light">
              Logout
            </a>
          </b-navbar-item>
        </template>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/')
    }
  },
  computed: {
    auth() {
      return this.$store.getters.authStatus;
    },
    userLogin() {
      return this.$store.getters.authUser.login;
    },
    isWriter() {
      return this.$store.getters.isWriter;
    }
  }
};
</script>
<style>
#app {
  background: #ebebeb;
  padding-bottom: 20px;
}
.card {
  margin: 20px 0;
}
</style>
