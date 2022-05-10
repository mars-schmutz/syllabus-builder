<template>
    <div class="large-header">
        <i @click="deleteItem(id)" class="delete">&#9587;</i>
        <template v-if="!editMode">
            <i class="handle">&equiv;</i>
            <span @click="edit">Edit</span>
            <h1>{{ details.header }}</h1>
        </template>
        <template v-else>
            <input @keyup.enter="update" type="text" v-model="newHeader"/>
            <button @click="update">Update</button>
        </template>
    </div>
</template>

<script>
import { useLayoutStore } from "@/store/layout";

export default {
    name: "LargeHeader",
    props: {
        details: Object,
        id: Number,
        deleteItem: Function
    },
    setup() {
        const store = useLayoutStore();
        return { store, updateLargeHeader: store.updateLargeHeader };
    },
    data() {
        return {
            editMode: true,
            newHeader: this.details.header
        }
    },
    methods: {
        update() {
            this.updateLargeHeader(this.id, this.newHeader);
            this.editMode = false;
            this.newHeader = this.details.header;
        },
        edit() {
            this.newHeader = this.details.header;
            this.editMode = true;
        }
    }
}
</script>

<style scoped>
div {
    border: 1px solid black;
    padding: 2rem;
    margin: 0 auto;
    width: 50%;
}
</style>