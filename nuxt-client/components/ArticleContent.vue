<template>
    <div v-for="block in content">
        <StrapiBlocksText v-if="block.hasOwnProperty('RichText')" :nodes="block.RichText" />
        <div v-else-if="block.hasOwnProperty('Image')">
            <img :src="config.apiUrl + block.Image.data.attributes.url" :alt="block.Image.data.attributes.url" />
        </div>
        <div v-else>{{ block }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const config = useRuntimeConfig();

const props = defineProps(['content']);

const content = props.content;

</script>