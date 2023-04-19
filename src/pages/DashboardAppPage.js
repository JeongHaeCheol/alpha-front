import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import { useEffect, useState } from 'react';

import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { addOrder, checkOrder } from '../api/orderApi';





// components
import Iconify from '../components/iconify';



// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [order, setOrder] = useState({ id: 0, orderStatus: null, orderTime: null, versionTime: null});
  const [enable, setEnable] = useState(true);





  const createOrder = async () => {

    try {
      const responseData = await addOrder();
      const newResult = {
        id: responseData.order.id,
        orderStatus: responseData.order.orderStatus,
        orderTime: responseData.order.orderTime,
        versionTime: responseData.versionTime
      }
      setOrder((prevOrder) => ({ ...prevOrder, ...newResult }));
      setEnable(false);
      console.log(order);
    } catch (error) {
      console.error(error);
    }
  }


  const getOrder = async () => {

    if (!order) {
      return;
    }

    try {
      const responseData = await checkOrder(order.id);
      const newResult = {
        id: responseData.order.id,
        orderStatus: responseData.order.orderStatus,
        orderTime: responseData.order.orderTime,
        versionTime: responseData.versionTime
      }
      setOrder((prevOrder) => ({ ...prevOrder, ...newResult }));

      if (newResult.orderStatus === "COOKED") {
        setEnable(true);
        toast.success('라면이 완성되었습니다!');
      }

      console.log(newResult);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <>
      <Helmet>
        <title> Order Page | Minimal UI </title>
      </Helmet>

      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Order Page
        </Typography>

        <Grid container spacing={3}>


          <Grid item xs={48} sm={24} md={12}>
            <Card variant="outlined">주문번호 : {order.id}</Card>
            <Card variant="outlined">주문상태 : {order.orderStatus === 'PREPARING' ? "준비중"
              : order.orderStatus === 'BOILING_WATER' ? "물 끓이는중"
                : order.orderStatus === "ADD_INGREDIENTS" ? "라면과 스프를 넣고 끓이는중"
                  : order.orderStatus === "COOKED" ? "라면완료" : "진행중"}</Card>
            <Card variant="outlined">주문시간 : {order.orderTime}</Card>
            <Card variant="outlined">정보버전 : {order.versionTime}</Card>

          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <Button onClick={() => createOrder()} disabled={!enable}>
              <AppWidgetSummary title="주문하기" color="warning" icon={'ant-design:windows-filled'} style={{ padding: '50px 60px' }} />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button onClick={() => getOrder()}>
              <AppWidgetSummary title="주문확인" color="warning" icon={'ant-design:windows-filled'} style={{ padding: '50px 60px' }} />
            </Button>
          </Grid>


        </Grid>
      </Container>
    </>
  );
}
