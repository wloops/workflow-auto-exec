<script>
import IconRiLayoutTopFill from '~icons/ri/layout-top-fill'
export default {
  name: 'DefaultLayout',
  icon: IconRiLayoutTopFill,
  title: '默认布局'
}
</script>

<script setup></script>

<template>
  <div>
    <div class="default-layout">
      <a-layout class="min-h-[calc(100vh+48px)]">
        <a-affix>
          <a-layout-header>
            <Navbar>
              <template #left> <Logo /> </template>
              <template #center> <Menu /> </template>

              <template #right>
                <SwitchLayout />
                <Github />
              </template>
            </Navbar>
          </a-layout-header>
        </a-affix>
        <a-layout-content>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </a-layout-content>
        <a-layout-footer> <Footer /> </a-layout-footer>
      </a-layout>
    </div>
  </div>
</template>

<style scoped>
@apply .default-layout :deep(.arco-layout-header),
.default-layout :deep(.arco-layout-footer),
.default-layout :deep(.arco-layout-content) {
  @apply text-[var(--color-text-1)] text-14px;
}

.default-layout :deep(.arco-layout-header) {
  @apply w-full h-58px overflow-hidden;
  @apply bg-[var(--color-bg-3)]  border-b-[var(--color-border-1)] border-b-solid border-b-width-1px box-border;
}
.default-layout :deep(.arco-layout-content) {
  @apply flex flex-col justify-center items-center;
  @apply bg-[var(--color-bg-1)] relative;
}
.default-layout :deep(.arco-layout-footer) {
  @apply w-full flex justify-center items-center;
  @apply border-t-[var(--color-border-1)] border-t-solid border-t-width-1px box-border;
  @apply bg-[var(--color-bg-2)] text-[var(--color-text-1)] text-14px;
}
</style>
