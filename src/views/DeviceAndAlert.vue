<template>
    <div>
        <div class="card"  v-for="(item) in deviceData" :key="item.id">
            <div class="left">
                <p v-if="item.amount" v-text="item.amount"></p>
                <el-button type="primary" v-text="item.amountNumber"></el-button>
                <p v-text="item.tadayText"></p>
                <el-button type="primary" v-text="item.tadayNumber"></el-button>
                <p v-text="item.faultText"></p>
                <el-button type="primary" v-text="item.faultNumber"></el-button>
            </div>  
            <div class="right" >
                <p v-text="item.dataRate"></p>  
                <el-button type="primary" circle class="button" v-text="item.rateNumber"></el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        deviceData:{
            type: Array,
            default: undefined,
        },
       
    },
    data(){
        return {
           data:[],
        }
    },
    created(){
        // if(this.deviceData){
        //     this.data = this.deviceData;
        // }else{
        //     this.data = this.alertData;
        // }
    }
}
</script>

<style scoped lang="sass">
.card
    display: flex
    padding: 10px 20px 20px 40px  
    border: 1px solid #EBEEF5
    border-radius: 4px
    .left
        p
            font-size: 12px
            margin: 6px 0 6px 0
    .right
        text-align: center
        padding: 30px 0 0 40px
        .button
            width: 100px
            height: 100px
            font-size: 20px
</style>