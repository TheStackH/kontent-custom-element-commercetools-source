<template>
  <div class="wrapper">
    <ProductSearch
      v-if="!value && !element.disabled && element.config.isProductSelect"
      :commercetoolsClient="commercetoolsClient"
      @onProductSelected="save"
      :defaultCulture="defaultCulture"
    />
    <PreviewValue
      v-if="value && element.config.isProductSelect"
      :value="value"
      :disabled="element.disabled"
      :commercetoolsClient="commercetoolsClient"
      @onProductCleared="reset"
    />

    <CategoryResultList
      v-if="!value && !element.disabled && !element.config.isProductSelect"
      :commercetoolsClient="commercetoolsClient"
      :culture="defaultCulture"
      @onProductSelected="save"
    />
    <PreviewCategory
      v-if="value && !element.config.isProductSelect"
      :value="value"
      :disabled="element.disabled"
      :commercetoolsClient="commercetoolsClient"
      @onProductCleared="reset"
    />
  </div>
</template>

<script>
import commercetoolsClient from "../helpers/commercetoolsClient";
import PreviewValue from "./PreviewValue";
import ProductSearch from "./ProductSearch";
import CategoryResultList from "./CategoryResultList.vue";
import PreviewCategory from "./PreviewCategory.vue";

export default {
  components: {
    PreviewValue,
    ProductSearch,
    CategoryResultList,
    PreviewCategory
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    value: {}
  },
  data: () => ({
    commercetoolsClient: null
  }),
  computed: {
    defaultCulture: function() {
      const configAvailable =
        this.element &&
        this.element.config &&
        this.element.config.commercetools &&
        this.element.config.commercetools.defaultCulture;
      return configAvailable
        ? this.element.config.commercetools.defaultCulture
        : null;
    }
  },
  methods: {
    reset: function() {
      this.save(null);
    },
    save: function(value) {
      if (this.element && !this.element.disabled) {
        this.$emit("update:value", value);
      }
    }
  },
  created: function() {
    const config = this.element.config.commercetools;
    this.commercetoolsClient = new commercetoolsClient(config);
  }
};
</script>

<style scoped>
.wrapper {
  margin: 10px;
}
</style>
