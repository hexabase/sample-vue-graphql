<template>
  <div class="app">
    <header>
      <div class="title">
        <img alt="hexabase logo" src="./assets/hexabase.png">
      </div>
      <div class="order">
        <button @click="handleClick('workspaces')">Workspaces</button>
        <button @click="handleClick('applicationdatastore')">ApplicationDatastore</button>
      </div>
    </header>

    <Workspaces v-if="choice =='workspaces'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Workspaces from './components/Workspace.vue'

export default defineComponent({
  name: 'App',
  components: { Workspaces },
  setup() {
    let choice = ref<string>('')
    const handleClick = (term: string) => {
      choice.value = term
    }
    return { choice, handleClick }
  }
});
</script>

<style>
  header {
    text-align: center;
  }
  header .order {
    margin-top: 20px;
  }
  button {
    margin: 0 10px;
    color: #1195c9;
    border: 3px solid #1195c9;
    background: #d5f0ff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  header .title{
    /* display: flex; */
    justify-content: center;
  }
  header img {
    width: 100%;
    max-width: 250px;
    margin-right: 20px;
  }
</style>
