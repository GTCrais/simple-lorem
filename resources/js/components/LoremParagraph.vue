<template>
	<div class="paragraph-container d-flex justify-content-between">
		<p :class="paragraphClass">
			{{ composedParagraph }}
		</p>

		<div class="controls right-controls d-flex flex-column align-items-center">
			<button type="button"
					title="Copy"
					class="btn btn-outline-success btn-copy control-button"
					@click="copyParagraph"
			>
				<i class="fa fa-copy"></i>
			</button>
			<button type="button"
					title="Expand"
					class="btn btn-outline-primary btn-increase control-button mb-1"
					@click="increaseSentences"
			>
				<i class="fa fa-plus"></i>
			</button>
			<button type="button"
					title="Shrink"
					class="btn btn-outline-primary btn-reduce control-button"
					@click="reduceSentences"
					:class="{ disabled: !canReduce }"
			>
				<i class="fa fa-minus"></i>
			</button>

			<button type="button"
					title="Delete"
					class="btn btn-outline-warning btn-remove control-button"
					:class="{ disabled: !canRemove }"
					@click="removeParagraph"
			>
				<i class="fa fa-trash-o"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import ClipboardManager from '../services/ClipboardManager.js';

	export default {
		props: [
			'paragraph',
			'composedParagraph',
			'index',
			'paragraphCount'
		],

		data: function() {
			return {
				paragraphClass: '',
				flashTimeout: null
			}
		},

		mounted: function() {

		},

		methods: {
			copyParagraph() {
				ClipboardManager.copy(this.composedParagraph).then(this.flashParagraph, function (e) {
					console.error(e);
				});
			},

			flashParagraph(e) {
				clearTimeout(this.flashTimeout);
				this.paragraphClass = '';
				this.paragraphClass = 'flash';

				this.flashTimeout = setTimeout(() => {
					this.paragraphClass = '';
				}, 300);
			},

			increaseSentences() {
				this.$store.commit('updateParagraphLength', {
					paragraphIndex: this.index,
					action: 'increase'
				});

				eventHub.emit('save-settings');
			},

			reduceSentences() {
				if (!this.canReduce) {
					return;
				}

				this.$store.commit('updateParagraphLength', {
					paragraphIndex: this.index,
					action: 'reduce'
				});

				eventHub.emit('save-settings');
			},

			removeParagraph() {
				if (!this.canRemove) {
					return;
				}

				this.$store.commit('removeParagraph', this.index);

				eventHub.emit('save-settings');
			}
		},

		computed: {
			canReduce() {
				return (this.paragraph.length > 1) || (this.$parent.paragraphs.length > 1);
			},

			canRemove() {
				return this.paragraphCount > 1;
			}
		},

		created: function() {
			eventHub.on('copied-all', this.flashParagraph);
		},

		beforeUnmount: function() {
			eventHub.off('copied-all', this.flashParagraph);
		}
	}
</script>