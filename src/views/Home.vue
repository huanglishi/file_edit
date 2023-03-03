<template>
  <div style="padding-top:20px;" class="print" >
    <div class="printPage" >
      <button class="rt z-button-primary"   @click="print"  :class="{mustRed:!isShow}">打印</button>
      <div class="printMain clr">
          <div class="tc f28">{{$store.state.userInfo.record.dept_name}}</div>
          <div class="tc mt16 mb20 f24">胰岛素注射监测任务清单</div>
          <div>
              <span class="lt">日期：{{$route.query.time}}</span>
              <span class="rt mb8">单位：{{$route.query.unit}}</span>
          </div>

          <div v-for="curItem,index in tableData">
            <div style="page-break-after:always" v-if="thead[index]&&index!=0"></div>
            <div style="height:100px;width:100%" v-if="thead[index]&&index!=0"></div>
            <table class="tables" cellpadding="0" cellspacing="0" style="margin-top:-1px">
              <thead v-if="thead[index]">
                <tr>
                  <td style="width:61px">床号</td>
                  <td style="width:61px">姓名</td>
                  <td style="width:75px">编号</td>
                  <td style="width:61px">科室</td>
                  <td style="width:67px">早餐前</td>
                  <td style="width:67px">午餐前</td>
                  <td style="width:67px">晚餐前</td>
                  <td style="width:67px">睡前</td>
                  <td style="width:81px">自定义1</td>
                  <td style="width:81px">自定义2</td>
                  <td style="width:81px">自定义3</td>
                  <td style="width:81px">自定义4</td>
                  <td style="width:81px">自定义5</td>
                  <td style="width:67px">备注</td>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td style="width:61px">{{curItem.bed_number}}</td>
                  <td style="width:61px">{{curItem.name}}</td>
                  <td style="width:75px">{{curItem.number}}</td>
                  <td style="width:61px">
                    <span v-for="item in $store.state.departmentList" v-if="$store.state.curDepartmentId==item.dept_id">{{item.region_name}}</span>
                  </td>
                  <td style="width:67px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==1">
                      <div>{{item.medical_name}}</div>
                      <div>{{item.dose}}</div>
                      <div>{{item.operator_name}}</div>
                      <div v-if="item.is_self_inject==1">自打</div>
                  </div>
                  </td>
                  <td style="width:67px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==2">
                      <div>{{item.medical_name}}</div>
                      <div>{{item.dose}}</div>
                      <div>{{item.operator_name}}</div>
                      <div v-if="item.is_self_inject==1">自打</div>
                  </div>
                  </td>
                  <td style="width:67px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==3">
                      <div>{{item.medical_name}}</div>
                      <div>{{item.dose}}</div>
                      <div>{{item.operator_name}}</div>
                      <div v-if="item.is_self_inject==1">自打</div>
                  </div>
                  </td>
                  <td style="width:67px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==4">
                      <div>{{item.medical_name}}</div>
                      <div>{{item.dose}}</div>
                      <div>{{item.operator_name}}</div>
                      <div v-if="item.is_self_inject==1">自打</div>
                  </div>
                  </td>
                  <td style="width:81px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==10000&&item.self==1">
                        <div v-if="item.point_name!='--'">{{item.point_name}}</div>
                        <div>{{item.medical_name}}</div>
                        <div>{{item.dose}}</div>
                        <div>{{item.operator_name}}</div>
                        <div v-if="item.is_self_inject==1">自打</div>
                    </div>
                  </td>
                  <td style="width:81px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==10000&&item.self==2">
                        <div v-if="item.point_name!='--'">{{item.point_name}}</div>
                        <div>{{item.medical_name}}</div>
                        <div>{{item.dose}}</div>
                        <div>{{item.operator_name}}</div>
                        <div v-if="item.is_self_inject==1">自打</div>
                    </div>
                  </td>
                  <td style="width:81px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==10000&&item.self==3">
                        <div v-if="item.point_name!='--'">{{item.point_name}}</div>
                        <div>{{item.medical_name}}</div>
                        <div>{{item.dose}}</div>
                        <div>{{item.operator_name}}</div>
                        <div v-if="item.is_self_inject==1">自打</div>
                    </div>
                  </td>
                  <td style="width:81px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==10000&&item.self==4">
                        <div v-if="item.point_name!='--'">{{item.point_name}}</div>
                        <div>{{item.medical_name}}</div>
                        <div>{{item.dose}}</div>
                        <div>{{item.operator_name}}</div>
                        <div v-if="item.is_self_inject==1">自打</div>
                    </div>
                  </td>
                  <td style="width:81px">
                    <div v-for="item in curItem.point_list" v-if="item.point_type==10000&&item.self==5">
                        <div v-if="item.point_name!='--'">{{item.point_name}}</div>
                        <div>{{item.medical_name}}</div>
                        <div>{{item.dose}}</div>
                        <div>{{item.operator_name}}</div>
                        <div v-if="item.is_self_inject==1">自打</div>
                    </div>
                  </td>
                  <td style="width:67px">
                    {{curItem.remark}}
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>

          <div class="bottomMain">
            <div class="rt mb20 " style="width:220px">签字：&nbsp;&nbsp;</div>
            <div class="clr rt mb20" style="width:220px">打印时间：{{commond.calc5(new Date().getTime())}}</div>
          </div>
      </div>

      

    </div>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      isShow:true,
      tableData:[],
      thead:[]
    };
  },

  methods: {
    print() {
      let my = this;
      my.isShow = false;
      setTimeout(res => {
        if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
            this.remove_ie_header_and_footer();
        }
       
        window.print();
        this.isShow = true;
      }, 2000);
    },
    remove_ie_header_and_footer() {
      var hkey_path;
      hkey_path =
        "HKEY_CURRENT_USER\\Software\\Microsoft\\InternetExplorer\\PageSetup\\";
      try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        RegWsh.RegWrite(hkey_path + "header", "");
        RegWsh.RegWrite(hkey_path + "footer", "");
      } catch (e) {}
    },
    getData(){
            let obj={
                dept_id:this.$store.state.curDepartmentId,
                patient_id_list:JSON.parse(this.$route.query.patient_id_list),
                start_time:this.$route.query.time+' 00:00:00',
                end_time:this.$route.query.time+' 23:59:59',
                page:1,
                size:10000,
            }
            this.api.task.patientInsulinPlanDepartmentList(obj,res=>{
                // 自定义标记
                res.list.map(item => {
                    let n=1;
                     item.point_list.map(it => {
                        if(it.point_type=='10000'){
                            it.self=n;
                            n++
                        }else{
                            it.self=0;
                        }
                    });
                    this.thead.push(false)
                    // item.dept_id = this.value;
                    // item.sync_time = item.sync_time.substring(0,16);
                });
                this.thead[0]=true;
                this.info=res;
                this.tableData = res.list;
                this.agoTableData = res.list;


                setTimeout(() => {
                   let arr=document.getElementsByTagName('tbody');
                    let heightNum=0;
                    let onePage=1300;		//第一页的高度
                    for(let i in arr){
                      heightNum+=arr[i].offsetHeight
                      if(heightNum>onePage){
                        this.thead[i]=true;
                        heightNum=arr[i].offsetHeight;
                        onePage=1500; //第二页高度
                      }
                    }
                    this.thead.push(false)  //为了更新到页面 
                    this.print();
                }, 200);

            })
        },
  },
  created() {
    document.title = "报告打印";
    this.getData()
  },
  mounted() {
    document.getElementById('app').style.position='initial';
    document.body.style.background='#fff';
    document.body.style.width='1200px';
    document.getElementsByClassName("printPage")[0].style.width='1000px';
  }
};
</script>

<style lang="scss" scoped>

</style>
