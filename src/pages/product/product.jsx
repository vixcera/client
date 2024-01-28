import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import convertPrice from "../../../utils/price";
import Loading from "../../../utils/loading";
import swalert from '../../../utils/swalert';
import axios from "axios";
import "../../style/product.css";

const Product = () => {
  const navigate = useNavigate();
  const { ctg } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API}/products/${ctg}`);
      if (!response.data.length) {
        swalert("product is empty", "info")
          .then((res) => res.dismiss && navigate('/products'));
      }
      setData(response.data);
    } catch (error) {
      if (error.response) {
        swalert("server maintenance, please comeback later!")
          .then((res) => res.dismiss && navigate('/'));
      } else {
        swalert("server maintenance, please come back later!")
          .then((res) => res.dismiss && navigate('/'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div className='page-max'>
      <div id='snap-container'></div>
      <div className="back" onClick={() => navigate(-1)}>
        <div className="fa-solid fa-arrow-left fa-xl active"></div>
        <div className="nav-logo" style={{ fontFamily: 'var(--caveat)' }}>Vixcera</div>
      </div>
      <div className='product-page'>
        <div className='product-container'>
          <input type="text" className='search' />
          {data.map((i, k) => (
            <div className='product-card' key={k} onClick={() => navigate(`/product/details/${i.vid}`)}>
              <LazyLoadImage className='product-img' src={(i.img) || ('img/img404.jpg')} loading='lazy' effect='blur' />
              <div className='wrapped-text'>
                <div className='product-title'>{i.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                  {loading ? (
                    // Tampilkan Skeleton Loading saat data masih dimuat
                    <>
                      <Skeleton height={30} width={200} style={{ marginBottom: '5px' }} />
                      <Skeleton height={30} width={200} style={{ marginBottom: '5px' }} />
                    </>
                  ) : (
                    // Tampilkan data setelah dimuat
                    <>
                      <div className='product-desc'>{i.desc.length >= 40 ? i.desc.substring(0, 40) + '...' : i.desc}</div>
                      <div className='wrapdet' style={{ position: 'unset', marginTop: '15px', marginLeft: '5px', gap: '5px' }}>
                        <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech}</div>
                        <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech.toLowerCase().includes('html') ? "only" : 'JS'}</div>
                      </div>
                    </>
                  )}
                </div>
                <div className='wrapped-details'>
                  <div className='button price'>{convertPrice(i.price)}</div>
                  <div style={{ color: 'var(--text)', cursor: 'pointer' }} className='fa-solid fa-cart-plus fa-xl' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;