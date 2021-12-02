<template>
  <div class="form-body">
      Application Datastore
     <div class="input-field">
        <input type="text" v-model="name" placeholder="enter the name" />
        <buttosn>ADD Application</buttosn>
      </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({

})
</script>

<style scoped>
 .workpaces-list {
    max-width: 960px;
    margin: 40px auto;
  }
  .workpaces-list ul {
    padding: 0
  }
  .workpaces-list li {
    list-style-type: none;
    background: white;
    border-radius: 4px;
  }
  .workpaces-list h2 {
    margin: 0 0 10px;
    text-transform: capitalize;
  }
  .salary {
    display: flex;
  }
  .salary img {
    width: 30px;
  }
  .salary p {
    color: #17bf66;
    font-weight: bold;
    margin: 10px 4px;
  }
  .list-move {
    transition: all 1s;
  }
  .form-body {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .input-field {
    width: 700 px;
    margin: 0 auto;
  }
  .input-field input {
    height: 29px;
  }
</style>