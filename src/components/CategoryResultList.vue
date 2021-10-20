<template>
  <div>
    <div v-if="pagedQueryResult">
      <h3>
        {{ pagedQueryResult.total }} Result{{
          pagedQueryResult.total === 1 ? "" : "s"
        }}
      </h3>
      <div class="cards">
        <CategoryCard
          v-for="result in pagedQueryResult.results"
          :key="result.id"
          :category="result"
          :culture="defaultCulture"
          @onProductSelected="selectProduct"
        >
        </CategoryCard>
      </div>
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
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 9
    },
    defaultCulture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    cultures: [],
    culture: "",
    searchText: "",
    pagedQueryResult: null,
    page: 1
  }),
  methods: {
    selectProduct: function(product) {
      this.$emit("onProductSelected", product);
    },
    loadLanguages: function() {
      this.commercetoolsClient.getProject().then(projectDetails => {
        logEvent("Got project details", projectDetails);
        this.cultures = projectDetails.languages;
      });
    }
  },
  created: function() {
    this.culture = this.defaultCulture;
    this.cultures.push(this.defaultCulture);
    this.loadLanguages();

    this.commercetoolsClient
      .getCategories()
      .then(result => {
        logEvent(`Got result for categories`, result);
        this.pagedQueryResult = result;
      })
      .catch(reason => {
        logEvent(`Error searching for "${this.searchText}"`, reason);
      });
  }
};
</script>

<style scoped>
fieldset {
  border: none;
  padding: 0;
}

.search__query-box {
  display: flex;
  width: 100%;
  column-gap: 10px;
  margin-bottom: 10px;
}

.search__query-box .text-field__input {
  min-width: inherit;
  flex-grow: 1;
}
.search__query-box .form__dropdown {
  width: auto;
}

.paging {
  display: flex;
  width: 100%;
  margin: 10px 0;
  column-gap: 10px;
  justify-content: center;
}
.paging__info {
  line-height: 31px;
}
.cards {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
}
</style>
