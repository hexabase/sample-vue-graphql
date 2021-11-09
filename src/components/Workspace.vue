<template>
  <div>
      Mutation create workspaces
      <div>
      <form>
        <input type="text" name="name" placeholder="input new name workspace"/>
        <!-- <button className="button-mutation" type="submit">Add Workspaces</button> -->
        <button v-on:click="createName($event)">Add Workspaces</button>
      </form>
    </div>
  </div>
  <div class="job-list">
    <p>Workspaces</p>
    <transition-group name="list" tag="ul">
        <h2> Vao day</h2>
        <li>
            <div class="description">
                current_workspace_id<p>{{workspaces.workspaces?.current_workspace_id}}</p>
            </div>
        </li>
        <li v-for="workspace in workspaces.workspaces?.workspaces" :key="workspace.id">
            <div class="description">
                <p>{{workspace}}</p>
            </div>
        </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { gql } from "@apollo/client/core";
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import {WorkSpaces, WId } from '../model/workspaces'
import {GET_WORKSPACES, ADD_WORKSPACE} from '../graphql/workspaces'
type CreateWorkSpaceInput = {
    createWorkSpaceInput: {
        name: string
    },
}
export default defineComponent({
    data() {
        return {
            createWorkSpaceInput: {
                name: ''
            }
        }
    },
    methods: {
        createName: function (event: any) {
            // event.preventDefault();
            this.createWorkSpaceInput.name ='Workspace new'
            console.log('input', this.createWorkSpaceInput.name)
            const addWorkspace = () => ({
                variables: {
                    createWorkSpaceInput: {
                        name: 'Create New'
                    }
                }
            });
            const  { mutate: createWorkspace } = useMutation(ADD_WORKSPACE, () => ({
                variables: {
                    createWorkSpaceInput: {
                        name: 'Create New'
                    }
                }
            }));
            console.log('createWorkspace', createWorkspace)
            // event.preventDefault();
            return createWorkspace
        }
    },
    setup() {
        const { mutate: createWorkspace } = useMutation(ADD_WORKSPACE, () => ({
                variables: {
                    createWorkSpaceInput: {
                        name: 'Create New'
                    }
                }
            }));
        console.log('createWorkspace', createWorkspace)
        const { result, loading, error } = useQuery<{workspaces: WorkSpaces}>(GET_WORKSPACES);
        const workspaces = useResult( result, [], data => data );
        console.log('workspacesdata', {workspaces})
        return { workspaces }
    },
})
</script>

<style scoped>
  .job-list {
    max-width: 960px;
    margin: 40px auto;
  }
  .job-list ul {
    padding: 0
  }
  .job-list li {
    list-style-type: none;
    background: white;
    border-radius: 4px;
  }
  .job-list h2 {
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
</style>