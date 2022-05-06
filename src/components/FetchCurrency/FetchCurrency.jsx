import axios from 'axios';

// axios.defaults.baseURL = 'https://cdn.cur.su/api/nbu.json';
axios.defaults.baseURL =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5';

const FetchCurrency = async () => {
  try {
    const { data } = await axios.get();
    return data;
  } catch (error) {}
};

export default FetchCurrency;
