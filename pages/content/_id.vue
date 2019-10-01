<template>
	<div>
		<v-layout>
			<v-flex xs12>
				<div v-for="(post) in $store.state.page" :key="post.title">
					<v-card class="mb-5" hover>
						<v-card-media
							class="white--text"
							height="170px"
							:src="$store.state.apiRoot + $store.state.assetRoot + post.image.path"
						></v-card-media>
						<v-card-title class="headline">{{post.title}}</v-card-title>

						<v-card-text>{{post.description.slice(0,400)}}...</v-card-text>
						<v-container></v-container>
						<v-card-actions>
							<v-spacer></v-spacer>

							<v-btn
								nuxt
								:to="{name: 'content-id', params: {id: post._id, payload: post} }"
								flat
								class="blue--text"
							>Listen to podcast</v-btn>
						</v-card-actions>
					</v-card>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
export default {
	async fetch({ store, params, route }) {
		await store.dispatch("FETCH_COLLECTION_PAGE_ASYNC", {
			name: "podcast_henk",
			body: {
				filter: { _id: route.params.id },
				fields: { title: 1, description: 1, image: 1, audio: 1 },
				limit: 1
			}
		});
	}
};
</script>

<style>
</style>
