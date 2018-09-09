<template>
    <div>
        <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="身份证"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="scoreCredit"
                label="信用分"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="showSign(scope.row)" type="text" size="small">签约</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="60%" title="签约订单" :visible.sync="dialogVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="货品名称" prop="goods">
                    <el-input style="width: 200px;" v-model="ruleForm.goods"></el-input>
                </el-form-item>
                <el-form-item label="货品价格" prop="price">
                    <el-input style="width: 200px;" v-model="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item label="起始位置" prop="from">
                    <el-select v-model="ruleForm.from" placeholder="起始位置">
                        <el-option
                        v-for="item in fromOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始位置" prop="to">
                    <el-select v-model="ruleForm.to" placeholder="起始位置">
                        <el-option
                        v-for="item in toOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="price-box">
                <div>
                    行程费用：
                </div>
                <ul>
                    <li>
                        ETC预计费用: {{distance * unitETC}} eth
                    </li>
                    <li>
                        保险预计费用: {{ruleForm.price / 1000 * insurance}} eth
                    </li>
                    <li>
                        司机费用: {{distance * unitDriver}} eth
                    </li>
                    <li>
                        总计: {{distance * unitETC + ruleForm.price / 1000 * insurance + distance * unitDriver}} eth
                    </li>
                </ul>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="signDriver">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                unitETC: 0.0005,  // ETH
                unitDriver: 0.01, //ETH
                insurance: 0.02, //%
                tableData: [],
                dialogVisible: false,
                detailData: {},
                fromOptions: [
                    { value: '成都', label: '成都' },
                    { value: '德阳', label: '德阳' },
                    { value: '重庆', label: '重庆' },
                ],
                toOptions: [
                    { value: '北京', label: '北京' },
                    { value: '上海', label: '上海' },
                    { value: '深圳', label: '深圳' },
                ],
                ruleForm: {
                    goods: '',
                    price: '',
                    from: '',
                    to: '',
                },
                rules: {
                    goods: [
                        { required: true, message: '请输入货品名称', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入货品价格', trigger: 'blur' },
                    ],
                    from: [
                        { required: true, message: '请选择起点', trigger: 'blur' },
                    ],
                    to: [
                        { required: true, message: '请选择终点', trigger: 'blur' },
                    ],
                },
                price: 0,
                driverData: null,
                distance: 2000, // 此处在路演时距离固定为200公里
            }
        },
        created() {
            this.getTruck();
        },
        methods: {
            getTruck() {
                this.$http.get('/api/truck')
                    .then((res) => {
                        if (res.status === 200) {
                            this.tableData = res.data;
                        } else {
                            this.$message.error('请求出错');
                        }
                    })
            },
            showSign(data) {
                this.from = '';
                this.to = '';
                this.dialogVisible = true;
                this.driverData = data;
            },
            signDriver() {
                const driverData = this.driverData;
                const userIdCard = window.localStorage.getItem('id');
                const sum = this.distance * this.unitETC + this.ruleForm.price / 1000 * this.insurance + this.distance * this.unitDriver;
                const etcSum = this.distance * this.unitETC;
                // 物流合约
                const onCreateOrderEvent = window.contractInstance.methods.corePay(this.distance, userIdCard, driverData.id, this.ruleForm.goods, this.ruleForm.price).send({
                    from: web3.eth.defaultAccount,
                    value: sum * 1e18,
                })
                this.dialogVisible = false;
                this.clearData();
                // 创建order
                onCreateOrderEvent.then((res) => {
                    window.etcContract.getPastEvents('onCreateETCOrder', (err, event) => {
                        const returnValue = event[0].returnValues;
                        const formData = {
                            customerAddr: returnValue.returnValue,
                            eth: returnValue.eth / 1e18,
                            id: returnValue.logisticOrderId
                        }
                        this.$http.post('/api/createETC', formData)
                            .then((res) => {
                                console.log('etc数据保存成功');
                            })
                    });
                    window.safeContract.getPastEvents('onCreateOrder', (err, event) => {
                        const returnValue = event[0].returnValues;
                        const formData = {
                            customerAddr: returnValue.customerAddr,
                            customerIdCard: returnValue.customerIdCard,
                            eth: returnValue.eth,
                            goods: returnValue.goods,
                            id: returnValue.id,
                            logisticOrderId: returnValue.logisticOrderId,
                            payIfFail: returnValue.payIfFail
                        };
                        this.$http.post('/api/createSafe', formData)
                            .then((res) => {
                                console.log('保险数据保存成功');
                            })

                    });

                    const returnData = res.events.onCreateOrder.returnValues;
                    const formData = {
                        id: returnData.id,
                        eth: returnData.eth / 1e18,
                        driverIdCard: returnData.driverIdCard,
                        driverAddr: returnData.driverAddr,
                        custumerIdCard: returnData.custumerIdCard,
                        custumerAddr: returnData.custumerAddr,
                        transactionHash: res.events.onCreateOrder.transactionHash,
                    };

                    this.$http.post('/api/createOrder', formData)
                        .then((res) => {
                            if (res.status === 200) {
                                this.$message({
                                    message: '订单交易成功',
                                    type: 'success'
                                });
                            }
                        });
                });
            },
            clearData() {
                this.ruleForm = {
                    goods: '',
                    price: '',
                    from: '',
                    to: '',
                };
            },
        },
    }
</script>
<style>
    .el-table__header .cell{
        text-align: center;
    }
    .el-dialog--small {
        text-align: left;
    }
    .detail-container {
        width: 80%;
        margin: 0 auto;
    }
    .price-box {
        padding-left: 20px;
    }
</style>

