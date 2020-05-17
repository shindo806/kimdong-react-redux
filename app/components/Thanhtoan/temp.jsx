// import React, { useState, useEffect } from "react";
// import { toNumber, formatNumber } from "../../utils/xulynumber";

// function Row(props) {
//   return (
//     <tr className="table-row">
//       <td className="table-cell align-center">{props.index + 1}</td>
//       <td className="table-cell align-left">{props.item.loaihang}</td>
//       <td className="table-cell align-center">{props.item.day}</td>
//       <td className="table-cell align-center">{props.item.donvitinh}</td>
//       <td className="table-cell align-center">{props.item.soluong}</td>
//       <td className="table-cell align-right">{props.item.soluong}</td>
//       <td className="table-cell align-right">{props.item.thanhtien}</td>
//     </tr>
//   );
// }

// export default function Thongtinchitiet(props) {
//   const [data, setData] = useState(() => {
//     return localStorage.getItem("tempData")
//       ? JSON.parse(localStorage.getItem("tempData"))
//       : [];
//   });
//   useEffect(() => {
//     let dataFromLocalStorage = JSON.parse(localStorage.getItem("tempData"));
//     if (props.isAddItem) {
//       setData(dataFromLocalStorage);
//       // send back false status for isAddItem
//       props.setIsAddItem(false);
//     }
//   }, [props.isAddItem]);
//   const Rows =
//     data.length === 0 ? (
//       <tr className="table-row">
//         <td className="table-cell align-center">1</td>
//         <td></td>
//         <td></td>
//         <td></td>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//     ) : (
//       data.map((item, index) => {
//         return <Row item={item} index={index} key={index} />;
//       })
//     );
//   const tongThanhTien =
//     data.length === 0
//       ? ""
//       : data.length === 1
//       ? data[0].thanhtien
//       : formatNumber(
//           data.reduce(
//             (arr, curr) => toNumber(arr.thanhtien) + toNumber(curr.thanhtien)
//           )
//         );
//   return (
//     <>
//       <div className="row">
//         <div className="col-lg-12 col-md-12">
//           <div className="table-wrapper don-hang">
//             <table className="table" id="table">
//               <thead>
//                 <tr className="table-head">
//                   <th className="table-cell align-center th-stt">STT</th>
//                   <th className="table-cell align-center th-loaihang">
//                     Loại hàng
//                   </th>
//                   <th className="table-cell align-center th-doday">Độ dày</th>
//                   <th className="table-cell align-center th-doday">ĐVT</th>
//                   <th className="table-cell align-center th-soluong">SL</th>
//                   <th className="table-cell align-center th-dongia">Đơn giá</th>
//                   <th className="table-cell align-center th-thanhtien">
//                     Thành tiền
//                   </th>
//                 </tr>
//               </thead>
//               {/* Render data here */}
//               <tbody>
//                 {/* Data loop */}
//                 {Rows}
//                 {/* Tổng thành tiền, thanh toán */}
//                 <tr className="table-row">
//                   <td colSpan={6} className="table-cell align-center">
//                     Tổng
//                   </td>
//                   <td
//                     colSpan={1}
//                     className="table-cell align-right"
//                     id="thanhtien-render"
//                   >
//                     {tongThanhTien}
//                   </td>
//                 </tr>
//                 <tr className="table=row">
//                   <td colSpan={6} className="table-cell align-center">
//                     Thanh toán
//                   </td>
//                   <td className="table-cell" colSpan={1}>
//                     <input id="thanhtoan-render" type="text" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td colSpan={6} className="table-cell align-center">
//                     Dư nợ
//                   </td>
//                   <td className="table-cell" colSpan={1}>
//                     <input
//                       defaultValue="1.000.000"
//                       id="duno-render"
//                       type="text"
//                       disabled
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-lg-6 col-md-6">
//           <div className="ngay-giao autocomplete">
//             <label>Ngày giao:</label>
//             <input
//               id="delivery-date"
//               type="text"
//               placeholder="Nhập ngày giao"
//             />
//           </div>
//         </div>
//         <div className="col-lg-6 col-md-6">
//           <div className="cong-no">
//             <p>Công nợ:</p>
//             <span id="cong-no">1.000.000.000</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
