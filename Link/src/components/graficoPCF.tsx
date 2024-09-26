import * as React from 'react';
import { Chart } from "react-google-charts";
import * as Data from '../data/chartData';
import { options } from '../data/chartOptions';
import { IGraficoPCFProps, IState } from '../interfaces/IGraficoPCF';
import { IInputs } from '../../generated/ManifestTypes';

export class graficoPCF extends React.Component<IGraficoPCFProps, IState> {

  constructor(props: IGraficoPCFProps) {
    super(props);
    this.state = {
      context : this.props.context,
      colunas : [
        ["Mês", "Consumo de Energia", "Produção de Energia", "Média Consumo", "Média Produção"], 
        ["Janeiro", 0, 0, 0, 0],
        ["Fevereiro", 0, 0, 0, 0],
        ["Março", 0, 0, 0, 0],
        ["Abril", 0, 0, 0, 0],
        ["Maio", 0, 0, 0, 0],
        ["Junho", 0, 0, 0, 0],
        ["Julho", 0, 0, 0, 0],
        ["Agosto", 0, 0, 0, 0],
        ["Setembro", 0, 0, 0, 0],
        ["Outubro", 0, 0, 0, 0],
        ["Novembro", 0, 0, 0, 0],
        ["Dezembro", 0, 0, 0, 0]
      ],
    }
  }

  async componentDidMount() {
    if (this.state.context) {
      // console.log("Contexto recebido:", this.state.context);
      
      try {
        //
        var grafico = await Data.chartDataWithAverages(this.state.context);
       // console.log("Dados recuperados do CRM:", teste); // Log para verificar os dados recuperados
        this.setState({
          colunas: grafico
        }); 
      } catch (error) {
        console.error("Erro ao recuperar dados do CRM:", error); // Log para qualquer erro ao recuperar dados do CRM
      }
    }
  }

  render(){
    const { colunas } = this.state;
    return (
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={colunas}
        options={options}
      />
    )
  }
}
