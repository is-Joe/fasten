<template>
  <div>
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <plain-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PlainTable from '@/components/widgets/list/ProjectList'
import Material from 'vuetify/es5/util/colors'
export default {
  name: 'PageDashboard',
  components: {
    PlainTable,
  },
  data: () => ({
    color: Material,
  }),
  computed: {
  }
}
</script>
<style scoped lang="sass">
  
</style>