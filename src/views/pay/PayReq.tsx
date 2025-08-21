import { Box, Button, Grid2, Typography } from "@mui/material";
import { useQueryClient } from "react-query";
import { useFetchPaySubscription } from "src/hooks/mutation/useFetchPaySubscription";
import { useFetchGetEnum } from "src/hooks/query/useFetchGetEnum";
import { IPayReqType } from "src/type/type";
import { formatPriceWithWon } from "src/utils/priceUtils";
import { toastSucMsg } from "src/utils/toast/toast";
import { useAuthStore } from "src/zustand/AuthUserInfo";

interface PayReqProps {
    amount: number;
}

const PayReq = ({amount}:PayReqProps) => {
    const queryClient = useQueryClient();
    const { authUserInfo } = useAuthStore();
    const getPaymentMethodEnum = useFetchGetEnum('paymentMethod');

    const onPostPaySuccess = ()=>{
        toastSucMsg("구독권 구매 완료하였습니다.");
        queryClient.invalidateQueries(['member'], { refetchInactive: true });
    }

    const paySubscription = useFetchPaySubscription(onPostPaySuccess);


    const onClick = (item:any)=>{
        const data :IPayReqType = {
            memberNo: authUserInfo.memberNo,
            amount: amount,
            paymentMethod: item.name
        }
        paySubscription.mutate(data);
    } 



    return (
        <Box display="flex" flexDirection="column" >
            <Box display={"flex"}>
                <Typography variant="h5">
                    금액: 
                </Typography>
                <Typography variant="h5">
                    {formatPriceWithWon(amount)}
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }} />


            <Box marginBottom={1}>
                <Typography variant="h5" fontWeight='500'>
                    결제 수단
                </Typography>
            </Box>
            <Grid2 container display="flex" justifyContent={"space-between"}> 
            {
                getPaymentMethodEnum.data?.data.map((item:any)=>(
                    <Button
                        variant="outlined"
                        onClick={()=>onClick(item)}
                    >
                        {item.desc}
                    </Button>
                ))
            }
            </Grid2>
        </Box>
    );
};

export default PayReq;