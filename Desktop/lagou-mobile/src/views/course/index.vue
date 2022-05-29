<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import LayoutFooter from '@/components/LayoutFooter'
import CourseContent from './components/CourseContent.vue'
import CourseHeader from './components/CourseHeader'

export default {
  name: 'Course',
  components: {
    LayoutFooter,
    CourseHeader,
    CourseContent

  }
}
</script>
<style lang="sass">

</style>
