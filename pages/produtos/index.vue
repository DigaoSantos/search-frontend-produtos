<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProdutos } from '@/composables/useProdutos';
import ProdutoModal from '@/components/ProdutoModal.vue';
import ModalConfirmacao from '@/components/ModalConfirmacao.vue';
import Slider from '@vueform/slider';
import { Pencil, Trash2 } from 'lucide-vue-next';

const {
  fetchProdutos,
  fetchCategorias,
  criarProduto,
  atualizarProduto,
  deletarProduto
} = useProdutos();

interface Produto {
  id?: number;
  nome: string;
  categoria?: string;
  descricao: string;
  preco: number;
  imagem?: string;
}

const produtos = ref<Produto[]>([]);
const search = ref('');
const categoria = ref('');
const page = ref(1);
const limit = 8;

const categoriasDisponiveis = ref<string[]>([]);
const precoIntervalo = ref<[number, number]>([0, 1000]);

const modalAberto = ref(false);
const produtoSelecionado = ref<Produto | null>(null);

const modalExclusaoAberto = ref(false);
const produtoParaExcluir = ref<Produto | null>(null);

const abrirModal = (produto?: Produto) => {
  produtoSelecionado.value = produto ? { ...produto } : null;
  modalAberto.value = true;
};

const fecharModal = () => {
  modalAberto.value = false;
  produtoSelecionado.value = null;
};

const salvarProduto = async (produto: Produto) => {
  if (produtoSelecionado.value?.id) {
    const atualizado = await atualizarProduto(produtoSelecionado.value.id, produto) as Produto;
    const index = produtos.value.findIndex(p => p.id === produtoSelecionado.value?.id);
    if (index !== -1) {
      produtos.value[index] = atualizado;
    }
  } else {
    const novo = await criarProduto(produto) as Produto;
    produtos.value.unshift(novo);
  }

  fecharModal();
};

const abrirModalExclusao = (produto: Produto) => {
  produtoParaExcluir.value = produto;
  modalExclusaoAberto.value = true;
};

const confirmarExclusao = async () => {
  if (produtoParaExcluir.value?.id) {
    await deletarProduto(produtoParaExcluir.value.id);
    modalExclusaoAberto.value = false;
    produtoParaExcluir.value = null;
    await carregarProdutos();
  }
};

const cancelarExclusao = () => {
  modalExclusaoAberto.value = false;
  produtoParaExcluir.value = null;
};

const carregarProdutos = async () => {
  const [precoMin, precoMax] = precoIntervalo.value;
  const resultado = await fetchProdutos({
    search: search.value,
    categoria: categoria.value,
    precoMin,
    precoMax,
    page: page.value,
    limit,
  });

  produtos.value = resultado;
};

onMounted(async () => {
  await carregarProdutos();
  categoriasDisponiveis.value = await fetchCategorias();
});

watch([search, categoria, categoriasDisponiveis, page, precoIntervalo], carregarProdutos, { immediate: true });
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-font">Lista de Produtos</h1>
      <button
        @click="abrirModal()"
        class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
      >
        Novo Produto
      </button>
    </div>

    
    <div class="flex flex-wrap mb-6 justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nome..."
        class="border p-2 rounded w-full sm:w-1/3 mb-5 sm:mb-0"
      />

      <div class="w-full sm:w-1/3 mb-5 sm:mb-0">
        <label class="block text-sm text-gray-600 mb-1">Faixa de Preço (R$)</label>
        <Slider
          v-model="precoIntervalo"
          :min="0"
          :max="1000"
          :step="10"
          :tooltips="true"
          :range="true"
        />
        <div class="text-sm text-gray-700 mt-2">
          R$ {{ precoIntervalo[0].toFixed(2) }} - R$ {{ precoIntervalo[1].toFixed(2) }}
        </div>
      </div>
      <select
        v-model="categoria"
        class="border p-2 rounded w-full sm:w-1/4 mb-5 sm:mb-0"
      >
        <option value="">Todas as categorias</option>
        <option
          v-for="cat in categoriasDisponiveis"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="produto in produtos"
        :key="produto?.id"
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
        <h2 class="font-semibold text-lg">{{ produto.nome }}</h2>
        <p class="text-sm text-font min-h-[40px]">{{ produto.descricao }}</p>
        <p class="text-primary font-bold mt-1">R$ {{ produto.preco.toFixed(2) }}</p>
        <NuxtLink
          :to="`/produtos/${produto.id}`"
          class="inline-block bg-font text-white text-center px-4 py-2 rounded hover:bg-primary transition mt-4"
        >
          Ver detalhes
        </NuxtLink>

        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="abrirModal(produto)"
            class="text-gray-400 hover:text-gray-900"
            title="Editar"
          >
            <Pencil class="w-4 h-4" />
          </button>
          <button
            @click="abrirModalExclusao(produto)"
            class="text-gray-400 hover:text-primary"
            title="Excluir"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>

    <div class="mt-8 flex justify-center gap-4">
      <button
        @click="page--"
        :disabled="page <= 1"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        @click="page++"
        class="px-4 py-2 bg-gray-200 rounded"
      >
        Próxima
      </button>
    </div>

    <!-- Modal -->
    <ProdutoModal
      v-if="modalAberto"
      :produto="produtoSelecionado ? { ...produtoSelecionado, categoria: produtoSelecionado.categoria || '' } : undefined"
      @close="fecharModal"
      @salvar="salvarProduto"
    />

    <ModalConfirmacao
      :aberto="modalExclusaoAberto"
      :mensagem="`Tem certeza que deseja excluir o produto '${produtoParaExcluir?.nome}'?`"
      @confirmar="confirmarExclusao"
      @cancelar="cancelarExclusao"
    />
  </div>
</template>
