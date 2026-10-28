// Categorias exibidas no Mapa de Lojas, conforme o frame de design.
// Provisório: quando a API definir categorias, esta lista passa a vir de src/services.
// `x` e `y` são o CENTRO do rótulo sobre a imagem do mapa, de 0 a 1 em relação à imagem
// inteira (0,0 = canto superior esquerdo). Ajustar aqui para mover um rótulo no mapa.
export const categories = [
  { id: 'criaturas', name: 'Criaturas', x: 0.086, y: 0.093 },
  { id: 'decoracoes', name: 'Decorações', x: 0.386, y: 0.073 },
  { id: 'estruturas', name: 'Estruturas', x: 0.504, y: 0.171 },
  { id: 'efeitos', name: 'Efeitos', x: 0.335, y: 0.244 },
  { id: 'consumiveis', name: 'Consumíveis', x: 0.162, y: 0.307 },
  { id: 'equipamentos', name: 'Equipamentos', x: 0.282, y: 0.611 },
  { id: 'personagens', name: 'Personagens', x: 0.629, y: 0.617 },
  { id: 'transporte', name: 'Transporte', x: 0.362, y: 0.868 },
];
