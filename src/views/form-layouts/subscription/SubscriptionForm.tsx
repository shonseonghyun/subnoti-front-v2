import { Button, InputAdornment, TextField } from "@mui/material";
import { useQueryClient } from "react-query";
import { useFetchDelSubscription } from "src/hooks/mutation/useFetchDelSubscription";
import { toastSucMsg } from "src/utils/toast/toast";
import { useAuthStore } from "src/zustand/AuthUserInfo";

interface ISubscriptionFormProps{
    subscription:any
}

const SubscriptionForm = ({subscription}:ISubscriptionFormProps) => {
    const queryClient = useQueryClient();
    const onDelSubscriptionSuccess = ()=>{
        toastSucMsg("환불 성공하였습니다.");
        queryClient.invalidateQueries(['member'], { refetchInactive: true });
      };
    const delSubscription = useFetchDelSubscription(onDelSubscriptionSuccess);
    const authUserInfo = useAuthStore((state) => state.authUserInfo);

    return (
        <>
            {
              subscription &&
              <TextField
                label="구독권"
                value={
                  `${subscription.subscriptionPlan?.desc ?? ""} (${subscription.remainingCount ?? 0}회 잔여)`
                }              variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          color="inherit"
                          variant="contained"
                          size="small"
                          sx={{ ml: 1, whiteSpace: "nowrap" }}
                          onClick={() => delSubscription.mutate({memberNo:authUserInfo.memberNo,subscriptionNo:subscription.subscriptionNo})}
                        >
                          구독권 환불
                        </Button>
                      </InputAdornment>
                    ),
                  },
                  inputLabel: { shrink: true }, // InputLabelProps={{ shrink: true }} 대체
                }}
              />
            }  
        </>
    );
};

export default SubscriptionForm;