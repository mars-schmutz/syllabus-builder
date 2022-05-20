<template>
    <div class="plain-paragraph">
        <i class="delete" @click="deleteItem(id)">&#9587;</i>
        <template v-if="!editMode">
            <i class="handle">&equiv;</i>
            <span class="edit" @click="edit">Edit</span>
            <p>{{ details.text }}</p>
        </template>
        <template v-else>
            <textarea @keyup.alt.enter="update" rows="5" cols="40" v-model="newText"></textarea>
            <button @click="update">Update</button>
        </template>
    </div>
</template>

<script>
import { useLayoutStore } from "@/store/layout";

export default {
    name: "PlainParagraph",
    props: {
        details: Object,
        id: Number,
        deleteItem: Function
    },
    setup() {
        const store = useLayoutStore();
        return { store, updatePlainParagraph: store.updatePlainParagraph };
    },
    data() {
        return {
            editMode: true,
            newText: this.details.text
        }
    },
    methods: {
        update() {
            this.updatePlainParagraph(this.id, this.newText);
            this.editMode = false;
        },
        edit() {
            this.newText = this.details.text;
            this.editMode = true;
        }
    }
}
</script>

<style scoped>
div {
    padding: 0.5rem;
    margin: 0 auto;
}

p {
    width: 90%;
    margin: 0 auto;
}
</style>