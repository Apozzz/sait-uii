<template>
  <div>
    <h1 class="mt-5">Rent Room</h1>

    <p v-if="isLoading">loading...</p>

    <div class="form-control mt-3">
      <div class="mb-3">
        <label class="form-label">Room:</label>
        <p v-if="isLoading">Loading...</p>
        <select v-model="room.id" class="form-control">
          <option :value="null">Please select a room</option>
          <option v-if="isLoading" :value="null">loading...</option>
          <option v-for="room in this.rooms" :key="room.id" :value="room.id">Room number - Room Space:  {{ room.number }} - {{ room.space }}m^3</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Booked From:</label>
        <input type="text" class="form-control" v-model="room.booked_from">
      </div>
      <div class="mb-3">
        <label class="form-label">Booked To:</label>
        <input type="text" class="form-control" v-model="room.booked_to">
      </div>
    </div>
    <p v-if="error" style="color:red" class="mt-2">{{ error }}</p>
    <button class="btn btn-primary mt-4" @click="rentRoom">Rent</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'rooms-rented',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      rooms: 'dashboard/rooms'
    }),
  },
  data() {
    return {
      isLoading: false,
      error: null,
      room: {
        number: '',
        space: '',
        booked_from: '',
        booked_to: '',
        sector_id: null
      }
    }
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('dashboard/getRooms', this.token);
    this.isLoading = false;
  },
  methods: {
    async rentRoom() {
      try {
        this.loading = true;
        if (this.isRoomValid()) {
          this.room = this.addSelectedRoomData();
          await this.$store.dispatch('dashboard/rentRoom', { room: this.room, token: this.token });
          alert('Room rented!');
          await this.$router.push({ path: '/dashboard' })
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    isRoomValid() {
      if (this.room.booked_from == null) {
        this.error = 'Room Booked From cannot be empty';
        return false;
      }

      if (this.room.booked_to == null) {
        this.error = 'Room Booked To cannot be empty';
        return false;
      }

      return true;
    },
    addSelectedRoomData()
    {
      const additionalRoomInfo = this.rooms.filter(room => room.id === this.room.id)[0];
      additionalRoomInfo.booked_from = this.room.booked_from;
      additionalRoomInfo.booked_to = this.room.booked_to;

      return additionalRoomInfo;
    }
  }
}
</script>