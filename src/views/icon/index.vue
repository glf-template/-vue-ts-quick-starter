<template>
  <el-tabs>
    <el-tab-pane label="svg-icon">
      <div class="icon-warp">
        <div v-for="(item, index) in svgIcons" :key="index" class="icon-item" @click="copySvgIcon(item)">
          <svg-icon :name="item"> </svg-icon>
          <div class="name">{{ item }}</div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="el-icon">
      <div class="icon-warp">
        <div v-for="(item, index) in elementIcons" :key="index" class="icon-item" @click="copyElIcon(item)">
          <el-icon>
            <component :is="item" />
          </el-icon>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import * as elementIcons from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const svgFiles = require.context('@/assets/icons', true, /\.svg$/)

const svgIcons = svgFiles.keys().map((i) => {
  return i.replace(/(.*\/)*([^.]+).*/gi, '$2')
})

const copySvgIcon = (item: string) => {
  navigator.clipboard.writeText(`<svg-icon name="${item}"></svg-icon>`).then(
    () => {
      /* success */
      ElMessage.success('复制成功')
    },
    () => {
      /* failure */
      ElMessage.success('复制失败')
    }
  )
}
const copyElIcon = (item: DefineComponent) => {
  navigator.clipboard.writeText(`<el-icon><${item.name} /></el-icon>`).then(
    () => {
      /* success */
      ElMessage.success('复制成功')
    },
    () => {
      /* failure */
      ElMessage.success('复制失败')
    }
  )
}
</script>
<style lang="scss" scoped>
.icon-warp {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;

  .icon-item {
    width: 100%;
    height: 100px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .name {
      margin-top: 20px;
      font-size: 12px;
    }
  }
}
</style>
