// Cálculo do retângulo de uma imagem em resizeMode "cover" (ampliada até cobrir o container e
// centralizada). A imagem e os elementos ancorados a ela usam este mesmo cálculo, em vez de
// depender do `cover` interno do <Image>, para ficarem sempre alinhados em qualquer tela.
export function coverRect({ container, image }) {
  const scale = Math.max(container.width / image.width, container.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;

  return {
    left: (container.width - width) / 2,
    top: (container.height - height) / 2,
    width,
    height,
  };
}

// Converte um ponto da imagem (x e y em 0 a 1, relativos à imagem inteira) para coordenadas
// em pixels dentro do container.
export function coverPoint({ container, image, x, y }) {
  const rect = coverRect({ container, image });

  return {
    left: rect.left + x * rect.width,
    top: rect.top + y * rect.height,
  };
}
