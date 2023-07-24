<template>
    <div>
        <v-card
            class="mx-auto my-2"
            :key="post.id"
            :title="post.title"
        >
            <template v-slot:prepend>
                <v-icon size="x-large">mdi-post-outline</v-icon>
            </template>
            <template v-slot:append>
                <v-icon size="x-large">mdi-pencil</v-icon>
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
        <CommentsList v-if="expanded" :noCommentTitle="noCommentTitle" v-bind:comments="post.comments"/>
    </div>
</template>

<script>
const {toDMY} = require('../utils');
export default {
    beforeCreate() { //HACK to avoid circular dependency
       this.$options.components.CommentsList = require('./CommentsList').default
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        expanded: {
            type: Boolean,
            default: false
        },
        noCommentTitle: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
    }
}
</script>