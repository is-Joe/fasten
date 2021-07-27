<template>
    <div id="app">
        <div id="main">
        
        </div>
    </div>
</template>
<script>


export default {
    data(){
        return {
        
        }
    },
    mounted(){
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['微倾斜', '严重倾斜', 'X轴']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
            
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['18', '19', '20', '21', '22', '23', '24','25','26','27']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '微倾斜',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210,130,200,210]
                },
                {
                    name: '严重倾斜',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310,210,200,130]
                },
                {
                    name: 'X轴',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410,300,320,190]
                },
            ]
        };

        option && myChart.setOption(option);
    }
        
}
</script>
<style lang="sass" scoped>

    #main
        width: 400px
        height: 400px
    

</style>
