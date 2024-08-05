import React, {usestate} from 'react';

const ShoppingBasket = () => {

    const [goods, setGoods] = usestate([]);

    return (
        <>
          <h1>장바구니</h1>
          <table>
            <thead>
              <tr>
                <th>상품번호</th>
                <th>상품이름</th>
                <th>상품사진</th>
                <th>상품가격</th>
                <th>상품사이즈</th>
              </tr>
            </thead>
            
                <tbody>
                    {goods.map ( goods => (
                        <tr key={goods.Id}>
                            <td>{goods.Id}</td>
                            <td>{goods.Name}</td>
                            <td>{goods.Image}</td>
                            <td>{goods.Price}</td>
                            <td>{goods.Size}</td>
                            <td>
                                <button>+</button>
                            </td>
                            <td>
                                <button>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>    
                 
          </table>
        </>
      );
}
    
export default ShoppingBasket;