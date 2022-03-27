type TransactionInput = {
  prev_hash: string;
  output_index: number;
  script: string;
  output_value: number;
  sequence: number;
  addresses: string[];
  script_type: string;
};

type TransactionOutput = {
  value: number;
  script: string;
  spent_by: string;
  addresses: string[];
  script_type: string;
};

export interface TransactionResponse {
  block_hash?: string;
  block_height: number;
  hash: string;
  addresses: string[];
  total: number;
  fees: number;
  size: number;
  vsize: number;
  preference: string;
  relayed_by: string;
  confirmed?: string;
  received: string;
  ver: number;
  lock_time: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  inputs: TransactionInput[];
  outputs: TransactionOutput[];
}

