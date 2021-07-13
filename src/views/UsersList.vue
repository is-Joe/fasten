<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <plain-table />
        </v-col>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
 import API from '@/api'
 import PlainTable from '@/components/widgets/list/UserTable'
 import Material from 'vuetify/es5/util/colors'
 export default {
   name: 'username',
   components: {
     PlainTable,
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
