<template>
    <div>
        <Navbar @onLogout="logout()" :authenticated="false" />
        <p v-if="loading">loading...</p>
        <p v-if="error" style="color: red;">{{ error }}</p>    
        <router-view />
        <br>
        <br>
        <Footer :authenticated="false"></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

import { mapGetters } from 'vuex';

export default {
  name: 'home-wrapper',
  components: { Navbar, Footer },
  data() {
    return {
      loading: false,
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated'
    })
  },

  methods: {
    async logout() {
      this.loading = true;

      try {
        await this.$store.dispatch('logout');
        await this.$router.push({ name: 'login' })
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
