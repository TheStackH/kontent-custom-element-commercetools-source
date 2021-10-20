<template>
  <div class="preview">
    <CategoryCard
      v-if="category"
      :category="category"
      :categoryKey="categoryKey"
      :culture="culture"
      @onProductCleared="clearCategory"
    />
    <div v-else-if="disabled">
      No product selected.
    </div>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";
import CategoryCard from "./CategoryCard";

export default {
  components: {
    CategoryCard
  },
  props: {
    commercetoolsClient: {
      type: Object,
      required: false
    },
    value: {
      required: true,
      validator: prop => typeof prop === "object" || prop === null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    category: null
  }),
  computed: {
    culture: function() {
      return this.value && this.value.culture ? this.value.culture : null;
    },
    categoryKey: function() {
      return this.value && this.value.key ? this.value.key : null;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: "getCurrentCategory"
    }
  },
  methods: {
    getCurrentCategory: async function() {
      if (this.value && this.value.key) {
        logEvent(`Getting category for "${this.value.key}"`);

        const category = await this.commercetoolsClient.getCategoryByKey(
          this.value.key
        );

        logEvent(`Got catgegory for "${this.value.key}"`, category);

        this.category = category;
      }
    },
    clearCategory() {
      this.category = null;
      this.$emit("onProductCleared");
    }
  }
};
</script>

<style scoped>
.preview {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
}
</style>
