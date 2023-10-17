import { defineStore } from "pinia";

import type { BookItem } from "@/types";

import { apiUrl } from "@/api";



export const useBookStore = defineStore("book", {
    state: () => ({
      bookList: [] as BookItem[],
    }),
    actions: {
      async fetchBooks(categoryName: String) { 
        const response = await fetch(`${apiUrl}/categories/name/${categoryName}/books`);
        const data = await response.json();
        this.bookList = data as BookItem[];
       }
    },
    // getters
  });
  