<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Become a publisher</h1>
        <router-link :to="{ path: '/auth/register' }" class="d-inline-block my-3">
          <button class="btn btn-lg btn-primary">Join</button>
        </router-link>
        <p>Already have an account? <router-link :to="{ path: '/auth/login' }">Log in</router-link></p>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12 mb-4 text-center">
        <h1>Featured Articles:</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4" v-for="room in rooms" :key="room.id">
          <img :src="room.thumbnail" class="img-fluid">
          <router-link :to="{ path: `/rooms/${room.id}` }">
            <h3>{{room.title}}</h3>
          </router-link>
          <p>{{room.text.substring(0, 150)}}...</p>
      </div>
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