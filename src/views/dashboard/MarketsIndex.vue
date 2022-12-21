<template>
  <div>
    <h1 class="mt-5 mb-0">Markets</h1>
    <button class="btn btn-primary btn-sm my-3" @click="createNewMarket()">Create New</button>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="market in markets" :key="market.id">
        <td>
          <router-link :to="{ path: `/dashboard/markets/${market.id}` }" class="nav-link">
            {{ market.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/markets/${market.id}` }" class="nav-link">
            {{ market.name }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/markets/${market.id}` }" class="nav-link">
            {{ market.address }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/markets/${market.id}/edit` }" v-if="(1==1/*profile.is_admin == true || profile.id == team.user_id*/)">edit</router-link> <span style="color: red" class="cursor-pointer" @click="deleteMarket(market.id)" v-if="(1==1/*profile.is_admin == true || team.user_id == profile.id*/)">delete</span>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-if="loading">loading...</p>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex'

export default {
  name: 'markets-index',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      //profile: 'auth/user',
      markets: 'dashboard/markets',
    })
  },
  data() {
    return {
      loading: false,
      error: false,
      deleteMarketId: null,
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('dashboard/getMarkets', this.token);
    this.loading = false;
  },
  methods: {
    async createNewMarket() {
      await this.$router.push({ path: '/dashboard/markets/create' })
    },
    formatDate(datetime) {
      return moment(datetime).format('h:mm a, MMM. D, YYYY');
    },
    deleteMarket(marketId) {
      this.deleteMarketId = marketId;

      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'Action cannot be undone',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.deleteMarketId = null;
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Confirm',
            handler: () => {
              this.confirmDelete(marketId)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    async confirmDelete(marketId) {
      this.loading = true;
      await this.$store.dispatch('dashboard/deleteMarket', { id: marketId, token: this.token });
      await this.$store.dispatch('dashboard/getMarkets', this.token);
      this.loading = false;
    }
  }
}
</script>