<template>
    <v-card title="Создание статьи" class="pa-2">
        <v-form ref="form" class="pa-2">
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
                @click="addArticle"
            >
                Добавить статью
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
    methods: {
        addArticle() {
            this.$emit('createArticle', this.post);
            this.post = {
                title: "",
                body: ""
            };
        }
    }
}
</script>