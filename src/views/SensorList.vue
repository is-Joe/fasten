<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <sensor-table />
        </v-col>
        <v-col cols="12">
          <iae702-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
 import API from '@/api'
 import SensorTable from '@/components/widgets/list/SensorTable'
 import Iae702Table from '@/components/widgets/list/Iae702Table'
 import Material from 'vuetify/es5/util/colors'
 export default {
   name: '用户列表',
   components: {
     SensorTable,
     Iae702Table,
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
