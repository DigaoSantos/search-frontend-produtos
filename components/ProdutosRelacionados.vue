<script setup lang="ts">
import { NuxtLink } from '#components';

interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  categoria?: string;
  preco: number;
  imagem?: string;
}

defineProps<{
  produtos: Produto[];
}>();
</script>

<template>
  <div class="mt-12">
    <h2 class="text-2xl text-font font-bold mb-6">Você também pode gostar</h2>
    <hr class="mb-7"/>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="produto in produtos"
        :key="produto.id"
        class="border p-4 rounded-lg shadow bg-white flex flex-col relative hover:shadow-xl transition-shadow"
      >
        <div class="bg-gray-100 h-40 flex items-center justify-center mb-2 overflow-hidden rounded">
          
          <NuxtLink
              :to="`/produtos/${produto.id}`"
              class="bg-gray-100 h-40 flex items-center justify-center mb-2 overflow-hidden rounded hover:shadow transition-shadow cursor-pointer"
          >
            <img
            v-if="produto.imagem"
            :src="produto.imagem"
            alt="Imagem do produto"
            class="object-cover h-full w-full"
            />
          <span v-else class="text-gray-400">Sem imagem</span>
        </NuxtLink>
        </div>
        <h3 class="font-semibold text-font text-lg">{{ produto.nome }}</h3>
        <p class="text-sm text-gray-700 min-h-[40px]">{{ produto.descricao }}</p>
        <p class="text-primary font-bold mt-1">R$ {{ produto.preco.toFixed(2) }}</p>
        <NuxtLink
          :to="`/produtos/${produto.id}`"
          class="inline-block bg-secondary text-white text-center px-4 py-2 rounded hover:bg-primary transition mt-4"
        >
          Ver detalhes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
