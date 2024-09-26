export const options = {
  chart: {
    title: "Gráfico",
    subtitle: "Consumo de Energia x Produção de Energia",
  },
  colors: ['#578ACA', '#A6C661', '#0000ff', '#008000'], // Adicionando cores
  series: {
    0: { type: 'bars' }, // Consumo de Energia
    1: { type: 'bars' }, // Produção de Energia
    2: { type: 'line', lineWidth: 2 }, // Média Consumo
    3: { type: 'line', lineWidth: 2 }  // Média Produção
  },
  bar: { groupWidth: '80%' }, // Ajuste o valor para aumentar ou diminuir o espaçamento entre as barras
  legend: { position: 'top' }, // Posicionando a legenda acima do gráfico
  vAxes: {
    0: { 
      viewWindow: { min: 0 } // Eixo y para as barras começando em 0
    },
    1: { 
      viewWindow: { min: 0 } // Eixo y secundário para as linhas também começando em 0
    }
  }
};