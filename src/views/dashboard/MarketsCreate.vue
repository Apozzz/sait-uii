<template>
  <div>
    <h1 class="mt-5">New Market</h1>
    <div class="form-control mt-3">
      <div class="mb-3">
        <label class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="market.name">
      </div>
      <div class="mb-3">
        <label class="form-label">Address:</label>
        <input type="text" class="form-control" v-model="market.address">
      </div>

      <button class="mt-2 btn btn-primary" @click="createMarket()">Create</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'markets-create',
  computed: {
    ...mapGetters({
      token: 'auth/token',
    }),

  },
  data() {
    return {
      isLoading: false,
      error: null,
      market: {
        name: null,
        address: null
      }
    }
  },
  methods: {
    async createMarket() {
      try {
        this.isLoading = true;
        if (this.isMarketValid()) {
          await this.$store.dispatch('dashboard/createMarket', { market: this.market, token: this.token });
          this.$store.dispatch('dashboard/getMarkets', this.token);
          await this.$router.push({ path: `/dashboard/markets` });
        }
      } catch (e) {
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },
    isMarketValid() {
      if (this.market.name == null) {
        this.error = 'Name is required';
        return false;
      }

      if (this.market.address == null) {
        this.error = 'Address is required';
        return false;
      }

      return true;
    }
  }
}
</script>