<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-lg-8 offset-lg-2" v-if="market != null">
        <h3 class="mt-5">Market: {{ market.id }}</h3>
        <p class="mb-0"><strong>Name:</strong> {{ market.name }}</p>
        <p class="mb-0"><strong>Address:</strong> {{ market.address }}</p>
        <hr>
        <p class="text-center">
          <span style="color: red" class="cursor-pointer" @click="deleteMarket(market.id)">delete</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'markets-show',
  computed: {
    ...mapGetters({
      profile: 'auth/user',
      token: 'auth/token',
      markets: 'dashboard/markets'
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
      users: null,
      isLoading: false,
      deleteMarketId: null,
    }
  },
  async created() {
    if (this.markets == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/getMarkets', this.token);
      this.isLoading = false;
    }
  },
  methods: {
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
      this.isLoading = true;
      await this.$store.dispatch('dashboard/deleteMarket', { id: marketId, token: this.token });
      await this.$router.push({ path: '/dashboard/' });
      this.isLoading = false;
    }
  },
}
</script>