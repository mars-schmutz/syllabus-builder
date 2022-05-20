<template>
	<h1>Syllabus</h1>
	<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<PartsToolkit></PartsToolkit>
	<PaperLayout
	:page-layout="pageLayout"
	:program-logo="logo"
	@updated-layout="updateLayoutStore">
	</PaperLayout>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import PartsToolkit from './components/PartsToolkit.vue'
import PaperLayout from './components/PaperLayout.vue'

import { useLayoutStore } from './store/layout'
import { storeToRefs } from 'pinia'

export default {
	name: 'App',
	components: {
		// HelloWorld
		PartsToolkit,
		PaperLayout
	},

	setup() {
		const store = useLayoutStore()
		const { pageLayout } = storeToRefs(store)
		return { pageLayout, store, deleteItem: store.deleteItem }
	},

	data() {
		return {
			logo: 'it_logo.png'
		}
	},

	methods: {
		updateLayoutStore(layout) {
			this.pageLayout = layout
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

h1 {
	grid-area: header;
	margin: 0 auto;
	padding: 0.5rem;
}
</style>
