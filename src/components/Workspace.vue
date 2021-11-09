<template>
  <div class="form-body">
      Mutation create workspaces
      <div class="input-field">
        <input type="text" v-model="name" placeholder="enter the name" />
      <button @click="addWorkspace">ADD Workspace</button>
    </div>
  </div>
  <div v-if="loading">
      <h2>LOADING...</h2>
    </div>
  <div v-else-if="error">{{error}}</div>
  <div class="workpaces-list"  v-else-if="workspaces">
    <transition-group name="list" tag="ul">
        <h2>Workspaces</h2>
        <li>
          <div class="description">
              <p> <span> current workspace id: </span>{{workspaces.workspaces?.current_workspace_id}}</p>
          </div>
        </li>
        <li v-for="workspace in workspaces.workspaces?.workspaces" :key="workspace.id">
          <div class="description">
            <p>{{workspace}}</p>
          </div>
        </li>
    </transition-group>
  </div>
  <div v-if="resCreate">{{resCreate}}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import {WorkSpaces, WId } from '../model/workspaces'
import {GET_WORKSPACES, ADD_WORKSPACE} from '../graphql/workspaces'

export default defineComponent({
  data() {
    return {
      name:''
    }
  },
  methods: {
    addWorkspace: function() {
      this.createWorkspace({ createWorkSpaceInput: {
       name: this.name
      } });
    }
  },
  setup() {
    const { result, loading, error } = useQuery<{workspaces: WorkSpaces}>(GET_WORKSPACES);
    const workspaces = useResult( result, [], data => data );
    let resCreate = ref<any>(null);
    const { 
      loading: m_loading,
      error: m_error,
      mutate: createWorkspace
    } =  useMutation(ADD_WORKSPACE, {
      update: (cache, { data: {createWorkspace} }) => {
        const data: any = cache.readQuery({ query: GET_WORKSPACES });
        resCreate = createWorkspace
      }
    });
    console.log('resCreate', resCreate)

    return {
      workspaces,
      result,
      loading: loading || m_loading,
      error: error || m_error,
      createWorkspace,
      resCreate
    };
  },
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