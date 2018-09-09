<template>
    <div>
        <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="订单号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="driverName"
                label="司机姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="货主姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="eth"
                label="费用"
                width="180">
            </el-table-column>
            <el-table-column
                prop="transactionHash"
                label="事件id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="订单状态"
                width="180">
                <template slot-scope="scope">
                    {{scope.row.status ? '完成' : '未完成'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="detail"
                label="详情"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="$router.push({ name: 'orderDetai', query: {id: scope.row.id}})" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="模拟ETC">
                <template slot-scope="scope">
                    <el-button @click="reduce(scope.row.id)" type="text" size="small">扣除ETC</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="理赔">
                <template slot-scope="scope">
                    <el-button @click="compensate(scope.row.id)" type="text" size="small">理赔</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope" v-if="!scope.row.status">
                    <el-button @click="confirm(scope.row.id)" type="text" size="small">确认</el-button>
                    <el-button type="text" size="small">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.getOrder();
        },
        methods: {
            getOrder() {
                const userName = window.localStorage.getItem('userName');
                const userId = window.localStorage.getItem('id');
                this.$http.get('/api/order', {
                    params: {
                        userId,
                    }
                })
                .then((res) => {
                    if (res.status === 200) {
                        this.tableData = res.data.map((data) => {
                            data.userName = userName;
                            return data;
                        });
                    } else {
                        this.$message.error('请求出错');
                    }
                })
            },
            confirm(id) {
                const onConfirmOrder = window.contractInstance.methods.confirm(id).send({
                    from: web3.eth.defaultAccount,
                });
                onConfirmOrder.then((res) => {
                    const returnValues = res.events.onConfirmOrder.returnValues;
                    if (returnValues.orderId) {
                        this.$http.post('/api/updateOrder', { id: returnValues.orderId})
                            .then((res) => {
                                if (res.data.message === 'ok') {
                                    this.$message.success('订单完成');
                                    this.getOrder();
                                }
                            })
                    }
                });
            },
            reduce(id) {
                const reduce = window.etcContract.methods.reduce(id).send({
                    from: web3.eth.defaultAccount,
                });
                reduce.then((res) => {
                    const returnData = res.events.onExcuteETCOnce.returnValues;
                    const fromData = {
                        id: returnData.logisticOrderId,
                        etcAddr: returnData.etcAddr,
                        eth: returnData.eth / 1e18,
                        transactionHash: res.events.onExcuteETCOnce.transactionHash
                    }
                    this.$http.post('/api/reduceOrder', fromData)
                        .then((res) => {
                            if (res.status === 200) {
                                this.$message.success('ETC扣除成功');
                            }
                        })
                });
            },
            compensate(id) {
                const compensate = window.safeContract.methods.compensate(id).send({
                    from: web3.eth.defaultAccount,
                    value: 0.0001 * 1e18,
                });
                compensate.then((res) => {
                    const returnData = res.events.onCompensateOrder.returnValues;
                    const formData = {
                        customerAddr: returnData.customerAddr,
                        id: returnData.id,
                        logisticOrderId: returnData.logisticOrderId,
                        payIfFail: returnData.payIfFail
                    };
                    this.$http.post('/api/payIfFail', formData)
                        .then((res) => {
                            if (res.status === 200) {
                                this.$message.success('理赔成功!');
                            }
                        })
                });
            }
        },
    }
</script>
