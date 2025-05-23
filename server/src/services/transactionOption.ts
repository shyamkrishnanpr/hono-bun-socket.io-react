import { ReadConcern, ReadPreference, WriteConcern } from "mongodb";

const transactionOptions = {
  readPreference: new ReadPreference("primary"),
  readConcern: new ReadConcern("local"),
  writeConcern: new WriteConcern("majority"),
};
export default transactionOptions;
