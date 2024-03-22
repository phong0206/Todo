/* eslint-disable import/no-named-as-default */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/export */
/* eslint-disable react/self-closing-comp */
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Slider from '../components/Home/Slider';
import Info from '../components/Home/Info';
import '../App.css';
import ScrollTopButton from '../components/Home/ScrollTopButton';
import ButtonInfo from '../components/Home/ButtonInfo';
import FacebookIcon from '@mui/icons-material/Facebook';
import * as React from 'react';
import * as api from '../apis/api';
import SearchComponent from '../components/Home/SearchComponent';
export function ButtonContact() {
  return (
    <>
      <ButtonInfo
        bottom={50}
        Icon={
          <a href="tel:0326603593">
            <img
              id="draggableBtn"
              className="pulse-btn"
              src="https://vtlf.vn/wp-content/plugins/button-contact-vr/img/phone.png"
              alt="phone"
              width={30}
              height={30}
            />
          </a>
        }
      />
      <ButtonInfo bottom={120} Icon={<FacebookIcon width="18px" />} />
      <ButtonInfo
        bottom={190}
        Icon={
          <img
            src="https://vtlf.vn/wp-content/plugins/button-contact-vr/img/zalo.png"
            alt="Zalo"
            width={30}
            height={30}
          />
        }
      />
      <ButtonInfo
        bottom={260}
        Icon={
          <img
            src="../../public/image-removebg-preview.png"
            alt="Wechat"
            width={40}
            height={40}
          />
        }
      />
    </>
  );
}

function Home() {
  const [repoCategories, setRepoCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchUnitsByCategory = async () => {
      try {
        const data = await api.getAllCategories();
        if (data.status === 200) {
          setRepoCategories(data.data.data.categories);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error('Error fetching units by category', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnitsByCategory();
  }, []);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="App">
      <Header />
      <Info />
      {repoCategories.map((item: { _id: string; category: string }) => (
        <Slider
          key={item._id}
          categoryName={item.category}
          categoryId={item._id}
        />
      ))}
      <ScrollTopButton />
      <ButtonContact />
      <Footer />
    </div>
  );
}

export default Home;
