<template>
    <div>
        <Post
            class="mx-auto my-2"
            v-for="post in posts"
            v-bind:post="post"
            :key="post.id"
            :expanded="this.expanded"
        />
        <v-card
            class="mx-auto my-2"
            v-if="posts.length == 0"
            title="Нет статей"
        />
    </div>
</template>

<script>
const {toDMY} = require('../utils');
import Post from './Post'
export default {
    components: {
        Post
    },
    props: {
        posts: {
            type: Array,
            required: true
        },
        expanded: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
    }
}
</script>