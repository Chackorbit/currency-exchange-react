import AppBar from './AppBar/AppBar';
import TableCurrency from './TableCurrency/TableCurrency';
import Footer from './Footer/Footer';
import s from './App.module.css';
export const App = () => {
  return (
    <>
      <div className={s.container}>
        <AppBar />
        <TableCurrency />
        <Footer />
      </div>
    </>
  );
};
