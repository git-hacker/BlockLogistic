<template>
    <div class="order-detail-box">
        <el-card class="box-card">
            <div class="card-header">
                <span>订单详情</span>
            </div>
            <ul>
                <li>
                    <label for="">订单号: </label>
                    <span>{{detailData.id}}</span>
                </li>
                <li>
                    <label for="">预付价格: </label>
                    <span>{{detailData.eth}}eth</span>
                </li>
                <li>
                    <label for="">司机姓名: </label>
                    <span>{{detailData.driverName}}</span>
                </li>
                <li>
                    <label for="">司机身份证: </label>
                    <span>{{detailData.driverIdCard}}</span>
                </li>
                <li>
                    <label for="">司机ETH地址: </label>
                    <span>{{detailData.driverAddr}}</span>
                </li>
                <li>
                    <label for="">货主姓名: </label>
                    <span>{{userName}}</span>
                </li>
                <li>
                    <label for="">货主身份证: </label>
                    <span>{{detailData.custumerIdCard}}</span>
                </li>
                <li>
                    <label for="">货主地址: </label>
                    <span>{{detailData.custumerAddr}}</span>
                </li>
                <li>
                    <label for="">订单状态: </label>
                    <span>{{detailData.status ? '完成' : '未完成'}}</span>
                </li>
                <!-- <li v-for="(value, key) in detailData">
                    <label>{{key}}:</label>
                    <span>{{value}}:</span>
                </li> -->
            </ul>
        </el-card>
        <el-card class="box-card">
            <div class="card-header">
                <span>保险详情</span>
                <ul>
                    <li>
                        <label>物品:</label>
                        <span>{{safeData.goods}}</span>
                    </li>
                    <li>
                        <label>保险预支付:</label>
                        <span>{{safeData.eth}}</span>
                    </li>
                    <li>
                        <label>理赔:</label>
                        <span>{{safeData.payIfFail}}</span>
                    </li>
                </ul>
            </div>
        </el-card>
        <div>
            <p>理赔订单</p>
            <el-table
                border
                :data="payData"
                style="width: 100%">
                <el-table-column
                    prop="logisticOrderId"
                    label="订单ID">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="理赔订单ID">
                </el-table-column>
                <el-table-column
                    prop="customerAddr"
                    label="货主地址">
                </el-table-column>
                <el-table-column
                    prop="payIfFail"
                    label="理赔金额">
                </el-table-column>
            </el-table>
        </div>
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
                detailData: {},
                safeData: {},
                payData: [{
                    customerAddr: '0x0000000000000',
                    logisticOrderId: '--',
                    id: '--',
                    payIfFail: 0,
                }],
                userName: window.localStorage.getItem('userName')
            }
        },
        created() {
            this.$http.get(`/api/orderDetail?id=${this.$route.query.id}`)
                .then((res) => {
                    this.reduceData = res.data.reduce;
                    this.detailData = res.data.detail;
                    this.safeData = res.data.safe;
                    // console.log('res.da')
                    if (res.data) {
                        this.payData = [res.data.pay];
                        console.log('payData', this.payData);
                    }
                })
        }
    }

</script>
<style>
    .box-card{
        /* width: 500px; */
        border: 1px solid #999;
    }
    .box-card li{
        text-align: left;
    }
    .order-detail-box {
        padding: 30px 0;
    }
</style>
