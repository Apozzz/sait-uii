<template>
  <div>
    <h1 class="mt-5 mb-0">Sectors</h1>
    <button class="btn btn-primary btn-sm my-3" @click="createNewSector()">Create New</button>
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Code</th>
          <th scope="col">Belongs To Market</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sector in sectors" :key="sector.id">
          <td>
            <router-link :to="{ path: `/dashboard/sectors/${sector.id}` }" class="nav-link">
              {{ sector.id }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/sectors/${sector.id}` }" class="nav-link">
              {{ sector.code }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/sectors/${sector.id}` }" class="nav-link">
              {{ getMarketNameById(sector.marketId) }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/sectors/${sector.id}/edit` }">edit</router-link> <span style="color: red" class="cursor-pointer" @click="deleteSector(sector.id)">delete</span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading">loading...</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sectors-index',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      sectors: 'dashboard/sectors',
      markets: 'dashboard/markets',
    })
  },
  data() {
    return {
      loading: false,
      error: false,
      deleteSectorId: null,
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('dashboard/getSectors', this.token);
    await this.$store.dispatch('dashboard/getMarkets', this.token);
    this.loading = false;
  },
  methods: {
    async createNewSector() {
      await this.$router.push({ path: '/dashboard/sectors/create' })
    },
    getMarketNameById(marketId) {
      if (this.markets == null || marketId == null) return null;
      return this.markets.filter(market => market.id === marketId)[0].name;
    },
    deleteSector(sectorId) {
      this.deleteSectorId = sectorId;
      
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'Action cannot be undone',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.deleteSectorId = null;
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Confirm',
            handler: () => {
              this.confirmDelete(sectorId)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    async confirmDelete(sectorId) {
      this.loading = true;
      await this.$store.dispatch('dashboard/deleteSector', { id: sectorId, token: this.token });
      await this.$store.dispatch('dashboard/getSectors', this.token);
      this.loading = false;
    }
  }
}
</script>