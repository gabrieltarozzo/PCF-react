export const options = {
  chart: {
    title: "Gráfico",
    subtitle: "Consumo de Energia x Produção de Energia",
  },
  colors: ['#578ACA', '#A6C661', '#0000ff', '#008000'], // Adicionando cores
  series: {
    0: { type: 'bars' },
    1: { type: 'bars' },
    2: { type: 'line', lineWidth: 2 }, // Configurando linhas para usar o segundo eixo y
    3: { type: 'line', lineWidth: 2 }
  },
  bar: { groupWidth: '80%' }, // Ajuste o valor para aumentar ou diminuir o espaçamento entre as barras
  legend: { position: 'top' }, // Posicionando a legenda acima do gráfico
};
