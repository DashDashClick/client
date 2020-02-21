<template>
  <div>
    <Win v-if="isWinner && result !== 'draw' && result === 'win'" />
    <Lose v-if="!isWinner && result !== 'draw' && result !== 'win'" :winner="winner"/>
    <Draw v-if="result === 'draw'"> DRAW BRO</Draw>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Lose from '@/components/lose'
import Win from '@/components/win'
import Draw from '@/components/draw'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'winner',
      'result',
      'userName'
    ]),
    isWinner () {
      return this.userName === this.winner.username
    }
  },
  components: {
    Lose,
    Win,
    Draw
  }
}
</script>

<style>

</style>
