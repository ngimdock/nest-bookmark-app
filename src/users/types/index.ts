//types
type DataType = any | Promise<any>;

export class ResponseBody {
  status: number;
  message: string;
  data: DataType;

  constructor(status: number, message: string, data: DataType) {
    this.initialize(status, message, data);
  }

  async initialize(status: number, message: string, data: DataType) {
    this.status = status;
    this.message = message;
    this.data = await data;
  }
}
