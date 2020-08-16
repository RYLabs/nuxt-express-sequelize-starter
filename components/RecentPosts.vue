<template>
  <div class="recent-posts">
    <h2>Recent Posts</h2>
    <ul class="recent-posts">
      <li v-for="(post, index) in posts" :key="index" class="post">
        <nuxt-link :to="{ name: 'posts-id', params: { id: post.id }}">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    posts: []
  }),
  async mounted () {
    const data = await this.$http.$get('/api/posts')
    this.posts = data
  }
}
</script>

<style scoped>
div.recent-posts { margin-top: 1.5em; }
ul { list-style: none; padding: 0; }
</style>
