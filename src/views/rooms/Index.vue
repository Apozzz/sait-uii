<template>
  <div>
    <h3>Rooms:</h3>
    <p v-if="error" style="color: red">{{ error }}</p>
    <div v-if="rooms" class="posts-wrapper">
      <div v-for="(room, index) in rooms" :key="index" class="post">
        <h3>{{ room.number }}</h3>
        <p>{{ room.space }}</p>
      </div>
    </div>
    <p v-else>loading...</p>
  </div>
</template>

<script>

export default {
  name: 'rooms-index',

  data() {
    return {
      rooms: null,
      error: null,
    }
  },
};
</script>

<style scoped>
  .posts-wrapper {
    width: 75%;
    margin: 0 auto;
  }

  .post {
    margin-bottom: 25px;
    text-align: left;
  }
</style>

