//import * as WebApiClient from "xrm-webapi-client";
import { IInputs } from "../../generated/ManifestTypes";
import { IProcess } from "../interfaces/ICrm";

// export async function API(request: any) {
//     return await WebApiClient.Retrieve(request)
//         .then(function (response: any) {
//             console.log(response.value);
//             return response.value;
//         })
//         .catch(function (error: any) {
//             console.log(error);
//         });
// }

export async function Retrive(context: ComponentFramework.Context<IInputs>, nomeEntidade: string, optionOdata: string): Promise<ComponentFramework.WebApi.Entity[]> {
    return new Promise((resolve, reject) => {
        context.webAPI.retrieveMultipleRecords(nomeEntidade, optionOdata).then(
            (result) => { resolve(result.entities); },
            (e) => { reject(e); }
        );
    });
}

export async function GetProcess(context: ComponentFramework.Context<IInputs>, entityName: string): Promise<IProcess[]> {
    let list: IProcess[] = [];
    let result = await Retrive(context, "workflow", "?$select=workflowid,name,uniquename,primaryentity,xaml&$filter=(primaryentity eq '" + entityName + "' and category eq 4 and statecode eq 1)&$orderby=name asc");

    if (result === undefined) return list;

    result.map((item: any) => {
        let process: IProcess = {
            workflowid: item.workflowid,
            value: item.name,
            primaryentity: item.primaryentity,
            uniquename: item.uniquename,
            xaml: item.xaml
        }
        list.push(process);
    });

    return list;
}