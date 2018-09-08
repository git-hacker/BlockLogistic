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
                prop="distance"
                label="路程"
                width="180">
            </el-table-column>
            <el-table-column
                prop="price"
                label="费用"
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
                tableData: [
                    {
                        id: 'xxx',
                        distance: '成都-北京',
                        price: '23eth',
                    }
                ]
            }
        },
        created() {
            this.getOrder();
        },
        methods: {
            getOrder() {
                const userId = window.localStorage.getItem('id');
                console.log('userId', userId);
                this.$http.get('/api/order', {
                    params: {
                        userId,
                    }
                })
                .then((res) => {
                    if (res.status === 200) {
                        this.tableData = res.data;
                    } else {
                        this.$message.error('请求出错');
                    }
                })
            },

        },
    }
</script>
