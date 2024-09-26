import { IInputs } from '../../generated/ManifestTypes';
import {  IProcess } from './ICrm';

export interface IGraficoPCFProps {
    name?: string,
    context: ComponentFramework.Context<IInputs>
  }

 export interface IState {
    colunas: any[];
    context?: ComponentFramework.Context<IInputs> | undefined;
  }