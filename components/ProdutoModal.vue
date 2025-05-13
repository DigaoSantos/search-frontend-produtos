<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
      ref="modalRef"
    >
      <button
        @click="emit('close')"
        class="absolute top-2 right-4 text-secondary hover:text-primary text-xl"
      >
        <strong>x</strong>
      </button>

      <h2 class="text-xl font-semibold mb-4 text-secondary">
        {{ props.produto?.id ? 'Editar Produto' : 'Novo Produto' }}
      </h2>

      <form @submit.prevent="salvar" ref="formRef">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Nome</label>
          <input v-model="form.nome" type="text" class="w-full border p-2 rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Categoria</label>
          <input v-model="form.categoria" type="text" class="w-full border p-2 rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Descrição</label>
          <textarea v-model="form.descricao" class="w-full border p-2 rounded" rows="3" required></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Preço</label>
          <input v-model.number="form.preco" type="number" step="0.01" min="0.01" class="w-full border p-2 rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">URL da Imagem</label>
          <input v-model="form.imagem" type="url" class="w-full border p-2 rounded" required />
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="emit('close')" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-secondary text-white rounded hover:bg-primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps<{
  produto?: {
    id?: number;
    nome: string;
    categoria: string;
    descricao: string;
    preco: number;
    imagem?: string;
  };
}>();

const emit = defineEmits<{
  (e: 'salvar', produto: any): void;
  (e: 'close'): void;
}>();

const toast = useToast();

const form = reactive({
  nome: '',
  categoria: '',
  descricao: '',
  preco: 0,
  imagem: '',
});

const formRef = ref<HTMLFormElement | null>(null);

watch(
  () => props.produto,
  (p) => {
    if (p) {
      Object.assign(form, p);
    } else {
      form.nome = '';
      form.categoria = '';
      form.descricao = '';
      form.preco = 0;
      form.imagem = '';
    }
  },
  { immediate: true }
);

const salvar = () => {
  if (formRef.value?.checkValidity()) {
    emit('salvar', { ...form });
    toast.success('Produto salvo com sucesso!');
  } else {
    toast.error('Por favor, preencha todos os campos obrigatórios corretamente.');
  }
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>
