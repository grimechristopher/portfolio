<template>
    <div>
        <h1>{{ article.Title }}</h1>
        <h2>{{ article.Subtitle }}</h2>
        <ArticleContent :content="article.Content"></ArticleContent>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps(['article'])

const article = props.article.attributes;

</script>