import React, { useEffect, useState } from 'react';

import ContentEditable from 'react-contenteditable';
import { Table } from 'semantic-ui-react';
import styles from '../Thanhtoan/thanhtoan.css';

import { toNumber, formatNumber } from '../../utils/xulynumber';

const TableRender = props => {
  const [renderEl, setRenderEl] = useState('');
  const [thanhtien, setThanhTien] = useState(0);
  const [thanhtoan, setThanhToan] = useState(0);
  const [duno, setDuNo] = useState(0);

  useEffect(() => {
    let thanhtienTotal = 0;
    for (let i = 0; i < props.data.length; i++) {
      thanhtienTotal += toNumber(props.data[i].thanhtien);
    }
    setThanhTien(thanhtienTotal);
    setDuNo(thanhtoan - thanhtienTotal);
  }, [props]);

  function createRenderEl() {
    // Table
    let renderEl;
    if (props.data.length === 0) {
      renderEl = (
        <Table.Row>
          <Table.Cell textAlign="center" className="narrow">
            1
          </Table.Cell>
          <Table.Cell textAlign="left" className="narrow" />
          <Table.Cell textAlign="center" className="narrow" />
          <Table.Cell textAlign="center" className="narrow" />
          <Table.Cell textAlign="center" className="narrow" />
          <Table.Cell textAlign="right" className="narrow" />
          <Table.Cell textAlign="right" className="narrow" />
        </Table.Row>
      );
    } else {
      renderEl = props.data.map((row, i) => {
        return (
          <Table.Row key={i + 1}>
            <Table.Cell textAlign="center" className="narrow">
              {i + 1}
            </Table.Cell>
            <Table.Cell textAlign="left" className="narrow">
              <ContentEditable
                html={row.loaihang}
                data-column="item"
                data-row={i}
                className="content-editable"
                // onKeyPress={this.disableNewlines}
                // onPaste={this.pasteAsPlainText}
                // onFocus={this.highlightAll}
                // onChange={this.handleContentEditableUpdate}
                // onDoubleClick={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell textAlign="center" className="narrow">
              <ContentEditable
                html={row.day}
                data-column="item"
                data-row={i}
                className="content-editable"
                // onKeyPress={this.disableNewlines}
                // onPaste={this.pasteAsPlainText}
                // onFocus={this.highlightAll}
                // onChange={this.handleContentEditableUpdate}
                // onDoubleClick={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell textAlign="center" className="narrow">
              <ContentEditable
                html={row.donvitinh}
                data-column="item"
                data-row={i}
                className="content-editable"
                // onKeyPress={this.disableNewlines}
                // onPaste={this.pasteAsPlainText}
                // onFocus={this.highlightAll}
                // onChange={this.handleContentEditableUpdate}
                // onDoubleClick={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell textAlign="center" className="narrow">
              <ContentEditable
                html={row.soluong}
                data-column="item"
                data-row={i}
                className="content-editable"
                // onKeyPress={this.disableNewlines}
                // onPaste={this.pasteAsPlainText}
                // onFocus={this.highlightAll}
                // onChange={this.handleContentEditableUpdate}
                // onDoubleClick={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell textAlign="right" className="narrow">
              <ContentEditable
                html={row.dongia}
                data-column="item"
                data-row={i}
                className="content-editable"
                // onKeyPress={this.disableNewlines}
                // onPaste={this.pasteAsPlainText}
                // onFocus={this.highlightAll}
                // onChange={this.handleContentEditableUpdate}
                // onDoubleClick={this.handleContentEditableUpdate}
              />
            </Table.Cell>
            <Table.Cell textAlign="right" className="narrow">
              {row.thanhtien}
            </Table.Cell>
          </Table.Row>
        );
      });
    }
    setRenderEl(renderEl);
  }

  useEffect(() => {
    createRenderEl();
  }, [props.data]);
  // Utils
  const addRow = () => {
    const { store, row } = this.state;
    const trimSpaces = string => {
      return string
        .replace(/&nbsp;/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
    };
  };

  //   const trimmedRow = {
  //     ...row,
  //     item: trimSpaces(row.item),
  //   };

  //   row.id = store.length + 1;

  //   this.setState({
  //     store: [...store, trimmedRow],
  //     row: this.initialState.row,
  //   });

  //   this.firstEditable.current.focus();
  // };

  // const deleteRow = (id) => {
  //   const { store } = this.state;

  //   this.setState({
  //     store: store.filter((item) => id !== item.id),
  //   });
  // };

  // const disableNewlines = (event) => {
  //   const keyCode = event.keyCode || event.which;

  //   if (keyCode === 13) {
  //     event.returnValue = false;
  //     if (event.preventDefault) event.preventDefault();
  //   }
  // };

  // const validateNumber = (event) => {
  //   const keyCode = event.keyCode || event.which;
  //   const string = String.fromCharCode(keyCode);
  //   const regex = /[0-9,]|\./;

  //   if (!regex.test(string)) {
  //     event.returnValue = false;
  //     if (event.preventDefault) event.preventDefault();
  //   }
  // };

  // const pasteAsPlainText = (event) => {
  //   event.preventDefault();

  //   const text = event.clipboardData.getData("text/plain");
  //   document.execCommand("insertHTML", false, text);
  // };

  const highlightAll = () => {
    setTimeout(() => {
      document.execCommand('selectAll', false, null);
    }, 0);
  };

  // const handleContentEditable = (event) => {
  //   const { row } = this.state;
  //   const {
  //     currentTarget: {
  //       dataset: { column },
  //     },
  //     target: { value },
  //   } = event;

  //   this.setState({ row: { ...row, [column]: value } });
  // };

  // const handleContentEditableUpdate = (event) => {
  //   const { store } = this.state;

  //   const {
  //     currentTarget: {
  //       dataset: { row, column },
  //     },
  //     target: { value },
  //   } = event;

  //   let updatedRow = store.filter((item, i) => parseInt(i) === parseInt(row))[0];
  //   updatedRow[column] = value;

  //   this.setState({
  //     store: store.map((item, i) => (item[column] === row ? updatedRow : item)),
  //   });
  // };
  //};
  const handleThanhToanChange = () => {
    console.log('nhap thanh toan');
  };

  return (
    <>
      <div className={styles.row}>
        <div className={`${styles['col-lg-12']} ${styles['col-md-12']}`}>
          <div className={`${styles['table-wrapper']} ${styles['don-hang']}`}>
            <Table
              celled
              id="table"
              className={`${styles.ui} ${styles.celled} ${styles.table}`}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className={styles['th-stt']}>
                    STT
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles['th-loaihang']}>
                    Loại hàng
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles['th-doday']}>
                    Độ dày
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles['th-donvitinh']}>
                    ĐVT
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles['th-soluong']}>
                    SL
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles['th-dongia']}>
                    Đơn giá
                  </Table.HeaderCell>
                  <Table.HeaderCell className={styles['th-thanhtien']}>
                    Thành tiền
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* Thông số các loại hàng */}
                {renderEl}
                {/* Thanh tien */}
                <Table.Row>
                  <Table.Cell textAlign="center" colSpan="6" className="narrow">
                    Tổng
                  </Table.Cell>
                  <Table.Cell
                    id="thanhtien-render"
                    textAlign="right"
                    className="narrow"
                  >
                    {formatNumber(thanhtien)}
                  </Table.Cell>
                </Table.Row>
                {/* Thanh toan */}
                <Table.Row>
                  <Table.Cell textAlign="center" colSpan="6" className="narrow">
                    Thanh toán
                  </Table.Cell>
                  <Table.Cell
                    id="thanhtoan-render"
                    textAlign="right"
                    className="narrow"
                  >
                    <ContentEditable
                      html={formatNumber(thanhtoan)}
                      data-column="item"
                      data-row={27}
                      className="content-editable"
                      onChange={handleThanhToanChange}
                      // onKeyPress={this.disableNewlines}
                      // onPaste={this.pasteAsPlainText}
                      onFocus={highlightAll}
                      // onChange={this.handleContentEditableUpdate}
                      // onDoubleClick={this.handleContentEditableUpdate}
                    />
                  </Table.Cell>
                </Table.Row>
                {/* Du no */}
                <Table.Row>
                  <Table.Cell textAlign="center" colSpan="6" className="narrow">
                    Dư nợ
                  </Table.Cell>
                  <Table.Cell
                    id="duno-render"
                    textAlign="right"
                    className="narrow"
                  >
                    {formatNumber(duno)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles['col-lg-6']} ${styles['col-md-6']}`}>
          <div className={`${styles['ngay-giao']} ${styles.autocomplete}`}>
            <label>Ngày giao:</label>
            <input
              id="delivery-date"
              type="text"
              placeholder="Nhập ngày giao"
            />
          </div>
        </div>
        <div className={`${styles['col-lg-6']} ${styles['col-md-6']}`}>
          <div className={styles['cong-no']}>
            <p>Công nợ:</p>
            <span id="cong-no">1.000.000.000</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableRender;
