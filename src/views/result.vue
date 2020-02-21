<template>
  <div>
    <Win v-if="isWinner" />
    <Lose v-if="!isWinner && result !== 'draw'" :winner="winner"/>
    <h1 v-if="result === 'draw'"> DRAW BRO</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Lose from '@/components/lose'
import Win from '@/components/win'

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
    Win
  }
}
</script>

<style>

</style>
