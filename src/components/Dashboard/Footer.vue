<template>
  <div class="bg-black d-flex p-2">
    <img src="https://ptes.edu.in/wp-content/uploads/2021/02/copyright.jpg" class="img-fluid" alt="Responsive image">
    <p class="text-white">Copyright ©2022</p>
  </div>
</template>
<script>

export default {
  props: ['authenticated', 'isAdmin', 'name'],
  methods: {
    onLogout() {
      this.$emit('onLogout');
    }
  }
}
</script>