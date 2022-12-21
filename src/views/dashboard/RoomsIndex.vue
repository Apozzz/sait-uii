<template>
  <div>
    <h1 class="mt-5 mb-0">Rooms</h1>
    <button class="btn btn-primary btn-sm my-3" @click="createNewRoom()">Create New</button>
    <button class="btn btn-primary btn-sm my-3" @click="rentNewRoom()">Rent Room</button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Number</th>
          <th scope="col">Space</th>
          <th scope="col">Booked From</th>
          <th scope="col">Booked To</th>
          <th scope="col">Belongs To Sector</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms" :key="room.id">
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}` }" class="nav-link">
              {{ room.id }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}` }" class="nav-link">
              {{ room.number }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}` }" class="nav-link">
              {{ room.space }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}` }" class="nav-link">
              {{ room.bookedFrom }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}` }" class="nav-link">
              {{ room.bookedTo }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}` }" class="nav-link">
              {{ getSectorById(room.sectorId).code }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/rooms/${room.id}/edit` }">edit</router-link>
             | <span style="color: red" class="cursor-pointer" @click="deleteRoom(room.id)">delete</span></td>
        </tr>
      </tbody>
    </table>
    <h1 class="mt-5 mb-0" v-if="this.userRentedRoom != null">Rented Room</h1>
    <table class="table" v-if="this.userRentedRoom != null">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Number</th>
        <th scope="col">Space</th>
        <th scope="col">Booked From</th>
        <th scope="col">Booked To</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <router-link :to="{ path: `/dashboard/rooms/${this.userRentedRoom.id}` }" class="nav-link">
            {{ this.userRentedRoom.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/rooms/${this.userRentedRoom.id}` }" class="nav-link">
            {{ this.userRentedRoom.number }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/rooms/${this.userRentedRoom.id}` }" class="nav-link">
            {{ this.userRentedRoom.space }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/rooms/${this.userRentedRoom.id}` }" class="nav-link">
            {{ this.userRentedRoom.bookedFrom }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/rooms/${this.userRentedRoom.id}` }" class="nav-link">
            {{ this.userRentedRoom.bookedTo }}
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <h1 class="mt-5 mb-0" v-if="this.userSector != null">Rented Room Sector</h1>
    <table class="table" v-if="this.userSector != null">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Code</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <router-link :to="{ path: `/dashboard/sectors/${this.userSector.id}` }" class="nav-link">
            {{ this.userSector.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/sectors/${this.userSector.id}` }" class="nav-link">
            {{ this.userSector.code }}
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <h1 class="mt-5 mb-0" v-if="this.userMarket != null">Rented Room Market</h1>
    <table class="table" v-if="this.userMarket != null">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <router-link :to="{ path: `/dashboard/markets/${this.userMarket.id}` }" class="nav-link">
            {{ this.userMarket.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/markets/${this.userMarket.id}` }" class="nav-link">
            {{ this.userMarket.name }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ path: `/dashboard/markets/${this.userMarket.id}` }" class="nav-link">
            {{ this.userMarket.address }}
          </router-link>
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
  name: 'rooms-index',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      rooms: 'dashboard/rooms',
      sectors: 'dashboard/sectors',
      markets: 'dashboard/markets',
      user: 'dashboard/user'
    })
  },
  data() {
    return {
      loading: false,
      error: false,
      deleteRoomId: null,
      userRentedRoom: null,
      userSector: null,
      userMarket: null,
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('dashboard/getSectors', this.token);
    await this.$store.dispatch('dashboard/getRooms', this.token);
    await this.$store.dispatch('dashboard/getMarkets', this.token);
    await this.$store.dispatch('dashboard/getCurrentUser', this.token);
    this.getUserRentedRoom();
    if (this.userRentedRoom) {
      this.userSector = this.getSectorById(this.userRentedRoom.sectorId);
    }
    if (this.userSector) {
      this.userMarket = this.getMarketById(this.userSector.marketId);
    }
    this.loading = false;
  },
  methods: {
    async createNewRoom() {
      await this.$router.push({ path: '/dashboard/rooms/create' })
    },
    async rentNewRoom() {
      await this.$router.push({ path: '/dashboard/rooms/rent' })
    },
    getSectorById(sectorId) {
        if (this.sectors == null || sectorId == null) return null;
        return this.sectors.filter(sector => sector.id === sectorId)[0];
    },
    getMarketById(marketId) {
      if (this.markets == null || marketId == null) return null;
      return this.markets.filter(market => market.id === marketId)[0];
    },
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
    getUserRentedRoom()
    {
      if (this.rooms == null) return;
      this.userRentedRoom = this.rooms.filter(room => room.id === this.user.room_id)[0];
    },
    async confirmDelete(roomId) {
      this.loading = true;
      await this.$store.dispatch('dashboard/deleteRoom', { id: roomId, token: this.token });
      await this.$store.dispatch('dashboard/getRooms', this.token);
      this.loading = false;
    }
  }
}
</script>