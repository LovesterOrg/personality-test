<template>
  <div v-if="!load" class="flex justify-center flex-col h-screen items-center">
    <h1 class="text-3xl custom">LOVESTER</h1>
    <form
      @submit="
        (e) => {
          e.preventDefault();
        }
      "
      class="w-full relative lg:h-auto lg:w-1/2 max-w-lg bg-gray-100 rounded-lg p-10"
    >
      <lang-gear class="absolute custom-position"></lang-gear>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full flex items-start flex-col px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 font-bold mb-2"
            for="grid-first-name"
          >
            {{ $t("email") }}
          </label>
          <input
            @change="
              (e) => {
                checkEmail = re.test(String(email).toLowerCase());
              }
            "
            @input="() => (email = email.trim())"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            v-model="email"
            :class="!checkEmail ? 'border-red-500' : ''"
            :placeholder="$t('email')"
          />
          <p
            class="text-red-500 text-xs italic"
            :class="checkEmail ? 'hidden' : 'block'"
          >
            {{ $t("validateEmail") }}
          </p>
        </div>
        <div
          class="w-full relative flex items-start flex-col px-3 mb-6 md:mb-0"
        >
          <label
            class="block uppercase tracking-wide text-gray-700 font-bold mb-2"
            for="grid-first-name"
          >
            {{ $t("password") }}
          </label>
          <img
            :src="showPassword?'/invisible.svg':'/eye.svg'"
            @click="() => (showPassword = !showPassword)"
            :class="$i18n.locale == 'ar'?'eye-position-rtl':'eye-position'"
            class="cursor-pointer absolute w-5 h-5 z-50"
          />
          <input
            @change="
              (e) => {
                checkPassword = !!checkPassword;
              }
            "
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :class="!checkPassword ? 'border-red-500' : ''"
            :placeholder="$t('password')"
          />
          <p
            class="text-red-500 text-xs italic"
            :class="checkPassword ? 'hidden' : 'block'"
          >
            {{ $t("validatePassword") }}
          </p>
        </div>
        <div class="flex w-full justify-evenly">
          <button
            :disabled="loading || success"
            type="submit"
            @click="() => login()"
            class="mr-1 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
          >
            {{ $t("login") }}
          </button>
        </div>
      </div>
      <p class="text-red-500 text-xs italic">
        {{ error }}
      </p>
      <p
        @click="() => $router.push({ name: 'signup' })"
        class="text-indigo-600 cursor-pointer"
      >
        {{ $t("noAccount") }}
      </p>
      <p @click="resendEmail" class="text-indigo-600 cursor-pointer">
        {{ $t("resetPassword") }}
      </p>
      <p v-if="emailSent" class="text-green-500 text-xs italic">
        {{ $t("emailSent") }}
      </p>
      <p v-if="emailConfirmed" class="text-green-500 text-xs italic">
        {{ $t("emailConfirmed") }}
      </p>
    </form>
  </div>
  <img src="/loading.gif" v-if="load" class="absolute position-loader">
</template>

<script>
import LangGear from "./LangGear";

export default {
  components: {
    LangGear,
    
  },
  data() {
    return {
      checkEmail: true,
      checkPassword: true,
      emailConfirmed: false,
      loading: false,
      email: "",
      password: "",
      error: "",
      success: false,
      load: false,
      birthday: null,
      signup: false,
      showPassword: false,
      // eslint-disable-next-line no-useless-escape
      re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  },
  async mounted() {
    this.load = true;
    if(sessionStorage.getItem('email'))
      this.email = sessionStorage.getItem('email')

    if (sessionStorage.getItem("confirmed")) {
      this.emailConfirmed = true;
      sessionStorage.clear("confirmed");
    }
    this.load = true;
    const token = localStorage.getItem("token");
    if (token) {
      setTimeout(() => (this.load = false), 300);
      this.$router.push({ name: "home" });
      return;
    }
    if (this.$route.query.token && this.$route.query.id) {
      await fetch(
        this.apiUrl +
          "auth/login?token=" +
          this.$route.query.token +
          "&id=" +
          this.$route.query.id,
        {
          method: "POST",
          body: JSON.stringify({
            token: this.$route.query.token,
            id: this.$route.query.id,
          }),
        }
      )
        .then(async (res) => {
          const token = (await res.json()).token;
          localStorage.setItem("token", token);
          this.$router.push({ name: "home" });
          setTimeout(() => (this.load = false), 300);
        })
        .catch(() => setTimeout(() => (this.load = false), 300));
    } else {
      setTimeout(() => (this.load = false), 300);
    }
  },
  methods: {
    async resendEmail() {
      this.checkEmail =
        this.email && this.re.test(String(this.email).toLowerCase());
      if (!this.checkEmail || !this.checkPassword) {
        this.loading = false;
        this.load = false;
        return;
      }
      this.load = true;
      await fetch(this.apiUrl + "resend?lang=" + this.$i18n.locale, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email.trim(),
        }),
      });
      this.load = false;
      this.emailSent = true;
    },
    async login() {
      this.checkEmail =
        this.email && this.re.test(String(this.email).toLowerCase());
      if (!this.checkEmail || !this.checkPassword) {
        this.loading = false;
        this.load = false;
        return;
      }

      await fetch(this.apiUrl + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email.trim(),
          password: this.password,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status == 402) this.error = this.$t("unconfirmed");
            else this.error = this.$t("loginError");
          } else {
            return res.json();
          }
        })
        .then((x) => {
          localStorage.setItem("token", x.token);
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.error = this.$t("loginError");
        });
      this.password = "";
      this.loading = false;
      this.success = false;
      this.load = false;
    },
  },
};
</script>

<style>
.custom-position {
  top: 5px;
  right: 5px;
}

.custom {
  color: #701e5d;
  margin-top: 60px;
}

.blur {
  filter: opacity(0);
  transition: 0.5s;
}
.position-loader {
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

.eye-position {
  right: 20px;
  top: 50%;
}

.eye-position-rtl{
  left: 20px;
  top: 50%;
}
</style>
