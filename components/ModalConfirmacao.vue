<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification'

const props = defineProps<{
  aberto: boolean;
  mensagem: string;
}>();

const emit = defineEmits<{
  (e: 'confirmar'): void;
  (e: 'cancelar'): void;
}>();

const toast = useToast();

const escHandler = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('cancelar');
};

onMounted(() => {
  window.addEventListener('keydown', escHandler);
});

onUnmounted(() => {
  window.removeEventListener('keydown', escHandler);
});

const clicarFora = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target?.id === 'overlay') {
    emit('cancelar');
  }
};

const confirmarExclusao = () => {
  emit('confirmar');
  toast.success('Produto excluído com sucesso!');
};

</script>

<template>
  <div
    v-if="aberto"
    id="overlay"
    @click="clicarFora"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title" class="text-lg font-semibold mb-4">
        Confirmar exclusão
      </h2>
      <p class="text-gray-700 mb-6">{{ mensagem }}</p>

      <div class="flex justify-end gap-3">
        <button
          @click="emit('cancelar')"
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          @click="confirmarExclusao"
          class="px-4 py-2 rounded bg-primary text-white hover:bg-secondary transition"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>
