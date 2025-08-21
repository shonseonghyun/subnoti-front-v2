import { Box, Button, Card, Grid2 as Grid, Typography } from "@mui/material";
import SharedModal from "src/components/shared/SharedModal";
import { useFetchGetEnum } from "src/hooks/query/useFetchGetEnum";
import PayReq from "../pay/PayReq";
import { extractPriceNumber, extractPriceString } from "src/utils/priceUtils";


const SubscriptionItems = () => {
    const getSubscriptionPlanEnum = useFetchGetEnum('subscriptionPlan');

    return (
        <Box>
            <Grid container spacing={3}>
                {getSubscriptionPlanEnum.data?.data.map((item: any) => (
                    <Card
                        key={item.name}
                        variant="elevation" 
                        sx={{
                            width: "100%"
                    }}
                    >
                        <Box p={2} display="flex" justifyContent="space-between" alignItems="center" >
                            <Box>
                                <Typography variant="h5" fontWeight='500'>{item.desc}</Typography>
                                <Typography color="textSecondary" fontWeight='500'>매월 n회 등록</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="h5" fontWeight='500'>{extractPriceString(item.name)}</Typography>
                                <SharedModal button={<Button variant="contained">구매</Button>}>
                                    <PayReq amount={extractPriceNumber(item.name)} />
                                </SharedModal>
                                
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Grid>
        </Box>
    );
};

export default SubscriptionItems;