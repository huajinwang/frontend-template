<template>
  <section class="page-module">
    <div class="module-header">
      <h3>列表示例</h3>
    </div>
    <div class="module-content">
      <div class="panel panel-default">
        <div class="panel-body">
          <el-table :data="tableData" border stripe highlight-current-row>
            <el-table-column prop="name" :label="$t('demoWorksName')" width="150">
            </el-table-column>
            <el-table-column prop="address" :label="$t('demoOnlineAddress')" width="220">
              <template slot-scope="scope">
                <a :href="scope.row.address"
                  target="_blank" rel="noreferrer noopener">
                  {{ scope.row.address }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="description" :label="$t('demoWorksDesc')"
              show-overflow-tooltip min-width="120">
              <template slot-scope="scope">
                <span v-html="scope.row.description"></span>
              </template>
            </el-table-column>
            <el-table-column prop="date" :label="$t('demoDateOfline')" width="120">
            </el-table-column>
            <el-table-column :label="$t('operation')" width="180">
              <template slot-scope="scope">
                <div class="operation-area">
                  <el-button
                    type="primary" size="medium"
                    @click="onEditClick(scope.row, scope.$index)">
                    {{ $t('edit') }}
                  </el-button>
                  <a :href="scope.row.address" class="heart-link"
                    target="_blank" rel="noreferrer noopener">
                    <span class="heart"></span>
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-operate">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 100]"
              :page-size="100" layout="total, sizes, prev, pager, next, jumper"
              :total="200">
            </el-pagination>
          </div>
        </div>
      </div>
      <edit-dialog
        :pdata="currentRowData"
        v-model="isDialogVisible"
        @dispatch-data="onUpdateRowData">
      </edit-dialog>
    </div>
  </section>
</template>

<script>
import EditDialog from './EditDialog'

export default {
  name: 'DemoList',

  props: {
  },

  data () {
    return {
      tableData: [{
        name: '人生自古谁无死',
        address: 'https://www.baidu.com/',
        description: '搜i所的撒的。',
        date: '2019-09-20'
      },
      {
        name: '留取丹心照汗青',
        address: 'https://www.baidu.com/',
        description: '搜i所的撒的。',
        date: '2019-09-20'
      },{
        name: '天不生仲尼',
        address: 'https://www.baidu.com/',
        description: '搜i所的撒的。',
        date: '2019-09-20'
      },{
        name: '万古长如夜',
        address: 'https://www.baidu.com/',
        description: '搜i所的撒的。',
        date: '2019-09-20'
      },
      ],
      isDialogVisible: false,
      currentPage: 1,
      currentRowData: {},
      currentRowIndex: -1
    }
  },

  components: {
    EditDialog
  },

  computed: {},

  watch: {},

  created () {
  },

  mounted () {
  },

  filters: {},

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },

    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },

    onUpdateRowData (data) {
      this.currentRowData = data
      this.$set(this.tableData, this.currentRowIndex, data)
    },

    /* ----------------------------On Click Event---------------------------- */
    onEditClick (rowData, index) {
      this.currentRowData = rowData
      this.currentRowIndex = index
      this.isDialogVisible = true
    }
  },

  locales: {
    en: {
      demoWorksName: 'Works Name',
      demoOnlineAddress: 'Online Address',
      demoWorksDesc: 'Works Description',
      demoDateOfline: 'Date Of Line'
    },
    zh: {
      demoWorksName: '作品名称',
      demoOnlineAddress: '在线地址',
      demoWorksDesc: '作品描述',
      demoDateOfline: '上线日期'
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.module-content{
  .table-operate{
    margin-top: 15px;
  }
  .operation-area{
    @include flex-box-center(row);
  }

  .heart {
    content: "";
    display: block;
    width: 20px;
    min-height: 16px;
    position: relative;
    transform-origin: 50% 50% 0;
  }
  .heart:before {
    content: "";
    display: block;
    width: 10px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 10px;
    border-radius: 10px 10px 0 0;
    background: #f05b72;
    transform: rotateZ(-45deg);
    transform-origin: 0 100% 0;
  }
  .heart:after {
    content: "";
    display: block;
    width: 10px;
    height: 16px;
    position: absolute;
    top: 0; left: 0;
    border-radius: 10px 10px 0 0;
    background: #f05b72;
    transform: rotateZ(45deg);
    transform-origin: 100% 100% 0;
  }
  .heart-link{
    display: inline-block;
    margin-left: 15px;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: $brand;
    vertical-align: top;
  }
}
</style>
