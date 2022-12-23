<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Rent a room!</h1>
        <router-link :to="{ path: '/auth/register' }" class="d-inline-block my-3">
          <button class="btn btn-lg btn-primary">Join</button>
        </router-link>
        <p>Already have an account? <router-link :to="{ path: '/auth/login' }">Log in</router-link></p>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12 mb-4 text-center">
        <h1>Featured Rooms:</h1>
      </div>
    </div>
    <div class="row">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Space</th>
            <th scope="col">Booked From</th>
            <th scope="col">Booked To</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="room in rooms" :key="room.id">
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home-index',
   computed: {
    ...mapGetters({
      rooms: 'rooms/rooms',
    })
  },
}
</script>