<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useProduto } from '@/composables/useProduto';
import { useProdutos } from '@/composables/useProdutos';
import { ArrowLeft } from 'lucide-vue-next';
import ProdutosRelacionados from '@/components/ProdutosRelacionados.vue';

const route = useRoute();
const { fetchProduto } = useProduto();
const { fetchProdutos } = useProdutos();

interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  categoria: string | undefined;
  preco: number;
  imagem?: string;
}

const produto = ref<Produto | null>(null);
const produtosRelacionados = ref<Produto[]>([]);
const carregando = ref(true);

onMounted(async () => {
  try {
    const idAtual = Number(route.params.id);
    produto.value = await fetchProduto(idAtual) as Produto;

    const todos = await fetchProdutos({ limit: 8 });
    produtosRelacionados.value = todos
      .filter(p => p.id !== idAtual)
      .slice(0, 4) as Produto[];
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div v-if="carregando" class="text-center text-gray-500">Carregando...</div>
    <NuxtLink
      to="/produtos"
      class="flex items-center font-bold text-sm text-primary hover:underline mb-8"
    >
      <ArrowLeft class="w-4 h-4 mr-2" />
      Voltar
    </NuxtLink>

    <div v-if="produto" class="border rounded-lg p-6 shadow bg-white">
      <template v-if="produto">
        <h1 class="text-2xl font-bold mb-4 text-font">{{ produto.nome }}</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-100 h-192 flex items-center justify-center mb-2 overflow-hidden rounded">
            <img
              v-if="produto.imagem"
              :src="produto.imagem"
              alt="Imagem do produto"
              class="object-cover h-full w-full"
            />
            <span v-else class="text-gray-400">Sem imagem</span>
          </div>

          <div>
            <p ><strong>Descrição:</strong> {{ produto.descricao }}</p>
            <p class="mt-2"><strong>Categoria:</strong> {{ produto.categoria }}</p>
            <p class="mt-2 text-primary font-bold text-xl">R$ {{ produto.preco.toFixed(2) }}</p>
          </div>
        </div>
      </template>
    </div>
    
    <div v-else class="text-center text-red-500 mt-8">Produto não encontrado.</div>
    <ProdutosRelacionados :produtos="produtosRelacionados" />
  </div>
</template>
