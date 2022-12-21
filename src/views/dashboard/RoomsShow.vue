<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-3" v-if="(!isLoading && room != null)">
                <h3 class="mt-5">Room: {{ room.id }}</h3>
                <p class="mb-0"><strong>Number:</strong> {{ room.number }}</p>
                <p class="mb-0"><strong>Space:</strong> {{ room.space }}</p>
                <p class="mb-0"><strong>Booked From:</strong> {{ room.bookedFrom }}</p>
                <p class="mb-0"><strong>Booked To:</strong> {{ room.bookedTo }}</p>
                <hr>
                <p class="text-center">
                    <router-link :to="{ path: `/dashboard/rooms/${room.id}/edit` }">edit</router-link> |
                    <span style="color: red" class="cursor-pointer" @click="deleteRoom(room.id)">delete</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: 'rooms-show',
    computed: {
      ...mapGetters({
        token: 'auth/token',
        rooms: 'dashboard/rooms'
      }),
      id() {
        return parseInt(this.$route.params.id);
      },
      room() {
        if (this.rooms == null) return null;
        return this.rooms.filter(room => room.id === this.id)[0];
      }
    },
    data() {
      return {
        isLoading: false,
        deleteRoomId: null,
      }
    },
    async created() {
      if (this.rooms == null) {
        this.isLoading = true;
        await this.$store.dispatch('dashboard/getRooms', this.token);
        this.isLoading = false;
      }
    },
    methods: {
      deleteRoom(roomId) {
        this.deleteRoomId = roomId;
        
        this.$modal.show('dialog', {
          title: 'Are you sure?',
          text: 'Action cannot be undone',
          buttons: [
            {
              title: 'Cancel',
              handler: () => {
                this.deleteRoomId = null;
                this.$modal.hide('dialog')
              }
            },
            {
              title: 'Confirm',
              handler: () => {
                this.confirmDelete(roomId)
                this.$modal.hide('dialog')
              }
            },
          ]
        });
      },
      async confirmDelete(roomId) {
        this.isLoading = true;
        await this.$store.dispatch('dashboard/deleteRoom', { id: roomId, token: this.token });
        await this.$router.push({ path: '/dashboard/' });
        this.isLoading = false;
      }
    },
  }
</script>