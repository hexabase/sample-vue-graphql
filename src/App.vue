<template>
  <div class="app">
    <header>
      <div class="title">
        <h1>Hexabase</h1>
      </div>
      <div class="order">
        <button @click="handleClick('workspaces')">Workspaces</button>
        <button @click="handleClick('applicationdatastore')">ApplicationDatastore</button>
      </div>
    </header>

    <!-- <JobList :jobs="jobs" :order="order" /> -->
    <Workspaces :order="order" v-if="order =='workspaces'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Job from '@/types/Job'
import OrderTerm from '@/types/OrderTerm'
import JobList from './components/JobList.vue'
import Workspaces from './components/Workspace.vue'

export default defineComponent({
  name: 'App',
  components: { Workspaces },
  setup() {
    const jobs = ref<Job[]>([
      { workspaces: 'farm worker', applicationdatastore: 'lon lon ranch'},
      { workspaces: 'quarryman', applicationdatastore: 'death mountain'}
     
    ])
    const order = ref<OrderTerm>('workspaces')

    const handleClick = (term: OrderTerm) => {
      console.log(order.value)
      order.value = term
    }

    return { jobs, order, handleClick }
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
    display: flex;
    justify-content: center;
  }
  header img {
    width: 60px;
    margin-right: 20px;
  }
  header h1 {
    font-size: 3em;
  }
</style>
