import { CarregarDados } from "../services/CarregarDados.service";
import { IInputs } from "../../generated/ManifestTypes"; // Importar o tipo IInputs

// Definir o tipo para os valores do gráfico
type ChartDataValues = any[];

// Definir a função para carregar os dados
async function carregarDados(context: ComponentFramework.Context<IInputs>) { 
    const { consumptionAndProductionData } = await CarregarDados(context); 

    // Mapear os valores para os meses corretos
    const consumoValues: number[] = [];
    const producaoValues: number[] = [];

    consumptionAndProductionData.forEach(item => {
        // Mapear os valores de consumo
        consumoValues.push(
            item.ptr_totalkwajaneiro ?? 0,
            item.ptr_totalkwafevereiro ?? 0,
            item.ptr_totalkwamarco ?? 0,
            item.ptr_totalkwaabril ?? 0,
            item.ptr_totalkwamaio ?? 0,
            item.ptr_totalkwajunho ?? 0,
            item.ptr_totalkwajulho ?? 0,
            item.ptr_totalkwaagosto ?? 0,
            item.ptr_totalkwasetembro ?? 0,
            item.ptr_totalkwaoutubro ?? 0,
            item.ptr_totalkwanovembro ?? 0,
            item.ptr_totalkwadezembro ?? 0
        );

        // Mapear os valores de produção
        producaoValues.push(
            item.ptr_en_real_an_jan ?? 0,
            item.ptr_en_real_an_fev ?? 0,
            item.ptr_en_real_an_mar ?? 0,
            item.ptr_en_real_an_abr ?? 0,
            item.ptr_en_real_an_mai ?? 0,
            item.ptr_en_real_an_jun ?? 0,
            item.ptr_en_real_an_jul ?? 0,
            item.ptr_en_real_an_ago ?? 0,
            item.ptr_en_real_an_set ?? 0,
            item.ptr_en_real_an_out ?? 0,
            item.ptr_en_real_an_nov ?? 0,
            item.ptr_en_real_an_dez ?? 0
        );
    });

    return { consumoValues, producaoValues };
}

// Configurar os dados para o gráfico
async function configurarGrafico(context: ComponentFramework.Context<IInputs>) { 
    try {
        const { consumoValues, producaoValues } = await carregarDados(context); 

        const data = [
            ["Mês", "Consumo de Energia", "Produção de Energia", "Média Consumo", "Média Produção"],
            ["Janeiro", consumoValues[0], producaoValues[0]],
            ["Fevereiro", consumoValues[1], producaoValues[1]],
            ["Março", consumoValues[2], producaoValues[2]],
            ["Abril", consumoValues[3], producaoValues[3]],
            ["Maio", consumoValues[4], producaoValues[4]],
            ["Junho", consumoValues[5], producaoValues[5]],
            ["Julho", consumoValues[6], producaoValues[6]],
            ["Agosto", consumoValues[7], producaoValues[7]],
            ["Setembro", consumoValues[8], producaoValues[8]],
            ["Outubro", consumoValues[9], producaoValues[9]],
            ["Novembro", consumoValues[10], producaoValues[10]],
            ["Dezembro", consumoValues[11], producaoValues[11]]
        ];

        const consumoValuesFiltered: (number | null)[] = data.slice(1).map(row => typeof row[1] === 'number' ? row[1] : null);
        const producaoValuesFiltered: (number | null)[] = data.slice(1).map(row => typeof row[2] === 'number' ? row[2] : null);

        const filteredConsumoValues = consumoValuesFiltered.filter(value => value !== null) as number[];
        const filteredProducaoValues = producaoValuesFiltered.filter(value => value !== null) as number[];

        const mediaConsumoFinal = filteredConsumoValues.reduce((acc, curr) => acc + curr, 0) / filteredConsumoValues.length;
        const mediaProducaoFinal = filteredProducaoValues.reduce((acc, curr) => acc + curr, 0) / filteredProducaoValues.length;

        const chartDataWithAverages: ChartDataValues = [
            ["Mês", "Consumo de Energia", "Produção de Energia", "Média Consumo", "Média Produção"],
            ...data.slice(1).map(row => [row[0], row[1], row[2], mediaConsumoFinal, mediaProducaoFinal])
        ];

        return chartDataWithAverages;
    } catch (error) {
        console.error("Erro ao configurar o gráfico:", error);
        throw error;
    }
}

export const chartDataWithAverages: (context: ComponentFramework.Context<IInputs>) => Promise<ChartDataValues> = configurarGrafico;
