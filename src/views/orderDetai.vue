<template>
    <div>
        <div>
            <p>ETC扣费明细</p>
            <el-table
                border
                :data="reduceData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="订单ID">
                </el-table-column>
                <el-table-column
                    prop="etcAddr"
                    label="ETC地址">
                </el-table-column>
                <el-table-column
                    prop="eth"
                    label="ETC扣费">
                </el-table-column>
                <el-table-column
                    prop="transactionHash"
                    label="事件ID">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                reduceData: [],
            }
        },
        created() {
            this.$http.get(`/api/orderDetail?id=${this.$route.query.id}`)
                .then((res) => {
                    this.reduceData = res.data.reduce;
                })
        }
    }

</script>
