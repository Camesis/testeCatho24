import { connect, ConnectOptions } from 'mongoose';

export interface DatabaseInterface {
  connect(): Promise<void>;
}

export default class Database {
  private url: string;
  private options: ConnectOptions;

  constructor(url: string, options: ConnectOptions) {
    this.url = url;
    this.options = options;
  }

  async connect(): Promise<void> {
    try {
      const connectionMongoDb = await connect(this.url, this.options);

      console.info("Conectado com sucesso")

      connectionMongoDb.connection.on('error', () => {
        console.error('Erro na conexão com o banco de dados');
        throw new Error('Erro na conexão com o banco de dados');
      });

      connectionMongoDb.connection.on('disconnect', () => {
        console.error('Banco de Dados desconectado');
        throw new Error('Banco de Dados desconectado');
      });
    } catch (error) {
      console.error(`Falha ao conectar com o banco de dados. Erro: ${error}`);
      throw error;
    }
  }
}
