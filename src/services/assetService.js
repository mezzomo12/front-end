// Acesso aos assets. Hoje usa dados de demonstração (src/data); quando o contrato da API
// estiver confirmado em docs/api-contract.md, só este arquivo muda.
import { mockAssets } from '../data/mockAssets';

// Filtra por categoria e/ou texto (título ou descrição).
export async function getAssets({ categoryId, query } = {}) {
  const text = query?.trim().toLowerCase();

  return mockAssets.filter((asset) => {
    if (categoryId && asset.categoryId !== categoryId) return false;
    if (text && !`${asset.title} ${asset.description}`.toLowerCase().includes(text)) return false;
    return true;
  });
}

export async function getAssetById(id) {
  const asset = mockAssets.find((item) => item.id === id);
  if (!asset) {
    throw new Error('Asset não encontrado.');
  }
  return asset;
}
