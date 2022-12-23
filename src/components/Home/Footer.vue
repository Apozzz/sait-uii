<template>
  <div class="bg-black d-flex p-2">
    <div style="width: 200px">
      <img src="https://ptes.edu.in/wp-content/uploads/2021/02/copyright.jpg" class="img-fluid align-self-center" alt="Responsive image">
    </div>
    <p class="text-white align-self-center">Copyright ©2022</p>
  </div>
</template>
<script>

export default {
  props: ['authenticated'],
  methods: {
    onLogout() {
      this.$emit('onLogout');
    }
  }
}
</script>