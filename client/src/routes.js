import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const ThongTinGiangVien = React.lazy(() => import('./views/QuanLy/ThongTinGiangVien'));

const QuanLyDiemDanh = React.lazy(() => import('./views/QuanLy/QuanLyDiemDanh'));

const QuanLySinhVien = React.lazy(() => import('./views/QuanLy/QuanLySinhVien'));

const QuanLyMonHoc = React.lazy(() => import('./views/QuanLy/QuanLyMonHoc'));

const QuanLyLopHoc = React.lazy(() => import('./views/QuanLy/QuanLyLopHoc'));

const ThongKe = React.lazy(() => import('./views/QuanLy/ThongKe'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },

  { path: '/quanly/thongtingiangvien', name: 'ThongTinGiangVien', component: ThongTinGiangVien },
  
  { path: '/quanly/quanlydiemdanh', name: 'QuanLyDiemDanh', component: QuanLyDiemDanh },
  
  { path: '/quanly/quanlysinhvien', name: 'QuanLySinhVien', component: QuanLySinhVien },
  
  { path: '/quanly/quanlymonhoc', name: 'QuanLyMonHoc', component: QuanLyMonHoc },
  
  { path: '/quanly/quanlylophoc', name: 'QuanLyLopHoc', component: QuanLyLopHoc },
  
  { path: '/quanly/thongke', name: 'ThongKe', component: ThongKe },
 
 
];

export default routes;
