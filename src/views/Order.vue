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
                prop="userName"
                label="货主姓名"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">确认</el-button>
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

        },
    }
</script>
