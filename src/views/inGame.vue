<template>
  <b-container style="justify-content: center; margin-top: 10vh;">
    <b-row style="height: 80vh;">
      <b-col cols="9" class="gameArea">
        <img
          class="target custom-cur"
          src="../assets/target.png"
          draggable="false"
          v-if="number > -1"
          :style="getPosition"
          @click.prevent="clickMe"
        >
      </b-col>
      <b-col cols="3">
        <div class="scoreboard">
          <b-card class="scoreContainer">
            <b-card-title>ROOM {{this.$route.params.id}}</b-card-title>
            <b-card-body>
              <b-card-text>USERNAME</b-card-text>
              <b-card-text>{{ userName }}</b-card-text>
            </b-card-body>
            <b-card-body>
              <b-card-text>TIMER</b-card-text>
              <b-progress :value="countdown" :max="maxTimer" show-value animated></b-progress>
            </b-card-body>
            <b-card-body>
              <b-card-text>SCORE</b-card-text>
              <b-card-text>{{number > 0 ? number : 0}}</b-card-text>
            </b-card-body>
            <b-button
              class="btn btn-danger"
              style="margin-top: 5vh; width: 60%"
              @click.prevent="mulai">
              Start
            </b-button>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'

export default {
  name: 'inGame',
  data () {
    return {
      number: -1,
      socket: io.connect('https://tranquil-thicket-70625.herokuapp.com'),
      countdown: 0,
      atas: 0,
      kiri: 0,
      maxTimer: 0
    }
  },
  props: {
    msg: String
  },
  computed: {
    getPosition () {
      return {
        'margin-top': this.atas,
        'margin-left': this.kiri
      }
    },
    ...mapState([
      'userName'
    ])
  },
  methods: {
    mulai () {
      this.number = 0
      this.random()
      this.countDownTimer()
    },
    random () {
      this.atas = Math.floor(Math.random() * 25) - 3
      this.kiri = Math.floor(Math.random() * 20) + 0
      this.atas += 'rem'
      this.kiri += 'rem'
    },
    clickMe () {
      if (this.countdown > 0) {
        this.number += 100
        this.random()
        console.log(this.number, 'ini angka sekarang')
        const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/sharp_punch.mp3')
        audio.play()
      } else {
        // this.number += 1
        // socket.emit number
        console.log(this.number, 'waktunya habis')
      }
    },
    countDownTimer () {
      if (this.countdown > 0) {
        console.log('jalan')
        setTimeout(() => {
          this.countdown -= 1
          this.countDownTimer()
          const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/beep_ping.mp3')
          audio.play()
        }, 1000)
      } else {
        this.socket.emit('inGame', {
          username: this.$store.state.userName,
          id: this.$route.params,
          score: this.number
        })
        this.$router.push('/result')
      }
    },
    setCountdown () {
      // const number = Math.ceil(Math.random() * 10 + 15)
      const number = 10
      this.countdown = number
      this.maxTimer = number
      const audio = new Audio('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/electronic_chime.mp3')
      audio.play()
    }
  },
  created () {
    this.socket.on('finalScore', (payload, hasil) => {
      console.log(payload, 'win')
      this.$store.commit('CHECK_RESULT', {
        payload,
        hasil
      })
    })
    this.setCountdown()
  }
}
</script>
<style scoped>
.custom-cur {
  cursor: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/hands.png'), move;
  transition: .2s;
}
.custom-cur:active{
  cursor: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/hands_rotated.png'), move;
  /* transition: .3s; */
}
.target {
  width: 200px;
  height: 200px;
}
.gameArea {
  width: 100vw;
  /* height: 80vh; */
  background-image: url('../assets/fire.jpg');
  background-size: cover;
  border-radius: 2vh;
  /* cursor: crosshair; */
  cursor: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/hands.png'), move;
  user-select: none;
}
.scoreboard {
  background-image: url('../assets/soil.jpg');
  height: 100%;
  border-radius: 2vh;
  background-size: cover;
  color: white;
}
.scoreContainer {
  border-radius: 2vh;
  background: rgba(0,0,0,0.5);
  height: 100%;
}
</style>
