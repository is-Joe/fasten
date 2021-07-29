<template>
    <div id="app">
        <v-card :elevation = 0 outlined  >
            <div ref="main" class="mai">
                
            </div>
        </v-card>
        
    </div>
</template>
<script>


export default {
    props:{
        echartsData: Object,
    },
    data(){
        return {
        
        }
    },
    mounted(){
        var chartDom = this.$refs.main;
        var myChart = echarts.init(chartDom);
        var option;

        option = this.echartsData;

        option && myChart.setOption(option);
       
     
    },
    methods:{
        
    }
        
}
</script>
<style lang="sass" scoped>

    .mai
        width: 480px
        height: 367px
        padding: 15px
    

</style>
