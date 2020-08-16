<template>
  <section class="container">
    <div>
      <Logo />
      <h1 class="title">
        Post
      </h1>
      <h2 class="info">
        {{ post.title }}
      </h2>
      <p>
        {{ post.body }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  asyncData ({ params, error, $http }) {
    return $http.$get(`/api/posts/${params.id}`)
      .then((res) => {
        return { post: res }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  },
  head () {
    return {
      title: `Post: ${this.post.title}`
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
