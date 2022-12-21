<template>
    <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2" v-if="sector != null">
            <h3 class="mt-5">Sector: {{ sector.id }}</h3>
            <p class="mb-0"><strong>Code:</strong> {{ sector.code }}</p>
          </div>
          <hr>
          <p class="text-center">
            <span style="color: red" class="cursor-pointer" @click="deleteSector(sector.id)">delete</span>
          </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'sectors-show',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      sectors: 'dashboard/sectors'
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
      markets: null,
      isLoading: false,
      deleteSectorId: null,
    }
  },
  async created() {
    if (this.sectors == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/getSectors', this.token);
      this.isLoading = false;
    }
  },
  methods: {
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
      this.isLoading = true;
      await this.$store.dispatch('dashboard/deleteSector', { id: sectorId, token: this.token });
      await this.$router.push({ path: '/dashboard/sectors' });
      this.isLoading = false;
    }
  },
}
</script>