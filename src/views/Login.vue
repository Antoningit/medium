<template>
  <div class="container" style="max-width: 800px">
    <b-field label="Username" :type="loginErrors.length ? 'is-danger' : ''" :message="loginErrors">
      <b-input
        v-model="login"
        @change="authStatus=null; $v.login.$touch()"
        @blur="$v.login.$touch()"
      ></b-input>
    </b-field>

    <b-field
      label="Password"
      :type="passwordErrors.length ? 'is-danger' : ''"
      :message="passwordErrors"
    >
      <b-input
        v-model="password"
        @change="authStatus=null ; $v.password.$touch()"
        @blur="$v.password.$touch()"
        type="password"
      ></b-input>
    </b-field>
    <b-button type="is-primary" @click="formSubmit">Login</b-button>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
const passwordCheck = value => {
  let passwordPattern = /^[0-9a-zA-Z]+$/;

  return !helpers.req(value) || passwordPattern.test(value);
};

export default {
  mixins: [validationMixin],
  data() {
    return {
      login: "",
      password: "",
      authStatus: null
    };
  },
  validations: {
    login: { required, email },
    password: {
      required,
      passwordCheck,
      minLength: minLength(6),
      maxLength: maxLength(20)
    }
  },
  methods: {
    async formSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Данные не верные");
        return;
      }

      const credentials = {
        login: this.login,
        password: this.password
      };

      console.log("Данные из формы");
      console.log(credentials);

      const result = await this.$store.dispatch("authintificate", credentials);
      console.log(result);
      if (result) {
        this.$router.push("/");
      } else {
        this.authStatus = false;
        this.$v.$touch();
      }
    }
  },
  computed: {
    loginErrors() {
      const errors = [];

      if (!this.$v.login.$dirty) return errors;

      !this.$v.login.email && errors.push("Некорректный e-mail для логина");
      !this.$v.login.required && errors.push("Введите логин");

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.required && errors.push("Введите пароль");

      !this.$v.password.passwordCheck &&
        errors.push("В пароле должны быть только латинские буквы и цифры");

      !this.$v.password.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");

      !this.$v.password.maxLength &&
        errors.push("Пароль должен быть не менее 20 символов");

      if (this.authStatus == false) {
        errors.push("Неверный логин или пароль");
      }
      return errors;
    }
  }
};
</script>