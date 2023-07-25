<template>
    <v-card :title="isEditing ? 'Редактирование статьи' : 'Создание статьи'" class="pa-2">
        <v-form @submit.prevent class="pa-2">
            <v-text-field
                v-model="post.title"
                label="Название статьи"
                required
            />
            <v-textarea
                v-model="post.body"
                label="Содержание статьи"
            />
            <v-btn
                color="success"
                class="mt-1"
                block
                @click="addPost"
            >
                {{ isEditing ? 'Отредактировать' : 'Добавить статью' }}
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        post: {
            title: "",
            body: ""
        }
    }),
    props: {
        isEditing: {
            type: Boolean,
            default: false
        },
        toEdit: {
            type: Object,
            default: {
                title: "",
                body: ""
            }
        }
    },
    mounted() {
        this.post = this.toEdit;
    },
    methods: {
        addPost() {
            this.$store.dispatch('createPost', this.post);
            this.post = {
                title: "",
                body: ""
            };
        }
    }
}
</script>