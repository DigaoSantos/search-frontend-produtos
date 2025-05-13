import { apiGet, apiPost, apiPut, apiDelete } from './useApi';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  categoria?: string;
  criadoEm?: string;
}

interface Filtros {
  search?: string;
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
  limit?: number;
}

export function useProdutos() {
  const fetchProdutos = async (filtros: Filtros): Promise<Produto[]> => {
    const { data, error } = await apiGet<{ produtos: Produto[] }>('/produtos', filtros);
    if (error.value) throw error.value;
    return (data.value?.produtos ?? []) as Produto[];
  };

  const criarProduto = async (produto: Omit<Produto, 'id'>) => {
    const { data, error } = await apiPost<Produto>('/produtos', produto);
    if (error.value) throw error.value;
    return data.value!;
  };
  

  const atualizarProduto = async (id: number, produto: Partial<Produto>) => {
    const { data, error } = await apiPut<Produto>(`/produtos/${id}`, produto);
    if (error.value) throw error.value;
    return data.value!;
  };

  const deletarProduto = async (id: number) => {
    const { error } = await apiDelete(`/produtos/${id}`);
    if (error.value) throw error.value;
  };

  const fetchCategorias = async (): Promise<string[]> => {
    const { data, error } = await apiGet<string[]>('produtos/categorias');
    if (error.value) throw new Error('Erro ao buscar categorias');
    return data.value || [];
  };


  return {
    fetchProdutos,
    criarProduto,
    atualizarProduto,
    deletarProduto,
    fetchCategorias
  };
}
