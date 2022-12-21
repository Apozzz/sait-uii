<template>
  <div>
    <h1 class="mt-5">Edit Market</h1>
    <div class="form-control mt-3" v-if="(market != null)">
      <div class="mb-3">
        <label class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="market.name">
      </div>

      <div class="mb-3">
        <label class="form-label">Address:</label>
        <input type="text" class="form-control" v-model="market.address">
      </div>

      <button class="mt-2 btn btn-primary" @click="updateMarket()">Update</button>
      <p class="mt-2" v-if="error" style="color:red">{{ error }}</p>
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
      markets: 'dashboard/markets',
    }),
    id() {
      return parseInt(this.$route.params.id);
    },
    market() {
      if (this.markets == null) return null;
      return this.markets.filter(market => market.id === this.id)[0];
    }
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  async created() {
    if (this.markets == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/markets', this.token);
      this.isLoading = false;
    }
  },
  methods: {
    async updateMarket() {
      try {
        this.isLoading = true;
        if (this.isMarketValid()) {
          await this.$store.dispatch('dashboard/updateMarket', { market: this.market, token: this.token });
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