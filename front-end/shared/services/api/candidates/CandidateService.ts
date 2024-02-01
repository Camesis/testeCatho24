import { Api } from '../axios-config';

export interface IListCandidate {    
    _id: string;
    name: string;
    skills: string[];
}

export interface ICreateCandidate {    
  name: string;
  skills: string[];
}
const getBySkill = async (skills: string): Promise<IListCandidate | Error> => {
  try{
    const { data } = await Api.get(`/api/candidates/search`, {
        params: {         
          skills: skills,
        },
      });

    if(data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message ||'Erro ao consultar o registro.');
  }

};

const create = async (candidateData: ICreateCandidate): Promise<IListCandidate | Error> => {
  try {
    const { data } = await Api.post(`/api/candidates`, candidateData);

    if (data) {
      return data;
    }

    return new Error('Erro ao cadastrar candidato.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao cadastrar candidato.');
  }
};


export const CandidateService = {
  getBySkill,
  create
};
