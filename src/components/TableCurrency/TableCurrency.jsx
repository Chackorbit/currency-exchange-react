import FetchCurrency from 'components/FetchCurrency/FetchCurrency';
import { useState, useEffect } from 'react';
import s from './TableCurrency.module.css';

function TableCurrency() {
  const [currentCurrency, setCurrentCurrency] = useState('UAH');
  const [secondCurrentCurrency, setSecondCurrentCurrency] = useState('UAH');

  const [allCurrency, setAllCurrency] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState([]);
  const [secondCurrency, setSecondCurrency] = useState([]);

  const [firstValue, setFirstValue] = useState(Number);
  const [secondValue, setSecondValue] = useState(Number);

  const getCurr = async () => {
    const r = await FetchCurrency();
    setFirstCurrency(r[0]);
    setSecondCurrency(r[0]);
    return setAllCurrency(r);
  };

  const onSetFirstCurr = e => {
    setFirstValue(e.target.value);
    if (currentCurrency === secondCurrentCurrency) {
      return setSecondValue(e.target.value);
    }
    if (currentCurrency === 'UAH') {
      const buy = 1 / secondCurrency.buy;
      const val = e.target.value * buy;
      const math = Math.floor(val * 100) / 100;

      return setSecondValue(math);
    }
    if (secondCurrentCurrency === 'UAH') {
      const buy = 1 * firstCurrency.buy;
      const val = e.target.value * buy;
      const math = Math.floor(val * 100) / 100;

      return setSecondValue(math);
    }

    const buy = firstCurrency.buy / secondCurrency.buy;
    const val = e.target.value * buy;
    const math = Math.floor(val * 100) / 100;

    setSecondValue(math);
  };

  const onSetSecondCurr = e => {
    setSecondValue(e.target.value);

    if (currentCurrency === secondCurrentCurrency) {
      return setFirstValue(e.target.value);
    }
    if (secondCurrentCurrency === 'UAH') {
      const buy = 1 / firstCurrency.buy;
      const val = e.target.value * buy;
      const math = Math.floor(val * 100) / 100;

      return setFirstValue(math);
    }
    if (currentCurrency === 'UAH') {
      const buy = 1 * secondCurrency.buy;
      const val = e.target.value * buy;
      const math = Math.floor(val * 100) / 100;

      return setFirstValue(math);
    }

    const buy = secondCurrency.buy / firstCurrency.buy;
    const val = e.target.value * buy;
    const math = Math.floor(val * 100) / 100;

    setFirstValue(math);
  };

  const onFirstExchanged = e => {
    if (e.target.value === 'UAH') {
      const exchange = allCurrency.find(
        curr => curr.ccy === secondCurrency.ccy
      );
      setCurrentCurrency(e.target.value);
      return setFirstCurrency(exchange);
    }

    const exchange = allCurrency.find(curr => curr.ccy === e.target.value);
    setCurrentCurrency(e.target.value);
    return setFirstCurrency(exchange);
  };

  const onSecondExchanged = e => {
    if (e.target.value === 'UAH') {
      const exchange = allCurrency.find(curr => curr.ccy === firstCurrency.ccy);
      setSecondCurrentCurrency(e.target.value);
      return setSecondCurrency(exchange);
    }
    const exchange = allCurrency.find(curr => curr.ccy === e.target.value);
    setSecondCurrentCurrency(e.target.value);
    return setSecondCurrency(exchange);
  };

  useEffect(() => {
    getCurr();
  }, []);

  useEffect(() => {
    setFirstValue(0);
    setSecondValue(0);
  }, [currentCurrency, secondCurrentCurrency]);

  return (
    <div className={s.container}>
      <h2>Выберете валюту для обмена</h2>

      <form className={s.form}>
        <select className={s.select} onChange={onFirstExchanged}>
          <option value="UAH">UAH</option>
          {allCurrency.slice(0, 2).map(currency => {
            return (
              <option key={currency.ccy} value={currency.ccy}>
                {currency.ccy}
              </option>
            );
          })}
        </select>
        <input
          className={s.input}
          name="change1"
          value={firstValue}
          onChange={onSetFirstCurr}
          placeholder="0"
          type="number"
          pattern="^(0|[1-9]\d*)([.,]\d+)?"
        />

        <select className={s.select} onChange={onSecondExchanged}>
          <option value="UAH">UAH</option>
          {allCurrency.slice(0, 2).map(currency => {
            return (
              <option key={currency.ccy} value={currency.ccy}>
                {currency.ccy}
              </option>
            );
          })}
        </select>
        <input
          className={s.input}
          name="change2"
          value={secondValue}
          onChange={onSetSecondCurr}
          placeholder="0"
          type="number"
          pattern="^(0|[1-9]\d*)([.,]\d+)?"
        />
      </form>
    </div>
  );
}
export default TableCurrency;
