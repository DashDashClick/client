<template>
  <div>
    <Win v-if="isWinner" />
    <Lose v-if="!isWinner" :winner="winner"/>
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
