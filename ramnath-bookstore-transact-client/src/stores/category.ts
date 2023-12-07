import { defineStore } from "pinia";
import type { CategoryItem } from "@/types";
import { apiUrl } from "@/api";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categoryList: [] as CategoryItem[],
        selectedCategoryName: "Classics",
    }),
    actions: {
        async fetchCategories() {
            let response = await fetch(`${apiUrl}/categories/`);
            let data = await response.json();
            this.categoryList = data as CategoryItem[];
            console.log(this.categoryList)
        },
        setSelectedCategoryName(name: string) {
            this.selectedCategoryName = name;
        }
    },
     getters: {
        getSelectedCategoryName(): string {
            return this.selectedCategoryName;
         }
     },
});