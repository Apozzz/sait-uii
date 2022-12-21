<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-3" v-if="room">
                <p class="text-center mb-1 mt-2">
                    <small>{{room.created_at.substring(0, 10)}}</small> <br>
                    <small>by: {{room.number}}</small>
                </p>
                <h3>{{room.number}}</h3>
                <p>{{room.space}}</p>
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
                rooms: 'rooms/rooms'
            }),
            id() {
                return parseInt(this.$route.params.id);
            },
            room() {
                return this.rooms.filter(room => room.id === this.id)[0];
            }
        },
    }
</script>