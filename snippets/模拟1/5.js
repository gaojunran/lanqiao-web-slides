const List = {
  template: `
    <div class="photo-list">
      <el-row :gutter="20">
      <!--TODO：待修改代码  每一个 el-col 存放一个单张照片  -->
        <el-col :span="6" v-for="photo in photos">
          <el-card>
           <!-- TODO：待修改代码 目标 1  -->
            <el-image
              style="width: 100%; height: 200px"
              :src="photo.url"
            >
            <!-- TODO：待补充代码 目标 2   -->
            <template #error>
              <photo-error />
            </template>
            </el-image>
            <div style="padding: 14px;">
               <!--TODO：待修改代码 目标 1    -->
              <span class="title">{{ photo.title }}</span>
              <div class="bottom clearfix">
              <!--TODO：待修改代码 目标 1    -->
                <time class="time">{{ 
                  String(new Date(photo.date).getFullYear())
                  + "-" 
                  + String(new Date(photo.date).getMonth() + 1).padStart(2, "0")
                  + "-"
                  + String(new Date(photo.date).getDate()).padStart(2, "0")
                }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  `,
  props:['photos'],
  setup(props) {
    let photos = props.photos
    return {
      photos
    };
  },
};
