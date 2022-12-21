<template>
  <div>
    <h1 class="mt-5">New Sector</h1>
    <div class="form-control mt-3">
      <div class="mb-3">
        <label class="form-label">Code:</label>
        <input type="text" class="form-control" v-model="sector.code">
      </div>
      <div class="mb-3">
        <label class="form-label">Market:</label>

        <p v-if="isLoading">Loading...</p>

        <select v-model="sector.marketId" class="form-control">
          <option :value="null">Please select a market</option>
          <option v-if="isLoading" :value="null">loading...</option>
          <option v-for="market in markets" :key="market.id" :value="market.id">{{ market.name }}</option>
        </select>
      </div>

      <button class="mt-2 btn btn-primary" @click="createSector()">Create</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'sectors-create',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      markets: 'dashboard/markets',
    }),
   
  },
  data() {
    return {
      isLoading: false,
      error: null,
      sector: {
        code: null,
        market_id: null
      }
    }
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('dashboard/getMarkets', this.token);
    this.isLoading = false;
  },
  methods: {
    async createSector() {
      try {
        this.isLoading = true;
        if (this.isSectorValid()) {
          await this.$store.dispatch('dashboard/createSector', { sector: this.sector, token: this.token });
          this.$store.dispatch('dashboard/getSectors', this.token);
          await this.$router.push({ path: `/dashboard/sectors` });
        }
      } catch (e) {
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },
    isSectorValid() {
      if (this.sector.code == null) {
        this.error = 'Code is required';
        return false;
      }

      return true;
    }
  }
}
</script>