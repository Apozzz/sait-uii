<template>
  <div>
    <h1 class="mt-5">Edit Sector</h1>
    <div class="form-control mt-3" v-if="(sector != null)">
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

      <button class="mt-2 btn btn-primary" @click="updateSector()">Update</button>
      <p class="mt-2" v-if="error" style="color:red">{{ error }}</p>
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
      sectors: 'dashboard/sectors',
      markets: 'dashboard/markets',
    }),
    id() {
      return parseInt(this.$route.params.id);
    },
    sector() {
      if (this.sectors == null) return null;
      return this.sectors.filter(sector => sector.id === this.id)[0];
    }
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  async created() {
    if (this.sectors == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/markets', this.token);
      await this.$store.dispatch('dashboard/sectors', this.token);
      this.isLoading = false;
    }
  },
  methods: {
    async updateSector() {
      try {
        this.isLoading = true;
        if (this.isSectorValid()) {
          await this.$store.dispatch('dashboard/updateSector', { sector: this.sector, token: this.token });
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