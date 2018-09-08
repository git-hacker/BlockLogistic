<template>
    <div>
        <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="credit"
                label="信用分"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <el-button type="text" size="small">签约</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="30%">
            <ul class="detail-container">
                <li>
                    <label>姓名</label>
                    <span>{{detailData.name}}</span>
                </li>
                <li>
                    <label>信用分</label>
                    <span>{{detailData.credit}}</span>
                </li>
                <li>
                    <label>身份证</label>
                    <span>{{detailData.id}}</span>
                </li>
                <li>
                    <label>电话</label>
                    <span>{{detailData.tel}}</span>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        name: 'Helen',
                        credit: 100,
                    }
                ],
                dialogVisible: false,
                detailData: {},
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
            handleClick(data) {
                this.dialogVisible = true;
                this.detailData = data;
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
</style>

