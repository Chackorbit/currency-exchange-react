import s from './AppBar.module.css';
import { useState, useEffect } from 'react';
import FetchCurrency from 'components/FetchCurrency/FetchCurrency';

export default function AppBar() {
  const [allCurrency, setAllCurrency] = useState([]);

  const getCurrency = async () => {
    const r = await FetchCurrency();
    return setAllCurrency(r);
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <div>
      <header className={s.header}>
        <p className={s.p}>Текущий курс валют к гривне</p>
        <ul className={s.list}>
          {allCurrency?.slice(0, 2)?.map(currency => {
            return (
              <li key={currency.ccy} className={s.item}>
                <span className={s.currency}>{currency.ccy}</span>
                <span>
                  <span className={s.vis}>Купить:</span>{' '}
                  {(currency.buy * 100) / 100}{' '}
                </span>
                <span>
                  <span className={s.vis}>Продать:</span>{' '}
                  {(currency.sale * 100) / 100}
                </span>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}
