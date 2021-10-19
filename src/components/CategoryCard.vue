<template>
  <article class="card">
    <div class="card__info">
      <h3 class="card__name">{{ name }}</h3>
      <p v-if="this.category.key" class="card__sku card__detail">
        KEY:
        {{ this.category.key }}
      </p>
    </div>
    <div class="card__actions" v-if="!categoryKey">
      <button class="btn btn--primary" @click="selectCategory">
        Select
      </button>
    </div>

    <div class="card__actions" v-if="categoryKey">
      <button class="btn btn--primary" @click="clearCategory">
        Clear
      </button>
    </div>
  </article>
</template>

<script>
import { getLocalizedProperty } from "../helpers/commercetools";
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    categoryKey: {
      type: String,
      required: false
    },
    culture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    selectedCategoryId: -1
  }),
  computed: {
    name: function() {
      return getLocalizedProperty(this.category, "name", this.culture);
    }
  },
  methods: {
    selectCategory: function() {
      this.$emit("onProductSelected", {
        id: this.category.id,
        key: this.category.key,
        name: getLocalizedProperty(this.category, "name", this.culture),
        culture: this.culture
      });
    },
    clearCategory: function() {
      this.$emit("onProductCleared");
    }
  },
  created: function() {
    this.selectedCategoryId = this.category.id;
  }
};
</script>

<style scoped>
.card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  overflow: hidden;
  border: 2px solid #d0cfce;
  text-align: center;
  flex-shrink: 1;
  width: calc(33.3% - 6.66px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__img {
  height: 150px;
  min-width: 150px;
}

.card__img img {
  max-width: 100%;
  max-height: 100%;
}

.card__detail {
  color: #595959;
}

.card__sku {
  letter-spacing: 1px;
}

.card__name {
  margin-top: 5px;
  margin-bottom: 10px;
}

.card__actions {
  padding: 10px;
  background: #f5f5f5;
  display: flex;
  column-gap: 10px;
  justify-content: center;
}
</style>
