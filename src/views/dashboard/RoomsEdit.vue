<template>
    <div>
        <h1 class="mt-5">Edit Room</h1>
        
        <p v-if="isLoading">loading...</p>

        <div class="form-control mt-3" v-if="room != null">
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
        <button class="btn btn-primary mt-4" @click="updateRoom">Update</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'rooms-edit',
        computed: {
            ...mapGetters({
                token: 'auth/token',
                sectors: 'dashboard/sectors',
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
                error: null,
            }
        },
        async created() {
            this.isLoading = true;
            await this.$store.dispatch('dashboard/getSectors', this.token);
            await this.$store.dispatch('dashboard/getRooms', this.token);
            this.isLoading = false;
        },
        methods: {
            async updateRoom() {
                try {
                    this.loading = true;
                    if (this.isRoomValid()) {
                        await this.$store.dispatch('dashboard/updateRoom', { room: this.room, token: this.token });
                        alert('Room updated!');
                        await this.$router.push({ path: '/dashboard' })
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