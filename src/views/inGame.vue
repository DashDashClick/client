<template>
  <div class="about">

    <h3>{{countdown}}</h3>
    <h1>This is an about page</h1>
    {{number}}
    <button @click.prevent="mulai">start</button>
    <div class="container mt-5 mb-5">
    <button v-if="number > -1" 
      :style="getPosition"
      @click.prevent="clickMe"
      >click me</button>
      <!-- v-bind:style="{margin-top: 15rem, margin-left:25rem}" -->

    </div>
  </div>
</template>
<script>
import io from 'socket.io-client'
name: 'inGame'
export default {
  data(){
    return {
      number: -1,
      socket: io.connect('http://localhost:3000'),
      countdown: 5,
      atas: 0,
      kiri: 0
    }
  },
  props: {
    msg: String
  },
  computed:{
   getPosition(){
     return {
       "margin-top": this.atas,
       "margin-left": this.kiri
     }
   }
  },
  methods:{
    mulai(){
      this.number = 0
      this.random()
      this.countDownTimer()
    },
     random(){
      this.atas = Math.floor(Math.random() * 25) + 0;
      this.kiri = Math.floor(Math.random() * 20) + 0;
      this.atas += 'rem' 
      this.kiri += 'rem'
      // console.log(this.kiri, 'ini kiri');
      
    },
    clickMe(){
      if(this.countdown > 0 ){
      this.number += 1
      this.random()
      console.log(this.number, 'ini angka sekarang');
      }else{
        // this.number += 1
        // socket.emit number
        
        console.log(this.number,'waktunya habis');
      }
    },
      countDownTimer() {
        if(this.countdown > 0) {
        console.log('jalan');
          setTimeout(() => {
              this.countdown -= 1
              this.countDownTimer()
          }, 1000)
        }else{
          this.socket.emit('inGame',{
            id: this.$route.params,
            score: this.number
          } )
        }
      }
  },
  created:function(){
    this.socket.on('finalScore', (payload)=>{
      console.log(payload, 'pemenangnya');
      
    })
  }
}
</script>
<style scoped>

</style>
