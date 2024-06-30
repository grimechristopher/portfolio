<template>
  <div>
    <h1>Articles</h1>
    <ArticleCard v-for="article in articles" :key="article.id" :article="article"></ArticleCard>
  </div>
</template>

<script setup>
const { find } = useStrapi4();
const articlesResponse = await find('articles', {
  populate: 'deep',
}).catch(() => null);
const articles = articlesResponse?.data;
</script>