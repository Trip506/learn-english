<template>
	<v-container>
		<v-layout row wrap align-center>
			<v-flex xs12>
				<v-layout row wrap align-center justify-center>
					<v-avatar class="mx-1" size="125px">
						<img
							class="img-circle elevation-7 mb-1"
							src="http://news.mit.edu/sites/mit.edu.newsoffice/files/images/2016/MIT-Earth-Dish_0.jpg"
						/>
					</v-avatar>

					<v-avatar class="mx-2" size="125px">
						<img
							class="img-circle elevation-7 mb-1"
							src="http://news.mit.edu/sites/mit.edu.newsoffice/files/images/2016/MIT-Earth-Dish_0.jpg"
						/>
					</v-avatar>
				</v-layout>
				<div class="text-xs-center">
					<div class="headline my-3">Sam Furneaux and Tobias Reich</div>
					<div
						class="subheading text-xs-center grey--text pt-1 mb-5"
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
				</div>
			</v-flex>
			<v-flex xs12>
				<div v-for="(post) in $store.state.collection" :key="post.title">
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
		<v-layout row wrap justify-center>
			<v-btn color="primary" @click="loadMore">Load more</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	async fetch({ store, params }) {
		//refactor to cache.dispatch after cache install
		await store.dispatch("FETCH_COLLECTION_ASYNC", {
			name: "podcast_henk",
			body: {
				fields: { title: 1, description: 1, image: 1, audio: 1 },
				limit: 2
			}
		});
	},

	data() {
		return {
			load: 2
		};
	},
	methods: {
		loadMore() {
			this.load++;
			this.$store.dispatch("PUSH_COLLECTION_ASYNC", {
				name: "podcast_henk",
				body: {
					fields: { title: 1, description: 1, image: 1, audio: 1 },
					limit: 2,
					skip: this.load
				}
			});
		}
	}
};
</script>