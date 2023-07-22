<template>
    <v-card
        class="mx-auto my-2"
        :key="post.id"
        :title="post.title"
    >
        <template v-slot:prepend>
            <v-icon size="x-large">mdi-post-outline</v-icon>
        </template>

        <v-card-text class="text-h5 py-2">
            {{ post.body }}
        </v-card-text>

        <v-card-actions>
            <v-list-item class="w-100">
                <v-icon class="me-2" icon="mdi-comment-multiple-outline"/>
                <span class="subheading me-2">{{post.comments.length}}</span>
                <template v-slot:append>
                    <div class="justify-self-end">
                        <v-list-item-subtitle>{{toDMY(post.createdAt)}}</v-list-item-subtitle>
                    </div>
                </template>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>

<script>
const {toDMY} = require('../utils');
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
    }
}
</script>