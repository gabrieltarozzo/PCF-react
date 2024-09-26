export interface IProcess{
    workflowid:string;
    value:string;
    primaryentity: string,
    uniquename: string,
    xaml: string
}

export interface IProcessStage {
    processstageid: string,
    stagename: string,
}