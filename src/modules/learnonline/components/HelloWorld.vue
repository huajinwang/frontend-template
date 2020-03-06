<!--
 * @Author: your name
 * @Date: 2020-01-06 17:32:26
 * @LastEditTime : 2020-01-15 11:26:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-webpack\vue-demo\webpack-learn\src\modules\learnonline\components\HelloWorld.vue
 -->
<template>
  <div class="hello">
    <h1>{{ $t('messages.hello') }}</h1>
    <h2>Ecosystem</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
