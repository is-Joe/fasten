<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <node-params />
        </v-col>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
 import API from '@/api'
 import NodeParams from '@/components/widgets/list/NodeParams'
 import Material from 'vuetify/es5/util/colors'
 export default {
   name: '用户列表',
   components: {
     NodeParams,
   },
   data: () => ({
     color: Material,
   }),
   computed: {
     activity() {
       return API.getActivity()
     }
   }
 }
</script>
