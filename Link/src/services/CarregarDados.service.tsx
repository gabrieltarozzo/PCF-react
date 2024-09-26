//import * as WebApiClient from "xrm-webapi-client";
import { IInputs } from "../../generated/ManifestTypes";
import { IProcess } from "../interfaces/ICrm";

export async function Retrive(context: ComponentFramework.Context<IInputs>, nomeEntidade: string, optionOdata: string): Promise<ComponentFramework.WebApi.Entity[]> {
    return new Promise((resolve, reject) => {
        context.webAPI.retrieveMultipleRecords(nomeEntidade, optionOdata).then(
            (result) => { resolve(result.entities); },
            (e) => { reject(e); }
        );
    });
}


declare const Xrm: any;

export async function CarregarDados(context: ComponentFramework.Context<IInputs>) {
    try {
        //https://i9solarhml.crm2.dynamics.com/api/data/v9.2/ptr_entradadedadoses
        //https://i9solarhml.crm2.dynamics.com/api/data/v9.2/ptr_entradadedadoses?$filter=ptr_entradadedadosid%20eq%20%27a2a92d9b-6373-ee11-8179-000d3a88e678%27
       // const consumptionAndProductionData = await Retrive(context, "ptr_entradadedados", "?$filter=ptr_entradadedadosid%20eq%20%278f28889c-ecc5-ee11-9079-000d3a88e678%27");
      
       const quoteId = Xrm._page._ui._formContext._entityReference.id.guid;
       const quoteData = await Retrive(context, "quote", "?$select=_ptr_entradadedadosid_value&$filter=quoteid%20eq%20%27" + quoteId + "%27");

       if (quoteData.length > 0 && quoteData[0]["_ptr_entradadedadosid_value"]) {

       const ptr_entradadedadosid_value = quoteData[0]["_ptr_entradadedadosid_value"];

       const consumptionAndProductionData = await Retrive(context, "ptr_entradadedados", "?$filter=ptr_entradadedadosid%20eq%20%27" + ptr_entradadedadosid_value + "%27");

        return {
            consumptionAndProductionData
        };

    } else {
        throw new Error("Nenhum dado retornado ou _ptr_entradadedadosid_value não encontrado.");
    }

    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        throw error;
    }
}
