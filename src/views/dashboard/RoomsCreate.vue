<template>
    <div>
        <h1 class="mt-5">New Room</h1>
        
        <div class="form-control mt-3">
            <div class="mb-3">
                <label class="form-label">Number:</label>
                <input type="text" class="form-control" v-model="room.number">
            </div>
            <div class="mb-3">
              <label class="form-label">Space:</label>
              <input type="text" class="form-control" v-model="room.space">
            </div>
            <div class="mb-3">
                <label class="form-label">Sector:</label>

                <p v-if="isLoading">Loading...</p>

                <select v-model="room.sector_id" class="form-control">
                    <option :value="null">Please select a sector</option>
                    <option v-if="isLoading" :value="null">loading...</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{ sector.code }}</option>
                </select>
            </div>
        </div>
        <p v-if="error" style="color:red" class="mt-2">{{ error }}</p>
        <button class="btn btn-primary mt-4" @click="createRoom">Create</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'rooms-create',
        computed: {
            ...mapGetters({
                token: 'auth/token',
                sectors: 'dashboard/sectors'
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
            await this.$store.dispatch('dashboard/getSectors', this.token);
            this.isLoading = false;
        },
        methods: {
            resetRoom() {
                this.room = {
                  number: '',
                  space: '',
                  booked_from: '',
                  booked_to: '',
                  sector_id: null
                };
            },
            async createRoom() {
                try {
                    this.loading = true;
                    if (this.isRoomValid()) {
                        await this.$store.dispatch('dashboard/createRoom', { room: this.room, token: this.token });
                        this.resetRoom();
                        this.error = null;
                        await this.$router.push({path: '/dashboard/' });
                    }
                } catch (e) {
                    this.error = e;
                } finally {
                    this.loading = false;
                }
            },
            isRoomValid() {
              if (this.room.number == null) {
                this.error = 'Room number cannot be empty';
                return false;
              }

              if (this.room.space == null) {
                this.error = 'Room title cannot be empty';
                return false;
              }

              return true;
            }
        }
    }
</script>