import { apiGet } from './useApi';

export function useProduto() {
  const fetchProduto = async (id: number | string) => {
    const { data, error } = await apiGet(`/produtos/${id}`);

    if (error.value) {
      console.error('Erro ao buscar produto:', error.value);
      throw new Error('Produto não encontrado');
    }

    return data.value;
  };

  return { fetchProduto };
}
