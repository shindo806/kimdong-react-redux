import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'components/Thanhtoan/thanhtoan.css';

import logoImage from '../assets/images/logo.png';
import ThanhtoanLogo from '../assets/images/home-solid.svg';
import QuanlyLogo from '../assets/images/archive-solid.svg';
import MuahangLogo from '../assets/images/cart-arrow-down.svg';
import ThongkeLogo from '../assets/images/chart-bar-regular.svg';

import routes from '../../constants/routes.json';

export default function Navbar() {
  return (
    <section className={styles['top-nav']}>
      <div className={styles['container-fluid']}>
        <div className={styles.row}>
          <div className={styles['nav-bar']}>
            <div className={`${styles['col-lg-4']} ${styles['col-md-4']}`}>
              <img src={logoImage} alt="logo" />
              <button type="button" className={styles['logo-title']}>
                THEP KIM DONG
              </button>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className={styles['nav-links']}>
                <NavLink exact to={routes.HOME} activeClassName={styles.active}>
                  <ThanhtoanLogo />
                  <span>Thanh toán</span>
                </NavLink>
                <NavLink
                  exact
                  to={routes.QUANLYDONHANG}
                  activeClassName={styles.active}
                >
                  <QuanlyLogo />
                  <span>Quản lý đơn hàng</span>
                </NavLink>
                <NavLink
                  exact
                  to={routes.MUAHANG}
                  activeClassName={styles.active}
                >
                  <MuahangLogo />
                  <span>Mua hàng</span>
                </NavLink>
                <NavLink
                  exact
                  to={routes.THONGKE}
                  activeClassName={styles.active}
                >
                  <ThongkeLogo />
                  <span>Thống kê</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
