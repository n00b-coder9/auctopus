/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Comments from './Sections/Comments';
// import logo from '../../utils/Images/SideImg.jpg';
// import { useDispatch } from 'react-redux';
function DetailProductPage(props) {
  // const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const productVariable = {
    productId: productId,
  };
  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}`).then(
        (response) => {
          console.log(response);
          setProduct(response.data[0]);
        },
    );

    Axios.post('/api/comment/getComments', productVariable)
        .then((response) => {
          if (response.data.success) {
            console.log('response.data.comments', response.data.comments);
            setCommentLists(response.data.comments);
          } else {
            alert('Failed to get video Info');
          }
        });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };
  return (
    // eslint-disable-next-line max-len
    <div className="postPage" style={{ width: '100%', padding: '4rem 7rem', border: '20px solid black' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24} style={{ border: '10px solid blue' }}>
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24} style={{ paddingLeft: '2rem' }}>
          <ProductInfo detail={Product} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col lg={24} xs={24}>
          <Comments
            CommentLists={CommentLists}
            postId={Product._id}
            refreshFunction={updateComment}
          />
        </Col>
        {/* <Col lg={8} xs={24}>
          <img src={logo} style={{ width: '100%', height: '300%' }}/>
        </Col> */}

      </Row>
    </div>
  );
}

export default DetailProductPage;
