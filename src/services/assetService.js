// Acesso aos assets. Hoje usa dados de demonstração (src/data); quando o contrato da API
// estiver confirmado em docs/api-contract.md, só este arquivo muda.
import { categories } from '../constants/categories';
import { mockAssets } from '../data/mockAssets';
import { matchesQuery } from '../utils/search';

// Filtra por categoria e/ou texto. A busca olha título, descrição e nome da categoria,
// ignorando acentos e maiúsculas (ex.: "explosoes" encontra "Explosões Retrô").
export async function getAssets({ categoryId, query } = {}) {
  return mockAssets.filter((asset) => {
    if (categoryId && asset.categoryId !== categoryId) return false;
    const categoryName = categories.find((category) => category.id === asset.categoryId)?.name ?? '';
    return matchesQuery(`${asset.title} ${asset.description} ${categoryName}`, query);
  });
}

export async function getAssetById(id) {
  const asset = mockAssets.find((item) => item.id === id);
  if (!asset) {
    throw new Error('Asset não encontrado.');
  }
  return asset;
}
