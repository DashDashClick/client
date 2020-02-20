<template>
  <div>
    <h1>ini landing Page</h1>
    <label for="nama">nama</label><br>
    <input type="text" v-model="userName"><br>
    <label for="nama">room</label><br>
    <input type="text" v-model="roomName">
    <button @click.prevent="addRoom">submit</button><br>
    <div class="container row mt-5">
    <div class="card col-3 mt-4" v-for="room in rooms" :key="room.id">
      {{room.name}}
    <button @click.prevent="joinRoom(room.id)">join</button>
      
    </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
name: 'landingPage'
export default {
data(){
  return {
    socket: io.connect('http://localhost:3000'),
    roomName: '',
    rooms:[],
    userName:''
  }
},
methods:{
  joinRoom(id){
    this.socket.emit('joinRoom', {
      id,
      username: this.userName
    })
  },
  addRoom(){
    this.socket.emit('createRoom', {
      roomName: this.roomName,
      username: this.userName
    })
  },
  fetchRoom(){
    this.socket.emit('fetchRoom')
  }
},
created:function(){
  this.socket.on('roomCreated', (room)=>{
    console.log(room);
    this.rooms.push(room)
  })

  this.fetchRoom()
  this.socket.on('showRooms', (room) =>{
    console.log(room);
    
    this.rooms = room
  })

  this.socket.on('joined', (payload)=>{
    console.log(payload, 'joined the room');
    this.$router.push(`/inGame/${payload.id}`)
  })
}
}
</script>

<style>

</style>